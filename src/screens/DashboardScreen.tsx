import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, Layers, Sun, Moon, ChevronRight } from 'lucide-react-native';
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

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigateBatch }) => {
  const [filter, setFilter] = useState<'Morning' | 'Evening'>('Morning');
  
  const filteredBatches = mockBatches.filter(b => b.type === filter);
  const totalStudents = mockBatches.reduce((acc, curr) => acc + curr.students, 0);

  const renderBatch = ({ item }: { item: typeof mockBatches[0] }) => (
    <Card onPress={() => onNavigateBatch(item.id)} style={styles.batchCard}>
      <View style={styles.batchHeader}>
        <View style={styles.batchTitleRow}>
          <View style={styles.iconCircle}>
            <Layers color={colors.primary} size={20} />
          </View>
          <Text style={[typography.h3, styles.batchTitle]}>{item.name}</Text>
        </View>
        <ChevronRight color={colors.textLight} size={20} />
      </View>
      
      <View style={styles.batchDetailsRow}>
        <View style={styles.studentsCount}>
          <Users color={colors.textLight} size={14} />
          <Text style={styles.studentsText}>{item.students} Students</Text>
        </View>
        <Text style={[typography.caption, styles.progressText]}>{item.progress}%</Text>
      </View>
      
      <ProgressBar progress={item.progress} />
    </Card>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={typography.bodySmall}>Hello,</Text>
            <Text style={typography.h1}>John Doe</Text>
          </View>
          <View style={styles.profileBadge}>
            <Text style={styles.profileInitial}>J</Text>
          </View>
        </View>

        <Card style={styles.summaryCard}>
          <View style={styles.summaryIconContainer}>
            <Users color={colors.white} size={28} />
          </View>
          <View>
            <Text style={[typography.body, styles.summaryText]}>Total Active Students</Text>
            <Text style={[typography.h1, styles.summaryValue]}>{totalStudents}</Text>
          </View>
        </Card>

        <View style={styles.tabs}>
          <Text
            style={[styles.tabText, filter === 'Morning' && styles.activeTab]}
            onPress={() => setFilter('Morning')}
          >
            Morning <Sun size={14} color={filter === 'Morning' ? colors.primary : colors.textLight} style={{marginLeft: 4, position: 'relative', top: 2}} />
          </Text>
          <Text
            style={[styles.tabText, filter === 'Evening' && styles.activeTab]}
            onPress={() => setFilter('Evening')}
          >
            Evening <Moon size={14} color={filter === 'Evening' ? colors.primary : colors.textLight} style={{marginLeft: 4, position: 'relative', top: 2}}/>
          </Text>
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
    paddingTop: spacing.l,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.l,
  },
  profileBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '700',
  },
  summaryCard: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.l,
    marginBottom: spacing.xl,
    borderRadius: radius.l,
  },
  summaryIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.m,
  },
  summaryText: {
    color: colors.primaryLight,
    fontSize: 14,
  },
  summaryValue: {
    color: colors.white,
    marginTop: spacing.xs,
    fontSize: 32,
    lineHeight: 36,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: spacing.l,
  },
  tabText: {
    ...typography.h3,
    color: colors.textLight,
    marginRight: spacing.xl,
    paddingBottom: spacing.s,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeTab: {
    color: colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
  batchCard: {
    marginBottom: spacing.m,
    padding: spacing.m,
  },
  batchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  batchTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.s,
  },
  batchTitle: {
    fontSize: 16,
  },
  batchDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.m,
    marginBottom: spacing.s,
  },
  studentsCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentsText: {
    ...typography.caption,
    marginLeft: spacing.xs,
    fontWeight: '500',
  },
  progressText: {
    fontWeight: '600',
    color: colors.primary,
  },
});
