import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GraduationCap, Mail } from 'lucide-react-native';
import { Card } from '../components/Card';
import { colors, radius, spacing, typography } from '../theme/Theme';

const mockStudents = [
  { id: '1', name: 'Alice Smith', batch: 'React Native Basics', email: 'alice@example.com' },
  { id: '2', name: 'Bob Johnson', batch: 'UI/UX Design', email: 'bob@example.com' },
  { id: '3', name: 'Charlie Brown', batch: 'Node.js Backend', email: 'charlie@example.com' },
  { id: '4', name: 'Diana Prince', batch: 'Advanced JavaScript', email: 'diana@example.com' },
  { id: '5', name: 'Evan Wright', batch: 'React Native Basics', email: 'evan@example.com' },
];

export const StudentsScreen: React.FC = () => {
  const renderStudent = ({ item }: { item: typeof mockStudents[0] }) => (
    <Card style={styles.studentCard}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.info}>
        <Text style={[typography.h3, styles.name]}>{item.name}</Text>
        
        <View style={styles.detailRow}>
          <GraduationCap size={14} color={colors.primary} />
          <Text style={styles.detailText}>{item.batch}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Mail size={14} color={colors.textLight} />
          <Text style={styles.detailTextLight}>{item.email}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <View style={styles.container}>
        <Text style={[typography.h1, styles.title]}>All Students</Text>
        <FlatList
          data={mockStudents}
          keyExtractor={item => item.id}
          renderItem={renderStudent}
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
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: radius.round,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.m,
  },
  avatarText: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: '700',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    marginBottom: 4,
    fontSize: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  detailText: {
    ...typography.bodySmall,
    color: colors.text,
    marginLeft: spacing.xs,
    fontWeight: '500',
  },
  detailTextLight: {
    ...typography.bodySmall,
    marginLeft: spacing.xs,
  },
});
