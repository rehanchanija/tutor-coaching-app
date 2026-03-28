import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut, Trophy, Users, Target } from 'lucide-react-native';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { colors, radius, spacing, typography } from '../theme/Theme';

interface ProfileScreenProps {
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout }) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[typography.h1, styles.title]}>Profile</Text>
          <TouchableOpacity onPress={onLogout} style={styles.logoutIcon} activeOpacity={0.7}>
            <LogOut color={colors.warning} size={24} />
          </TouchableOpacity>
        </View>

        <Card style={styles.headerCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>J</Text>
          </View>
          <Text style={[typography.h2, styles.name]}>John Doe</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>Senior Tutor</Text>
          </View>
        </Card>

        <Text style={[typography.h3, styles.sectionTitle]}>Your Statistics</Text>

        <Card style={styles.statsCard}>
          <View style={styles.statRow}>
            <View style={styles.statIconWrapper}>
              <Trophy size={18} color={colors.primary} />
            </View>
            <Text style={[typography.body, styles.statLabel]}>Completed Courses</Text>
            <Text style={[typography.h3, styles.statValue]}>12</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.statRow}>
            <View style={[styles.statIconWrapper, { backgroundColor: '#F0FDF4' }]}>
              <Users size={18} color={colors.success} />
            </View>
            <Text style={[typography.body, styles.statLabel]}>Active Students</Text>
            <Text style={[typography.h3, styles.statValue, { color: colors.success }]}>125</Text>
          </View>
        </Card>

        <Card style={styles.progressCard}>
          <View style={styles.progressHeaderRow}>
            <Target size={20} color={colors.warning} />
            <Text style={[typography.body, styles.progressTitle]}>Overall Progress</Text>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressTextContainer}>
              <Text style={typography.caption}>Average Completion</Text>
              <Text style={[typography.caption, { fontWeight: '700', color: colors.primary }]}>68%</Text>
            </View>
            <ProgressBar progress={68} />
          </View>
        </Card>
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
  title: {
    marginBottom: 0,
  },
  logoutIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCard: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.m,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.m,
    borderWidth: 4,
    borderColor: colors.primaryLight,
  },
  avatarText: {
    color: colors.white,
    fontSize: 36,
    fontWeight: 'bold',
  },
  name: {
    marginBottom: spacing.xs,
    fontSize: 22,
  },
  roleBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.m,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: spacing.xs,
  },
  roleText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  sectionTitle: {
    marginBottom: spacing.m,
  },
  statsCard: {
    marginBottom: spacing.l,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.s,
  },
  statIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.m,
  },
  statLabel: {
    flex: 1,
    color: colors.text,
  },
  statValue: {
    color: colors.primary,
    fontSize: 20,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.s,
  },
  progressCard: {
    paddingVertical: spacing.l,
  },
  progressHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  progressTitle: {
    marginLeft: spacing.s,
    fontWeight: '600',
    fontSize: 16,
  },
  progressContainer: {
    width: '100%',
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.s,
  },
});
