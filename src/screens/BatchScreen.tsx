import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Layers,
  ChevronRight,
  Search,
  Plus,
  X,
  Sun,
  Moon,
  Users,
  TrendingUp,
  Calendar,
} from 'lucide-react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { colors, radius, spacing, typography } from '../theme/Theme';

interface BatchScreenProps {
  onNavigateSubject: (batchId: string) => void;
}

const allBatches = [
  {
    id: '1',
    name: 'React Native Basics',
    type: 'Morning',
    progress: 80,
    students: 25,
  },
  {
    id: '2',
    name: 'Advanced JavaScript',
    type: 'Morning',
    progress: 45,
    students: 18,
  },
  {
    id: '3',
    name: 'UI/UX Design',
    type: 'Evening',
    progress: 20,
    students: 30,
  },
  {
    id: '4',
    name: 'Node.js Backend',
    type: 'Evening',
    progress: 90,
    students: 22,
  },
  {
    id: '5',
    name: 'Flutter Development',
    type: 'Morning',
    progress: 10,
    students: 30,
  },
  {
    id: '6',
    name: 'Python for Data Science',
    type: 'Evening',
    progress: 60,
    students: 40,
  },
];

export const BatchScreen: React.FC<BatchScreenProps> = ({
  onNavigateSubject,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [batchName, setBatchName] = useState('');
  const [batchType, setBatchType] = useState<'Morning' | 'Evening'>('Morning');
  const [startDate, setStartDate] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeDateField, setActiveDateField] = useState<
    'start' | 'completion'
  >('start');
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const filteredBatches = allBatches.filter(batch =>
    batch.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCreateBatch = () => {
    setModalVisible(false);
    setBatchName('');
    setBatchType('Morning');
    setStartDate('');
    setCompletionDate('');
  };

  const renderBatch = ({ item }: { item: (typeof allBatches)[0] }) => {
    const isComplete = item.progress >= 100;
    const statusText = isComplete ? 'Complete' : 'Active';

    return (
      <Card onPress={() => onNavigateSubject(item.id)} style={styles.batchCard}>
        <View style={styles.headerRow}>
          <View style={styles.titleWrapper}>
            <View style={styles.iconCircle}>
              <Layers size={20} color={colors.primary} strokeWidth={2.5} />
            </View>
            <Text style={[typography.h3, styles.batchName]} numberOfLines={1}>
              {item.name}
            </Text>
          </View>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{statusText}</Text>
          </View>

          <ChevronRight color={colors.textLight} size={22} strokeWidth={2.5} />
        </View>

        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.type}</Text>
          </View>
          <View style={styles.studentsContainer}>
            <Users size={14} color={colors.textLight} />
            <Text style={styles.studentsText}>{item.students}</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressTextContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TrendingUp
                size={16}
                color={colors.secondary}
                strokeWidth={2.5}
                style={{ marginRight: 6 }}
              />
              <Text
                style={[
                  typography.caption,
                  { fontWeight: '700', color: colors.textLight },
                ]}
              >
                Overall Progress
              </Text>
            </View>
            <Text
              style={[
                typography.caption,
                { fontWeight: '800', color: colors.primary, fontSize: 13 },
              ]}
            >
              {item.progress}%
            </Text>
          </View>
          <ProgressBar progress={item.progress} color="#4F46E5" height={6} />
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[typography.h1, styles.title]}>All Batches</Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.plusButton}
            activeOpacity={0.7}
          >
            <Plus color="#FFFFFF" size={24} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Search
            color="#64748B"
            size={18}
            strokeWidth={2.5}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search batches..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <FlatList
          data={filteredBatches}
          keyExtractor={item => item.id}
          renderItem={renderBatch}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        {/* Create Batch Modal */}
        <Modal
          visible={isModalVisible}
          transparent={true}
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
                  <Text style={[typography.h2, { marginBottom: 0 }]}>
                    Create New Batch
                  </Text>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.closeBtn}
                  >
                    <X color="#94A3B8" size={22} strokeWidth={2.5} />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBody}>
                  <Input
                    label="Batch Name"
                    placeholder="e.g. JEE Advanced 2026"
                    value={batchName}
                    onChangeText={setBatchName}
                  />

                  <Text style={styles.fieldLabel}>Timing Slot</Text>
                  <View style={styles.toggleRow}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={[
                        styles.toggleBtn,
                        batchType === 'Morning' && styles.activeToggle,
                      ]}
                      onPress={() => setBatchType('Morning')}
                    >
                      <Sun
                        size={18}
                        color={
                          batchType === 'Morning'
                            ? colors.white
                            : colors.textLight
                        }
                        strokeWidth={2.5}
                      />
                      <Text
                        style={[
                          styles.toggleText,
                          batchType === 'Morning' && styles.activeToggleText,
                        ]}
                      >
                        Morning
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={[
                        styles.toggleBtn,
                        batchType === 'Evening' && styles.activeToggle,
                        { marginLeft: spacing.s },
                      ]}
                      onPress={() => setBatchType('Evening')}
                    >
                      <Moon
                        size={18}
                        color={
                          batchType === 'Evening'
                            ? colors.white
                            : colors.textLight
                        }
                        strokeWidth={2.5}
                      />
                      <Text
                        style={[
                          styles.toggleText,
                          batchType === 'Evening' && styles.activeToggleText,
                        ]}
                      >
                        Evening
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.dateRow}>
                    <View style={{ flex: 1 }}>
                      <Input
                        label="Start Date"
                        placeholder="DD/MM/YYYY"
                        value={startDate}
                        editable={false}
                        onContainerPress={() => {
                          setActiveDateField('start');
                          setShowCalendar(true);
                        }}
                        rightIcon={
                          <Calendar size={18} color={colors.textLight} />
                        }
                      />
                    </View>
                    <View style={{ width: 16 }} />
                    <View style={{ flex: 1 }}>
                      <Input
                        label="Completion"
                        placeholder="DD/MM/YYYY"
                        value={completionDate}
                        editable={false}
                        onContainerPress={() => {
                          setActiveDateField('completion');
                          setShowCalendar(true);
                        }}
                        rightIcon={
                          <Calendar size={18} color={colors.textLight} />
                        }
                      />
                    </View>
                  </View>
                </View>

                <Button
                  title="Create Batch"
                  onPress={handleCreateBatch}
                  disabled={batchName.trim() === '' || startDate.trim() === ''}
                  style={styles.modalActionBtn}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>

        {/* DATE PICKER MODAL */}
        <Modal
          visible={showCalendar}
          transparent
          animationType="slide"
          onRequestClose={() => setShowCalendar(false)}
        >
          <View style={styles.pickerOverlay}>
            <View style={styles.pickerContent}>
              <View style={styles.pickerHeader}>
                <Text style={styles.pickerTitle}>Select Date</Text>
                <TouchableOpacity onPress={() => setShowCalendar(false)}>
                  <X color="#94A3B8" size={22} strokeWidth={2.5} />
                </TouchableOpacity>
              </View>
              <ScrollView
                style={styles.calendarWrapper}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.monthYearSelector}>
                  <TouchableOpacity
                    onPress={() =>
                      setCalendarMonth(
                        calendarMonth === 0 ? 11 : calendarMonth - 1,
                      )
                    }
                  >
                    <ChevronRight
                      style={{ transform: [{ rotate: '180deg' }] }}
                      size={24}
                      color={colors.primary}
                      strokeWidth={2.5}
                    />
                  </TouchableOpacity>
                  <Text style={styles.monthYearText}>
                    {new Date(calendarYear, calendarMonth).toLocaleString(
                      'default',
                      { month: 'long', year: 'numeric' },
                    )}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      setCalendarMonth(
                        calendarMonth === 11 ? 0 : calendarMonth + 1,
                      )
                    }
                  >
                    <ChevronRight
                      size={24}
                      color={colors.primary}
                      strokeWidth={2.5}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.daysHeader}>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                    day => (
                      <Text key={day} style={styles.dayHeaderText}>
                        {day}
                      </Text>
                    ),
                  )}
                </View>
                <View style={styles.calendarGrid}>
                  {(() => {
                    const firstDay = new Date(
                      calendarYear,
                      calendarMonth,
                      1,
                    ).getDay();
                    const daysInMonth = new Date(
                      calendarYear,
                      calendarMonth + 1,
                      0,
                    ).getDate();
                    const days = [];
                    for (let i = 0; i < firstDay; i++) days.push(null);
                    for (let i = 1; i <= daysInMonth; i++) days.push(i);
                    return days.map((day, index) => {
                      const isToday =
                        day === new Date().getDate() &&
                        calendarMonth === new Date().getMonth() &&
                        calendarYear === new Date().getFullYear();
                      const d = String(day).padStart(2, '0');
                      const m = String(calendarMonth + 1).padStart(2, '0');
                      const formatted = `${d}/${m}/${calendarYear}`;
                      const isSelected =
                        (activeDateField === 'start'
                          ? startDate
                          : completionDate) === formatted;

                      return (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.calendarDay,
                            !day && styles.emptyDay,
                            isSelected && styles.selectedDay,
                          ]}
                          disabled={!day}
                          onPress={() => {
                            if (day) {
                              if (activeDateField === 'start')
                                setStartDate(formatted);
                              else setCompletionDate(formatted);
                              setShowCalendar(false);
                            }
                          }}
                        >
                          <Text
                            style={[
                              styles.calendarDayText,
                              !day && styles.emptyDayText,
                              isSelected && styles.selectedDayText,
                              isToday && !isSelected && styles.todayText,
                            ]}
                          >
                            {day}
                          </Text>
                        </TouchableOpacity>
                      );
                    });
                  })()}
                </View>
              </ScrollView>
              <Button
                title="Close"
                variant="primary"
                onPress={() => setShowCalendar(false)}
                style={{ margin: 16 }}
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  title: {
    marginBottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  plusButton: {
    backgroundColor: colors.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    height: 48,
    paddingHorizontal: spacing.m,
    marginBottom: spacing.l,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchIcon: {
    marginRight: spacing.s,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '500',
    height: '100%',
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
  batchCard: {
    marginBottom: spacing.m,
    padding: spacing.m,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: spacing.s,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: radius.m,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.m,
  },
  batchName: {
    fontSize: 17,
    flexShrink: 1,
  },
  statusBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: spacing.s,
  },
  statusText: {
    color: '#059669',
    fontSize: 11,
    fontWeight: '800',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  badge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: spacing.m,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  studentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  studentsText: {
    color: colors.textLight,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  progressContainer: {
    marginTop: spacing.xs,
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoidingView: {
    width: '100%',
    paddingHorizontal: spacing.l,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: spacing.l,
    paddingTop: spacing.l,
    paddingBottom: spacing.l,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
    marginBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.l,
  },
  closeBtn: {
    padding: 4,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
  },
  modalBody: {
    marginBottom: spacing.xl,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
    marginTop: 4,
    letterSpacing: -0.2,
  },
  toggleRow: {
    flexDirection: 'row',
  },
  toggleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: radius.l,
  },
  activeToggle: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  toggleText: {
    ...typography.caption,
    fontWeight: '800',
    marginLeft: 8,
    color: '#64748B',
  },
  activeToggleText: {
    color: colors.white,
  },
  dateRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  modalActionBtn: {
    width: '100%',
  },
  pickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'flex-end',
  },
  pickerContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingBottom: 20,
    maxHeight: '80%',
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  calendarWrapper: {
    paddingHorizontal: 16,
  },
  monthYearSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 8,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  daysHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  dayHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '700',
    color: '#94A3B8',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  selectedDay: {
    backgroundColor: colors.primary,
  },
  calendarDayText: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '600',
  },
  selectedDayText: {
    color: '#FFF',
    fontWeight: '800',
  },
  todayText: {
    color: colors.primary,
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
  emptyDay: {
    backgroundColor: 'transparent',
  },
  emptyDayText: {
    opacity: 0,
  },
});
