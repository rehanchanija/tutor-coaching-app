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
  Layers,
} from 'lucide-react-native';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { colors, radius, spacing, typography } from '../theme/Theme';

interface DashboardScreenProps {
  onNavigateBatch: (batchId: string) => void;
}

const mockBatches = [
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
  const totalBatches = mockBatches.length;

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
            <Text style={[typography.h1, { color: colors.text }]}>
              John Doe
            </Text>
          </View>
          <View style={styles.profileBadge}>
            <Text style={styles.profileInitial}>J</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <Card style={[styles.statCard, { backgroundColor: colors.primary }]}>
            <View style={styles.statIconContainer}>
              <Layers color={colors.white} size={24} strokeWidth={2.5} />
            </View>
            <View>
              <Text style={styles.statLabel}>Total Batches</Text>
              <Text style={styles.statValue}>{totalBatches}</Text>
            </View>
          </Card>

          <Card
            style={[styles.statCard, { backgroundColor: colors.secondary }]}
          >
            <View style={styles.statIconContainer}>
              <Users color={colors.white} size={24} strokeWidth={2.5} />
            </View>
            <View>
              <Text style={styles.statLabel}>Total Students</Text>
              <Text style={styles.statValue}>{totalStudents}</Text>
            </View>
          </Card>
        </View>

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
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  statCard: {
    padding: spacing.l,
    borderRadius: radius.l,
    borderWidth: 0,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  statIconContainer: {
    width: 34,
    height: 32,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '800',
    marginTop: 2,
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
    paddingVertical: 10,
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
    fontSize: 14,
    fontWeight: '700',
    color: colors.textLight,
  },
  activeFilterText: {
    color: colors.white,
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
  batchCard: {
    marginBottom: spacing.s,
    padding: spacing.s + 4,
    borderRadius: radius.m,
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
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.s + 4,
  },
  batchTitle: {
    fontSize: 15,
    flexShrink: 1,
  },
  batchDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.m,
    marginBottom: spacing.xs,
  },
  studentsCount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  studentsText: {
    fontSize: 11,
    marginLeft: 4,
    fontWeight: '700',
    color: colors.text,
  },
  progressText: {
    fontWeight: '800',
    color: colors.text,
    fontSize: 12,
  },
});
