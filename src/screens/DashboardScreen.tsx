import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
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
    <Card onPress={() => onNavigateBatch(item.id)}>
      <View style={styles.batchHeader}>
        <Text style={typography.h3}>{item.name}</Text>
        <Text style={typography.bodySmall}>{item.students} Students</Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressTextContainer}>
          <Text style={typography.caption}>Progress</Text>
          <Text style={typography.caption}>{item.progress}%</Text>
        </View>
        <ProgressBar progress={item.progress} />
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={typography.body}>Good Morning,</Text>
          <Text style={typography.h1}>Tutor</Text>
        </View>

        <Card style={styles.summaryCard}>
          <Text style={[typography.body, styles.summaryText]}>Total Active Students</Text>
          <Text style={[typography.h1, styles.summaryValue]}>{totalStudents}</Text>
        </Card>

        <View style={styles.tabs}>
          <Text
            style={[styles.tabText, filter === 'Morning' && styles.activeTab]}
            onPress={() => setFilter('Morning')}
          >
            Morning
          </Text>
          <Text
            style={[styles.tabText, filter === 'Evening' && styles.activeTab]}
            onPress={() => setFilter('Evening')}
          >
            Evening
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
    paddingTop: spacing.m,
  },
  header: {
    marginBottom: spacing.l,
  },
  summaryCard: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginBottom: spacing.xl,
  },
  summaryText: {
    color: colors.primaryLight,
  },
  summaryValue: {
    color: colors.white,
    marginTop: spacing.s,
    fontSize: 32,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: spacing.m,
  },
  tabText: {
    ...typography.h3,
    color: colors.textLight,
    marginRight: spacing.l,
    paddingBottom: spacing.xs,
  },
  activeTab: {
    color: colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
  batchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  progressContainer: {
    width: '100%',
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
});
