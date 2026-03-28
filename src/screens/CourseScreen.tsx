import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, CircleDashed, PlayCircle, CheckCircle } from 'lucide-react-native';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { Checkbox } from '../components/Checkbox';
import { colors, radius, spacing, typography } from '../theme/Theme';

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

  const getStatusIcon = (status: CourseStatus, size = 16) => {
    switch (status) {
      case 'Completed': return <CheckCircle size={size} color={colors.success} />;
      case 'Ongoing': return <PlayCircle size={size} color={colors.warning} />;
      case 'Not Started': return <CircleDashed size={size} color={colors.textLight} />;
      default: return <CircleDashed size={size} color={colors.textLight} />;
    }
  };

  const renderCourse = ({ item }: { item: CourseItem }) => (
    <Card style={styles.courseCard}>
      <View style={styles.courseHeader}>
        <View style={styles.courseInfo}>
          <Text style={[typography.h3, styles.courseName]}>{item.name}</Text>
          <View style={styles.statusBadge}>
            {getStatusIcon(item.status)}
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status}
            </Text>
          </View>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            checked={item.status === 'Completed'}
            onChange={(checked) => toggleCourseCompletion(item.id, checked)}
          />
        </View>
      </View>
      
      <View style={styles.progressSection}>
        <View style={styles.progressTextContainer}>
          <Text style={typography.caption}>Course Progress</Text>
          <Text style={[typography.caption, { color: getStatusColor(item.status), fontWeight: '600' }]}>
            {item.progress}%
          </Text>
        </View>
        <ProgressBar progress={item.progress} color={getStatusColor(item.status)} height={6} />
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
  courseCard: {
    marginBottom: spacing.m,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  courseInfo: {
    flex: 1,
    paddingRight: spacing.m,
  },
  courseName: {
    marginBottom: spacing.xs,
    fontSize: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.s,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
  },
  statusText: {
    ...typography.caption,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  checkboxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  progressSection: {
    width: '100%',
    marginTop: spacing.l,
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
});
