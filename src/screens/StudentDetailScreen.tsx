import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { colors, spacing, typography, radius } from '../theme/Theme';

interface StudentDetailScreenProps {
  studentId: string;
  onBack: () => void;
}

// Temporary hardcoded data to match the screenshot
const studentData = {
  name: 'Aarav Sharma',
  batch: 'JEE Mains A',
  roll: '01',
  status: 'Active',
  initials: 'AS',
  feeDue: '₹0',
  phone: '+91 98765 43210',
  email: 'aarav@mail.com',
  parent: 'Vikram Sharma',
};

export const StudentDetailScreen: React.FC<StudentDetailScreenProps> = ({ onBack, studentId }) => {
  return (
    <View style={styles.container}>
      {/* Top Green Section */}
      <View style={styles.topSection}>
        <SafeAreaView edges={['top', 'left', 'right']}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.8}>
              <ChevronLeft color="#FFFFFF" size={18} strokeWidth={3} />
              <Text style={styles.backText}>Students</Text>
            </TouchableOpacity>
          </View>

          {/* Profile Info */}
          <View style={styles.profileContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{studentData.initials}</Text>
            </View>

            <Text style={styles.name}>{studentData.name}</Text>
            <Text style={styles.subtitle}>
              {studentData.batch} • Roll No. {studentData.roll}
            </Text>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{studentData.status} Student</Text>
            </View>
          </View>
        </SafeAreaView>
      </View>

      {/* Bottom White Section */}
      <View style={styles.bottomSection}>
        {/* Stats Row */}
        <View style={styles.statsRow}>
          {/* Omitted Attendance and Avg Score per instructions, only showing Fee Due */}
          <View style={[styles.statCard, { backgroundColor: '#FEF3C7' }]}>
            <Text style={[styles.statValue, { color: '#B45309' }]}>{studentData.feeDue}</Text>
            <Text style={styles.statLabel}>Fee Due</Text>
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.contactContainer}>
          <Text style={styles.sectionTitle}>Contact Info</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValueFaint}>{studentData.phone}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValuePrimary}>{studentData.email}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Parent</Text>
            <Text style={styles.infoValueFaint}>{studentData.parent}</Text>
          </View>
          <View style={styles.divider} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topSection: {
    backgroundColor: colors.primary,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: -2,
  },
  profileContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.25)', // Translucent pale green overlay
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  statusBadge: {
    backgroundColor: '#34D399', // Emerald 400
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center', // Center since there's only one card now
    paddingHorizontal: 24,
    paddingTop: 24,
    marginBottom: 32,
  },
  statCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    minWidth: 100,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
  },
  contactContainer: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FEF08A', // Matches the very faint yellow text from image
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  infoLabel: {
    width: 80,
    fontSize: 15,
    fontWeight: '700',
    color: '#94A3B8',
  },
  infoValueFaint: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#64748B',
  },
  infoValuePrimary: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
});
