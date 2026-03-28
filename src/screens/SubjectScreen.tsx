import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ListMinus,
  LayoutGrid,
  Users,
  Calendar,
  Plus,
  X,
  Book,
} from 'lucide-react-native';
import { Modal, Pressable, Keyboard, Platform, KeyboardAvoidingView } from 'react-native';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { colors, radius, spacing, typography } from '../theme/Theme';

interface SubjectScreenProps {
  onBack: () => void;
  onNavigateCourse: (subjectId: string) => void;
}

const mockSubjects = [
  {
    id: 's1',
    name: 'Mathematics',
    topics: 'Algebra, Calculus, Geometry...',
    chapters: 6,
    progress: 75,
  },
  {
    id: 's2',
    name: 'Physics',
    topics: 'Mechanics, Optics, Electrostatics',
    chapters: 5,
    progress: 60,
  },
  {
    id: 's3',
    name: 'Chemistry',
    topics: 'Organic, Inorganic, Physical',
    chapters: 4,
    progress: 35,
  },
];

const mockStudents = [
  {
    id: '1',
    name: 'Aarav Sharma',
    roll: '01',
    status: 'Active',
    initials: 'AS',
  },
  { id: '2', name: 'Isha Patel', roll: '02', status: 'Active', initials: 'IP' },
  {
    id: '3',
    name: 'Kabir Singh',
    roll: '03',
    status: 'Fee Due',
    initials: 'KS',
  },
];

export const SubjectScreen: React.FC<SubjectScreenProps> = ({
  onBack,
  onNavigateCourse,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [subjectName, setSubjectName] = React.useState('');
  const [topics, setTopics] = React.useState('');
  const [chapters, setChapters] = React.useState('');

  const [activeTab, setActiveTab] = React.useState<'Subjects' | 'Students'>(
    'Subjects',
  );

  const handleCreateSubject = () => {
    // Logic to add subject would go here
    setModalVisible(false);
    setSubjectName('');
    setTopics('');
    setChapters('');
  };

  const renderSubject = ({ item }: { item: (typeof mockSubjects)[0] }) => (
    <Card onPress={() => onNavigateCourse(item.id)} style={styles.subjectCard}>
      <View style={styles.cardHeader}>
        <View style={styles.iconBox}>
          <Book color={colors.primary} size={22} strokeWidth={2.5} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.subjectName}>{item.name}</Text>
          <Text style={styles.topicText} numberOfLines={1}>{item.topics}</Text>
        </View>
        <ChevronRight color={colors.textMuted} size={20} />
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.metaBox}>
          <LayoutGrid color={colors.textLight} size={14} />
          <Text style={styles.metaText}>{item.chapters} Chapters</Text>
        </View>
        <Text style={styles.progressValue}>{item.progress}%</Text>
      </View>
      <ProgressBar progress={item.progress} color={colors.primary} height={6} />
    </Card>
  );

  const renderStudent = ({ item }: { item: (typeof mockStudents)[0] }) => (
    <View style={styles.studentItem}>
      <View style={styles.studentAvatar}>
        <Text style={styles.studentInitials}>{item.initials}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.studentName}>{item.name}</Text>
        <Text style={styles.studentRoll}>Roll No. {item.roll}</Text>
      </View>
      <View
        style={[
          styles.statusBadge,
          { 
            backgroundColor: item.status === 'Active' ? colors.successLight : colors.warningLight 
          },
        ]}
      >
        <Text
          style={[
            styles.statusText,
            { 
              color: item.status === 'Active' ? colors.success : colors.warning 
            },
          ]}
        >
          {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Purple Header Stats Section */}
      <View style={styles.headerSection}>
        <SafeAreaView edges={['top', 'left', 'right']}>
          <View style={styles.topNav}>
            <TouchableOpacity onPress={onBack} style={styles.backBtn}>
              <ChevronLeft color="#FFFFFF" size={28} strokeWidth={2.5} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>JEE Mains — A</Text>
            <View style={{ flex: 1 }} />
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.plusIconButton}>
              <Plus color="#FFFFFF" size={24} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      {/* Create Subject Modal */}
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
                <Text style={styles.modalTitle}>Add New Subject</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                  <X color="#94A3B8" size={22} strokeWidth={2.5} />
                </TouchableOpacity>
              </View>

              <View style={styles.modalBody}>
                <Input
                  label="Subject Name"
                  placeholder="e.g. Mathematics"
                  value={subjectName}
                  onChangeText={setSubjectName}
                  autoFocus
                />
                <Input
                  label="Topics Overview"
                  placeholder="e.g. Algebra, Calculus"
                  value={topics}
                  onChangeText={setTopics}
                />
                <Input
                  label="Total Chapters"
                  placeholder="6"
                  value={chapters}
                  onChangeText={setChapters}
                  keyboardType="numeric"
                />
              </View>

              <Button
                title="Create Subject"
                onPress={handleCreateSubject}
                disabled={subjectName.trim() === ''}
                style={styles.modalActionBtn}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      <View style={styles.content}>
        {/* Toggle Tab Bar */}
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Subjects' && styles.activeTab]}
            onPress={() => setActiveTab('Subjects')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'Subjects' && styles.activeTabText,
              ]}
            >
              Subjects
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Students' && styles.activeTab]}
            onPress={() => setActiveTab('Students')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'Students' && styles.activeTabText,
              ]}
            >
              Students
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'Subjects' && (
          <FlatList
            data={mockSubjects}
            renderItem={renderSubject}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}

        {activeTab === 'Students' && (
          <FlatList
            data={mockStudents}
            renderItem={renderStudent}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerSection: {
    backgroundColor: colors.primary,
    paddingTop: spacing.s,
    paddingBottom: spacing.l,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    marginBottom: 4,
  },
  backBtn: {
    marginRight: 12,
  },
  headerTitle: {
    ...typography.h2,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  plusIconButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 14,
    padding: 4,
    marginHorizontal: 16,
    marginVertical: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 11,
  },
  activeTab: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textLight,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  subjectCard: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subjectName: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
  },
  topicText: {
    fontSize: 13,
    color: colors.textLight,
    fontWeight: '600',
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textLight,
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
  },
  studentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 8,
  },
  studentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  studentInitials: {
    color: '#3B82F6',
    fontWeight: '700',
    fontSize: 16,
  },
  studentName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  studentRoll: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
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
