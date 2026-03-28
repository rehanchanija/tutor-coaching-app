import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Users,
  LibraryBig,
  Sun,
  Moon,
  ChevronRight,
  GraduationCap,
} from 'lucide-react-native';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { colors, radius, spacing, typography } from '../theme/Theme';

interface DashboardScreenProps {
  onNavigateBatch: (batchId: string) => void;
}

const mockBatches = [
  { id: '1', name: 'React Native Basics', type: 'Morning', progress: 80, students: 25 },
  { id: '2', name: 'Advanced JavaScript', type: 'Morning', progress: 45, students: 18 },
  { id: '3', name: 'UI/UX Design', type: 'Evening', progress: 20, students: 30 },
  { id: '4', name: 'Node.js Backend', type: 'Evening', progress: 90, students: 22 },
];

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigateBatch,
}) => {
  const [filter, setFilter] = useState<'Morning' | 'Evening'>('Morning');

  const filteredBatches = mockBatches.filter(b => b.type === filter);
  const totalStudents = mockBatches.reduce(
    (acc, curr) => acc + curr.students,
    0,
  );

  const renderBatch = ({ item }: { item: (typeof mockBatches)[0] }) => (
    <Card onPress={() => onNavigateBatch(item.id)} style={styles.batchCard}>
      <View style={styles.batchHeader}>
        <View style={styles.batchTitleRow}>
          <View style={styles.iconCircle}>
            <LibraryBig color={colors.primary} size={20} strokeWidth={2.5} />
          </View>
          <Text style={[typography.h3, styles.batchTitle]} numberOfLines={1}>
            {item.name}
          </Text>
        </View>
        <ChevronRight color={colors.textLight} size={22} strokeWidth={2.5} />
      </View>

      <View style={styles.batchDetailsRow}>
        <View style={styles.studentsCount}>
          <Users color={colors.secondary} size={16} strokeWidth={2.5} />
          <Text style={styles.studentsText}>{item.students} Students</Text>
        </View>
        <Text style={[typography.caption, styles.progressText]}>
          {item.progress}%
        </Text>
      </View>

      <ProgressBar
        progress={item.progress}
        color={colors.secondary}
        height={6}
      />
    </Card>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={[typography.body, { color: colors.textLight }]}>
              Hello,
            </Text>
            <Text style={[typography.h1, { color: colors.primary }]}>
              John Doe
            </Text>
          </View>
          <View style={styles.profileBadge}>
            <Text style={styles.profileInitial}>J</Text>
          </View>
        </View>

        <Card style={styles.summaryCard}>
          <View style={styles.summaryIconContainer}>
            <GraduationCap color={colors.white} size={32} strokeWidth={2} />
          </View>
          <View>
            <Text style={[typography.body, styles.summaryText]}>
              Total Active Students
            </Text>
            <Text style={[typography.h1, styles.summaryValue]}>
              {totalStudents.toLocaleString()}
            </Text>
          </View>
        </Card>

        <View style={styles.tabsContainer}>
          <Text style={[typography.h2, { marginBottom: spacing.m }]}>
            My Batches
          </Text>
          <View style={styles.toggleFilters}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.filterBtn,
                filter === 'Morning' && styles.activeFilterBtn,
              ]}
              onPress={() => setFilter('Morning')}
            >
              <Sun
                size={16}
                color={filter === 'Morning' ? colors.white : colors.textLight}
                strokeWidth={2.5}
              />
              <Text
                style={[
                  styles.filterText,
                  filter === 'Morning' && styles.activeFilterText,
                ]}
              >
                {' '}
                Morning
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.filterBtn,
                filter === 'Evening' && styles.activeFilterBtn,
                { marginLeft: spacing.m },
              ]}
              onPress={() => setFilter('Evening')}
            >
              <Moon
                size={16}
                color={filter === 'Evening' ? colors.white : colors.textLight}
                strokeWidth={2.5}
              />
              <Text
                style={[
                  styles.filterText,
                  filter === 'Evening' && styles.activeFilterText,
                ]}
              >
                {' '}
                Evening
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={filteredBatches}
          keyExtractor={item => item.id}
          renderItem={renderBatch}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
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
    paddingHorizontal: spacing.l,
    paddingTop: spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.l,
  },
  profileBadge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.secondaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  profileInitial: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: '800',
  },
  summaryCard: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.l,
    marginBottom: spacing.xl,
    borderRadius: radius.l,
    borderWidth: 0,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  summaryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.m,
  },
  summaryText: {
    color: colors.primaryLight,
    fontSize: 14,
    opacity: 0.9,
  },
  summaryValue: {
    color: colors.white,
    marginTop: spacing.xs - 2,
    fontSize: 34,
    lineHeight: 38,
  },
  tabsContainer: {
    marginBottom: spacing.m,
  },
  toggleFilters: {
    flexDirection: 'row',
  },
  filterBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderRadius: radius.m,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeFilterBtn: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    ...typography.h3,
    fontSize: 15,
    color: colors.textLight,
  },
  activeFilterText: {
    color: colors.white,
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
  batchCard: {
    marginBottom: spacing.m,
    padding: spacing.m,
    borderRadius: radius.l,
  },
  batchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  batchTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  batchTitle: {
    fontSize: 17,
    flexShrink: 1,
  },
  batchDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.l,
    marginBottom: spacing.s,
  },
  studentsCount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  studentsText: {
    ...typography.caption,
    marginLeft: 6,
    fontWeight: '700',
    color: colors.secondary,
  },
  progressText: {
    fontWeight: '800',
    color: colors.primary,
    fontSize: 14,
  },
});
