import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { Checkbox } from '../components/Checkbox';
import { colors, spacing, typography } from '../theme/Theme';

interface CourseScreenProps {
  onBack: () => void;
}

type CourseStatus = 'Not Started' | 'Ongoing' | 'Completed';

interface CourseItem {
  id: string;
  name: string;
  progress: number;
  status: CourseStatus;
}

const initialCourses: CourseItem[] = [
  { id: 'c1', name: 'Understanding Hooks', progress: 100, status: 'Completed' },
  { id: 'c2', name: 'Custom Components', progress: 50, status: 'Ongoing' },
  { id: 'c3', name: 'State Management', progress: 0, status: 'Not Started' },
];

export const CourseScreen: React.FC<CourseScreenProps> = ({ onBack }) => {
  const [courses, setCourses] = useState<CourseItem[]>(initialCourses);

  const toggleCourseCompletion = (id: string, checked: boolean) => {
    setCourses(prev => prev.map(course => {
      if (course.id === id) {
        return {
          ...course,
          status: checked ? 'Completed' : 'Ongoing',
          progress: checked ? 100 : (course.progress === 100 ? 50 : course.progress),
        };
      }
      return course;
    }));
  };

  const getStatusColor = (status: CourseStatus) => {
    switch (status) {
      case 'Completed': return colors.success;
      case 'Ongoing': return colors.warning;
      case 'Not Started': return colors.textLight;
      default: return colors.textLight;
    }
  };

  const renderCourse = ({ item }: { item: CourseItem }) => (
    <Card>
      <View style={styles.courseHeader}>
        <View style={styles.courseInfo}>
          <Text style={[typography.h3, styles.courseName]}>{item.name}</Text>
          <View style={styles.statusRow}>
            <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]} />
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
        <Checkbox
          checked={item.status === 'Completed'}
          onChange={(checked) => toggleCourseCompletion(item.id, checked)}
        />
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressTextContainer}>
          <Text style={typography.caption}>Course Progress</Text>
          <Text style={typography.caption}>{item.progress}%</Text>
        </View>
        <ProgressBar progress={item.progress} color={getStatusColor(item.status)} />
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
          <Text style={[typography.h2, styles.title]}>Courses</Text>
        </View>

        <FlatList
          data={courses}
          keyExtractor={item => item.id}
          renderItem={renderCourse}
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
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.l,
  },
  courseInfo: {
    flex: 1,
    paddingRight: spacing.m,
  },
  courseName: {
    marginBottom: spacing.xs,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  statusText: {
    ...typography.caption,
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
