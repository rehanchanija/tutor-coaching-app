import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Card } from '../components/Card';
import { colors, radius, spacing, typography } from '../theme/Theme';

const mockStudents = [
  { id: '1', name: 'Alice Smith', batch: 'React Native Basics' },
  { id: '2', name: 'Bob Johnson', batch: 'UI/UX Design' },
  { id: '3', name: 'Charlie Brown', batch: 'Node.js Backend' },
  { id: '4', name: 'Diana Prince', batch: 'Advanced JavaScript' },
  { id: '5', name: 'Evan Wright', batch: 'React Native Basics' },
];

export const StudentsScreen: React.FC = () => {
  const renderStudent = ({ item }: { item: typeof mockStudents[0] }) => (
    <Card style={styles.studentCard}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.info}>
        <Text style={[typography.h3, styles.name]}>{item.name}</Text>
        <Text style={typography.bodySmall}>{item.batch}</Text>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
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
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radius.round,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.m,
  },
  avatarText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
  },
  name: {
    marginBottom: 4,
  },
});
