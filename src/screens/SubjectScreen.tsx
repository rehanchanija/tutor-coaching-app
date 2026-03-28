import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react-native';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { colors, radius, spacing, typography } from '../theme/Theme';

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
    <Card onPress={() => onNavigateCourse(item.id)} style={styles.subjectCard}>
      <View style={styles.topRow}>
        <View style={styles.iconCircle}>
          {item.progress === 100 ? (
            <CheckCircle2 color={colors.success} size={20} />
          ) : (
            <BookOpen color={colors.primary} size={20} />
          )}
        </View>
        <Text style={[typography.h3, styles.subjectName, item.progress === 100 && { color: colors.success }]}>
          {item.name}
        </Text>
        <ChevronRight color={colors.textLight} size={20} />
      </View>
      <View style={styles.progressSection}>
        <View style={styles.progressTextContainer}>
          <Text style={typography.caption}>Completion</Text>
          <Text style={[typography.caption, item.progress === 100 && { color: colors.success }]}>
            {item.progress}%
          </Text>
        </View>
        <ProgressBar progress={item.progress} color={item.progress === 100 ? colors.success : colors.primary} />
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
            <ChevronLeft color={colors.text} size={24} />
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.s,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    flex: 1,
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
  subjectCard: {
    marginBottom: spacing.m,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: radius.round,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.s,
  },
  subjectName: {
    flex: 1,
    paddingRight: spacing.s,
  },
  progressSection: {
    width: '100%',
    paddingLeft: 44, 
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
});
