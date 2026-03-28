import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Layers, ChevronRight, TrendingUp } from 'lucide-react-native';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { colors, radius, spacing, typography } from '../theme/Theme';

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
    <Card onPress={() => onNavigateSubject(item.id)} style={styles.batchCard}>
      <View style={styles.headerRow}>
        <View style={styles.titleWrapper}>
          <View style={styles.iconCircle}>
            <Layers size={18} color={colors.primary} />
          </View>
          <Text style={[typography.h3, styles.batchName]}>{item.name}</Text>
        </View>
        <ChevronRight color={colors.textLight} size={20} />
      </View>
      
      <View style={styles.badgeRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.type}</Text>
        </View>
        <View style={styles.progressTextContainer}>
          <TrendingUp size={14} color={colors.textLight} style={{ marginRight: 4 }} />
          <Text style={typography.caption}>{item.progress}% Completed</Text>
        </View>
      </View>

      <ProgressBar progress={item.progress} />
    </Card>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
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
  batchCard: {
    marginBottom: spacing.m,
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
    paddingRight: spacing.m,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: radius.m,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.s,
  },
  batchName: {
    fontSize: 16,
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  badge: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.s,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badgeText: {
    color: colors.textLight,
    fontSize: 12,
    fontWeight: '600',
  },
  progressTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
