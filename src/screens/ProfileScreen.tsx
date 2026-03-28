import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut, Trophy, Users, Target, CalendarDays, Award } from 'lucide-react-native';
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
          <Text style={[typography.h1, styles.title]}>My Profile</Text>
          <TouchableOpacity onPress={onLogout} style={styles.logoutIcon} activeOpacity={0.7}>
            <LogOut color={colors.danger} size={22} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        <Card style={styles.headerCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>J</Text>
            <View style={styles.verifiedBadge}>
              <Award color={colors.white} size={14} strokeWidth={3} />
            </View>
          </View>
          <Text style={[typography.h2, styles.name]}>John Doe</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>Senior Tutor</Text>
          </View>
        </Card>

        <Text style={[typography.h2, styles.sectionTitle]}>Insights</Text>

        <Card style={styles.statsCard}>
          <View style={styles.statRow}>
            <View style={styles.statIconWrapper}>
              <Trophy size={18} color={colors.primary} strokeWidth={2.5} />
            </View>
            <Text style={[typography.body, styles.statLabel]}>Completed Courses</Text>
            <Text style={[typography.h2, styles.statValue]}>32</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.statRow}>
            <View style={[styles.statIconWrapper, { backgroundColor: '#F0FDF4' }]}>
              <Users size={18} color={colors.success} strokeWidth={2.5} />
            </View>
            <Text style={[typography.body, styles.statLabel]}>Active Students</Text>
            <Text style={[typography.h2, styles.statValue, { color: colors.success }]}>125</Text>
          </View>

           <View style={styles.divider} />
          
          <View style={styles.statRow}>
            <View style={[styles.statIconWrapper, { backgroundColor: colors.secondaryLight }]}>
              <CalendarDays size={18} color={colors.secondary} strokeWidth={2.5} />
            </View>
            <Text style={[typography.body, styles.statLabel]}>Total Watch Hours</Text>
            <Text style={[typography.h2, styles.statValue, { color: colors.secondary }]}>450+</Text>
          </View>
        </Card>

        <Card style={styles.progressCard}>
          <View style={styles.progressHeaderRow}>
            <Target size={20} color={colors.secondary} strokeWidth={2.5} />
            <Text style={[typography.body, styles.progressTitle]}>Course Completion Rate</Text>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressTextContainer}>
              <Text style={typography.caption}>Average across all batches</Text>
              <Text style={[typography.caption, { fontWeight: '800', color: colors.primary, fontSize: 14 }]}>68%</Text>
            </View>
            <ProgressBar progress={68} color={colors.success} height={8} />
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
    paddingTop: spacing.m,
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
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  headerCard: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.m,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.m,
    borderWidth: 4,
    borderColor: colors.primaryLight,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  avatarText: {
    color: colors.white,
    fontSize: 42,
    fontWeight: '800',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.card,
  },
  name: {
    marginBottom: spacing.xs,
    fontSize: 24,
  },
  roleBadge: {
    backgroundColor: colors.secondaryLight,
    paddingHorizontal: spacing.m,
    paddingVertical: 6,
    borderRadius: radius.round,
    marginTop: spacing.xs,
  },
  roleText: {
    color: colors.secondary,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
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
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.m,
  },
  statLabel: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  statValue: {
    color: colors.primary,
    fontSize: 22,
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
    fontWeight: '700',
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
