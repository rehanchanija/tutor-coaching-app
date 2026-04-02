import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Modal,
  Pressable,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
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
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { colors, radius, spacing, typography } from '../theme/Theme';
import { subjectService, Subject } from '../services/subjectService';
import { studentService, User } from '../services/studentService';
import { batchService, Batch } from '../services/batchService';
import Toast from 'react-native-toast-message';

interface SubjectScreenProps {
  batchId: string;
  onBack: () => void;
  onNavigateCourse: (subjectId: string) => void;
}

export const SubjectScreen: React.FC<SubjectScreenProps> = ({
  batchId,
  onBack,
  onNavigateCourse,
}) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [batchDetail, setBatchDetail] = useState<Batch | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = React.useState<'Subjects' | 'Students'>('Subjects');

  // Input states for Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [subjectName, setSubjectName] = useState('');
  const [topics, setTopics] = useState('');
  const [chapters, setChapters] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchInitialData();
  }, [batchId]);

  useEffect(() => {
    if (activeTab === 'Students' && students.length === 0) {
      fetchStudents();
    }
  }, [activeTab]);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const [subjectsData, batchInfo] = await Promise.all([
        subjectService.getByBatch(batchId),
        batchService.findById(batchId),
      ]);
      setSubjects(subjectsData);
      setBatchDetail(batchInfo);
    } catch (err) {
      console.error('Error fetching subject data', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const data = await studentService.getAll(batchId);
      setStudents(data);
    } catch (err) {
      console.error('Error fetching students', err);
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    if (activeTab === 'Subjects') fetchInitialData();
    else fetchStudents();
  };

  const subjectSchema = z.object({
    name: z.string().min(3, 'Subject name must be at least 3 characters'),
    // topics: z.string().min(5, 'Provide a brief topics overview'),
    // chapters: z.string().regex(/^\d+$/, 'Must be a number').refine(v => parseInt(v) > 0, 'At least 1 chapter required'),
  });

  const validate = () => {
    try {
      setErrors({});
      subjectSchema.parse({ name: subjectName });
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

  const handleCreateSubject = async () => {
    if (!validate()) return;
    
    setIsLoading(true);
    try {
      await subjectService.create({
        name: subjectName,
        batchId: batchId,
      });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Subject created successfully!',
      });
      
      setModalVisible(false);
      setSubjectName('');
      setTopics('');
      setChapters('');
      setErrors({});
      fetchInitialData();
    } catch (err) {
      console.error('Failed to create subject', err);
      Toast.show({
        type: 'error',
        text1: 'Creation Error',
        text2: 'Could not create subject.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderSubject = ({ item }: { item: Subject }) => (
    <Card onPress={() => onNavigateCourse(item._id)} style={styles.subjectCard}>
      <View style={styles.cardHeader}>
        <View style={styles.iconBox}>
          <Book color={colors.primary} size={22} strokeWidth={2.5} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.subjectName}>{item.name}</Text>
          <Text style={styles.topicText} numberOfLines={1}>Chapters and progress coming soon</Text>
        </View>
        <ChevronRight color={colors.textMuted} size={20} />
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.metaBox}>
          <LayoutGrid color={colors.textLight} size={14} />
          <Text style={styles.metaText}>0 Chapters</Text>
        </View>
        <Text style={styles.progressValue}>0%</Text>
      </View>
      <ProgressBar progress={0} color={colors.primary} height={6} />
    </Card>
  );

  // Student Input states
  const [studentModalVisible, setStudentModalVisible] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentAddress, setStudentAddress] = useState('');
  const [studentPassword, setStudentPassword] = useState('');

  const handlePlusPress = () => {
    if (activeTab === 'Subjects') setModalVisible(true);
    else setStudentModalVisible(true);
  };

  const handleCreateStudent = async () => {
    if (!studentName || !studentEmail || !studentPhone || !studentAddress) {
      Toast.show({ type: 'error', text1: 'Validation Error', text2: 'Name, Email, Phone and Address are required' });
      return;
    }
    
    setIsLoading(true);
    try {
      await studentService.create({
        name: studentName,
        email: studentEmail,
        phone: studentPhone,
        address: studentAddress,
        password: studentPassword || '123456', // Default password if empty
        batchId: batchId,
      });

      Toast.show({ type: 'success', text1: 'Success', text2: 'Student added successfully!' });
      setStudentModalVisible(false);
      setStudentName('');
      setStudentEmail('');
      setStudentPhone('');
      setStudentAddress('');
      setStudentPassword('');
      fetchStudents();
    } catch (err) {
      console.error('Failed to create student', err);
      Toast.show({ type: 'error', text1: 'Error', text2: 'Could not add student.' });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStudent = ({ item }: { item: User }) => {
    const initials = item.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    return (
      <View style={styles.studentItem}>
        <View style={styles.studentAvatar}>
          <Text style={styles.studentInitials}>{initials}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.studentName}>{item.name}</Text>
          <Text style={styles.studentRoll}>{item.email}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: colors.successLight },
          ]}
        >
          <Text style={[styles.statusText, { color: colors.success }]}>
            Active
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Purple Header Stats Section */}
      <View style={styles.headerSection}>
        <SafeAreaView edges={['top', 'left', 'right']}>
          <View style={styles.topNav}>
            <TouchableOpacity onPress={onBack} style={styles.backBtn}>
              <ChevronLeft color="#FFFFFF" size={28} strokeWidth={2.5} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{batchDetail?.name || 'Loading...'}</Text>
            <View style={{ flex: 1 }} />
            <TouchableOpacity onPress={handlePlusPress} style={styles.plusIconButton}>
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
                  error={errors.name}
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

      {/* Create Student Modal */}
      <Modal
        visible={studentModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setStudentModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable 
            style={StyleSheet.absoluteFill} 
            onPress={() => setStudentModalVisible(false)} 
          />
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.keyboardAvoidingView}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add New Student</Text>
                <TouchableOpacity onPress={() => setStudentModalVisible(false)} style={styles.closeBtn}>
                  <X color="#94A3B8" size={22} strokeWidth={2.5} />
                </TouchableOpacity>
              </View>

              <View style={styles.modalBody}>
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  value={studentName}
                  onChangeText={setStudentName}
                />
                <Input
                  label="Email ID"
                  placeholder="john@example.com"
                  value={studentEmail}
                  onChangeText={setStudentEmail}
                  keyboardType="email-address"
                />
                <Input
                  label="Phone Number"
                  placeholder="+91 99999 00000"
                  value={studentPhone}
                  onChangeText={setStudentPhone}
                  keyboardType="phone-pad"
                />
                <Input
                  label="Permanent Address"
                  placeholder="Street, City, Pin"
                  value={studentAddress}
                  onChangeText={setStudentAddress}
                />
                <Input
                  label="Password"
                  placeholder="Default: 123456"
                  value={studentPassword}
                  onChangeText={setStudentPassword}
                  secureTextEntry
                />
              </View>

              <Button
                title="Register Student"
                onPress={handleCreateStudent}
                disabled={!studentName || !studentEmail}
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

        {isLoading && !isRefreshing ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <>
            {activeTab === 'Subjects' && (
              <FlatList
                data={subjects}
                renderItem={renderSubject}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={[colors.primary]} />
                }
              />
            )}

            {activeTab === 'Students' && (
              <FlatList
                data={students}
                renderItem={renderStudent}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={[colors.primary]} />
                }
              />
            )}
          </>
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
