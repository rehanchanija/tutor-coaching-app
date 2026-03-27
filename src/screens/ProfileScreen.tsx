import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { Button } from '../components/Button';
import { colors, radius, spacing, typography } from '../theme/Theme';

interface ProfileScreenProps {
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={[typography.h1, styles.title]}>Profile</Text>

        <View style={styles.headerCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>T</Text>
          </View>
          <Text style={[typography.h2, styles.name]}>John Doe</Text>
          <Text style={typography.bodySmall}>Senior Tutor</Text>
        </View>

        <Text style={[typography.h3, styles.sectionTitle]}>Your Statistics</Text>

        <Card>
          <View style={styles.statRow}>
            <Text style={typography.body}>Completed Courses</Text>
            <Text style={[typography.h3, styles.statValue]}>12</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statRow}>
            <Text style={typography.body}>Active Students</Text>
            <Text style={[typography.h3, styles.statValue]}>125</Text>
          </View>
        </Card>

        <Card>
          <Text style={[typography.body, styles.progressTitle]}>Overall Progress</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressTextContainer}>
              <Text style={typography.caption}>Average Completion</Text>
              <Text style={typography.caption}>68%</Text>
            </View>
            <ProgressBar progress={68} />
          </View>
        </Card>

        <View style={styles.logoutContainer}>
          <Button title="Log Out" variant="outline" onPress={onLogout} />
        </View>
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
  headerCard: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingVertical: spacing.l,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: radius.round,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  avatarText: {
    color: colors.white,
    fontSize: 32,
    fontWeight: 'bold',
  },
  name: {
    marginBottom: spacing.xs,
  },
  sectionTitle: {
    marginBottom: spacing.m,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.s,
  },
  statValue: {
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.s,
  },
  progressTitle: {
    marginBottom: spacing.m,
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
  logoutContainer: {
    marginTop: 'auto',
    marginBottom: spacing.xl,
  },
});
