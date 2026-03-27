import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { colors, spacing, typography } from '../theme/Theme';

interface BatchScreenProps {
  onNavigateSubject: (batchId: string) => void;
}

const allBatches = [
  { id: '1', name: 'React Native Basics', type: 'Morning', progress: 80 },
  { id: '2', name: 'Advanced JavaScript', type: 'Morning', progress: 45 },
  { id: '3', name: 'UI/UX Design', type: 'Evening', progress: 20 },
  { id: '4', name: 'Node.js Backend', type: 'Evening', progress: 90 },
  { id: '5', name: 'Flutter Development', type: 'Morning', progress: 10 },
  { id: '6', name: 'Python for Data Science', type: 'Evening', progress: 60 },
];

export const BatchScreen: React.FC<BatchScreenProps> = ({ onNavigateSubject }) => {
  const renderBatch = ({ item }: { item: typeof allBatches[0] }) => (
    <Card onPress={() => onNavigateSubject(item.id)}>
      <View style={styles.headerRow}>
        <Text style={typography.h3}>{item.name}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.type}</Text>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressTextContainer}>
          <Text style={typography.caption}>Overall Progress</Text>
          <Text style={typography.caption}>{item.progress}%</Text>
        </View>
        <ProgressBar progress={item.progress} />
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={[typography.h1, styles.title]}>All Batches</Text>
        <FlatList
          data={allBatches}
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
  title: {
    marginBottom: spacing.l,
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.m,
  },
  badge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.s,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
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
