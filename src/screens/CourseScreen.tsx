import React, { useState } from 'react';
import { z } from 'zod';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, PlayCircle, Plus, X } from 'lucide-react-native';
import {
  Modal,
  Pressable,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { colors, radius, spacing, typography } from '../theme/Theme';
import { Checkbox } from '../components/Checkbox';

interface CourseScreenProps {
  onBack: () => void;
}

interface ChapterItem {
  id: string;
  name: string;
  lectures: number;
  status: 'Done' | 'In Progress' | 'Locked';
}

const initialChapters: ChapterItem[] = [
  { id: '1', name: 'Quadratic Equations', lectures: 3, status: 'Done' },
  { id: '2', name: 'Trigonometry', lectures: 4, status: 'Done' },
  { id: '3', name: 'Calculus Basics', lectures: 3, status: 'In Progress' },
  { id: '4', name: 'Coordinate Geometry', lectures: 4, status: 'Locked' },
  { id: '5', name: 'Probability', lectures: 2, status: 'Locked' },
];

export const CourseScreen: React.FC<CourseScreenProps> = ({ onBack }) => {
  const [chapters, setChapters] = useState<ChapterItem[]>(initialChapters);
  const [modalVisible, setModalVisible] = useState(false);
  const [chapterName, setChapterName] = useState('');
  const [lectureCount, setLectureCount] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const chapterSchema = z.object({
    name: z.string().min(3, 'Chapter name must be at least 3 characters'),
    lectures: z.string().regex(/^\d+$/, 'Must be a number').refine(v => parseInt(v) > 0, 'At least 1 lecture required'),
  });

  const validate = () => {
    try {
      setErrors({});
      chapterSchema.parse({ name: chapterName, lectures: lectureCount });
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        err.issues.forEach(e => {
          if (e.path[0]) formattedErrors[e.path[0].toString()] = e.message;
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const toggleStatus = (id: string) => {
    setChapters(prev =>
      prev.map(ch => {
        if (ch.id === id) {
          return {
            ...ch,
            status: ch.status === 'Done' ? 'In Progress' : 'Done',
          };
        }
        return ch;
      }),
    );
  };

  const handleCreateChapter = () => {
    if (!validate()) return;
    const newChapter: ChapterItem = {
      id: Math.random().toString(),
      name: chapterName,
      lectures: parseInt(lectureCount) || 1,
      status: 'In Progress',
    };
    setChapters([...chapters, newChapter]);
    setModalVisible(false);
    setChapterName('');
    setLectureCount('');
    setErrors({});
  };

  const totalChapters = chapters.length;
  const completedChapters = chapters.filter(ch => ch.status === 'Done').length;
  const progressPercent =
    totalChapters > 0
      ? Math.round((completedChapters / totalChapters) * 100)
      : 0;

  const renderChapter = ({
    item,
    index,
  }: {
    item: ChapterItem;
    index: number;
  }) => (
    <TouchableOpacity
      style={styles.chapterItem}
      onPress={() => item.status !== 'Locked' && toggleStatus(item.id)}
      activeOpacity={0.8}
      disabled={item.status === 'Locked'}
    >
      <View
        style={[
          styles.chapterNumberCircle,
          item.status === 'Done' || item.status === 'In Progress'
            ? { backgroundColor: colors.primaryLight }
            : { backgroundColor: colors.background },
        ]}
      >
        <Text
          style={[
            styles.chapterNumberText,
            item.status === 'Done' || item.status === 'In Progress'
              ? { color: colors.text }
              : { color: colors.textLight },
          ]}
        >
          {index + 1}
        </Text>
      </View>

      <View style={styles.chapterInfo}>
        <Text
          style={[
            styles.chapterName,
            item.status === 'Done' && styles.completedChapterName,
            item.status === 'Locked' && { color: '#CBD5E1' },
          ]}
        >
          {item.name}
        </Text>
        <Text style={styles.chapterSubtext}>
          {item.lectures} Lectures • {item.status}
        </Text>
      </View>

      <View style={styles.statusIconBox}>
        <Checkbox
          checked={item.status === 'Done'}
          onChange={() => toggleStatus(item.id)}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top', 'left', 'right']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ChevronLeft color="#64748B" size={24} strokeWidth={3} />
            <Text style={styles.headerBreadcrumb}>Mathematics — JEE A</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.plusIconButton}
          >
            <Plus color="#64748B" size={24} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        {/* Create Chapter Modal */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() => {
                Keyboard.dismiss();
                setModalVisible(false);
              }}
            />
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={styles.keyboardAvoidingView}
            >
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Add New Chapter</Text>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.closeBtn}
                  >
                    <X color="#94A3B8" size={22} strokeWidth={2.5} />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBody}>
                  <Input
                    label="Chapter Name"
                    placeholder="e.g. Quadratic Equations"
                    value={chapterName}
                    onChangeText={setChapterName}
                    autoFocus
                    error={errors.name}
                  />
                  <Input
                    label="Lecture Count"
                    placeholder="4"
                    value={lectureCount}
                    onChangeText={setLectureCount}
                    keyboardType="numeric"
                    error={errors.lectures}
                  />
                </View>

                <Button
                  title="Create Chapter"
                  onPress={handleCreateChapter}
                  disabled={chapterName.trim() === ''}
                  style={styles.modalActionBtn}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>

        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.primaryLight }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {totalChapters}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textLight }]}>
              Chapters
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.primary }]}>
            <Text style={[styles.statValue, { color: colors.white }]}>
              {completedChapters}
            </Text>
            <Text style={[styles.statLabel, { color: colors.white }]}>
              Completed
            </Text>
          </View>
        </View>
      </SafeAreaView>

      <FlatList
        data={chapters}
        renderItem={renderChapter}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 12,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  plusIconButton: {
    padding: 4,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBreadcrumb: {
    fontSize: 18,
    fontWeight: '700',
    color: '#94A3B8',
    marginLeft: 4,
  },
  contentHeader: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  summaryText: {
    fontSize: 15,
    color: '#64748B',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '700',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    marginHorizontal: 24,
    borderRadius: 99,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 99,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    color: '#64748B',
    fontWeight: '700',
    fontSize: 14,
  },
  activeTabText: {
    color: '#0F172A',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  chapterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  chapterNumberCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  chapterNumberText: {
    fontSize: 16,
    fontWeight: '800',
  },
  chapterInfo: {
    flex: 1,
  },
  chapterName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  completedChapterName: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
    opacity: 0.7,
  },
  chapterSubtext: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '600',
  },
  statusIconBox: {
    width: 32,
    alignItems: 'center',
    position: 'relative',
  },
  lockOverlay: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  keyboardAvoidingView: {
    width: '100%',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  closeBtn: {
    padding: 4,
  },
  modalBody: {
    marginBottom: 24,
  },
  modalActionBtn: {
    borderRadius: 16,
    height: 54,
  },
});
