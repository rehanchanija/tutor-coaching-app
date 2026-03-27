import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { colors, spacing, typography } from '../theme/Theme';

interface SubjectScreenProps {
  onBack: () => void;
  onNavigateCourse: (subjectId: string) => void;
}

const mockSubjects = [
  { id: 's1', name: 'Introduction to Components', progress: 100 },
  { id: 's2', name: 'State and Props', progress: 80 },
  { id: 's3', name: 'Navigation', progress: 40 },
  { id: 's4', name: 'API Integration', progress: 0 },
];

export const SubjectScreen: React.FC<SubjectScreenProps> = ({ onBack, onNavigateCourse }) => {
  const renderSubject = ({ item }: { item: typeof mockSubjects[0] }) => (
    <Card onPress={() => onNavigateCourse(item.id)}>
      <Text style={[typography.h3, styles.subjectName]}>{item.name}</Text>
      <View style={styles.progressContainer}>
        <View style={styles.progressTextContainer}>
          <Text style={typography.caption}>Completion</Text>
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
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={[typography.h2, styles.title]}>Subjects</Text>
        </View>

        <FlatList
          data={mockSubjects}
          keyExtractor={item => item.id}
          renderItem={renderSubject}
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
    paddingTop: spacing.s,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingTop: spacing.s,
  },
  backButton: {
    paddingRight: spacing.m,
    paddingVertical: spacing.xs,
  },
  backText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    flex: 1,
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
  subjectName: {
    marginBottom: spacing.l,
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
