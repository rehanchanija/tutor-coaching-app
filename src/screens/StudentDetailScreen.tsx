import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Phone, Mail, User, Calendar, CreditCard } from 'lucide-react-native';
import { colors, spacing, typography, radius } from '../theme/Theme';
import { Card } from '../components/Card';

const { width } = Dimensions.get('window');

interface StudentDetailScreenProps {
  studentId: string;
  onBack: () => void;
}

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
  joinDate: '12 Jan 2024',
};

export const StudentDetailScreen: React.FC<StudentDetailScreenProps> = ({ onBack, studentId }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topBanner}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <ChevronLeft color="#FFF" size={28} strokeWidth={2.5} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Student Profile</Text>
            <View style={{ width: 28 }} />
          </View>

          <View style={styles.profileSummary}>
             <View style={styles.avatarGlow}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{studentData.initials}</Text>
                </View>
             </View>
             <Text style={styles.name}>{studentData.name}</Text>
             <View style={styles.badgeRow}>
                <View style={styles.pillBadge}>
                    <Text style={styles.pillText}>{studentData.batch}</Text>
                </View>
                <View style={[styles.pillBadge, { backgroundColor: colors.secondaryLight }]}>
                    <Text style={[styles.pillText, { color: colors.secondary }]}>Roll {studentData.roll}</Text>
                </View>
             </View>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.statsGrid}>
            <Card style={styles.infoCard}>
                <CreditCard color={colors.primary} size={20} />
                <Text style={styles.cardValue}>{studentData.feeDue}</Text>
                <Text style={styles.cardLabel}>Fee Due</Text>
            </Card>
            <Card style={styles.infoCard}>
                <Calendar color={colors.accent} size={20} />
                <Text style={styles.cardValue}>94%</Text>
                <Text style={styles.cardLabel}>Attendance</Text>
            </Card>
        </View>

        <Text style={styles.sectionTitle}>Contact Details</Text>
        <Card variant="outline">
            <View style={styles.infoRow}>
                <View style={styles.iconCircle}><Phone size={18} color={colors.textLight} /></View>
                <View>
                    <Text style={styles.rowLabel}>Primary Phone</Text>
                    <Text style={styles.rowValue}>{studentData.phone}</Text>
                </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
                <View style={styles.iconCircle}><Mail size={18} color={colors.textLight} /></View>
                <View>
                    <Text style={styles.rowLabel}>Email Address</Text>
                    <Text style={styles.rowValue}>{studentData.email}</Text>
                </View>
            </View>
        </Card>

        <Text style={styles.sectionTitle}>Family Information</Text>
        <Card variant="outline">
            <View style={styles.infoRow}>
                <View style={styles.iconCircle}><User size={18} color={colors.textLight} /></View>
                <View>
                    <Text style={styles.rowLabel}>Parent Name</Text>
                    <Text style={styles.rowValue}>{studentData.parent}</Text>
                </View>
            </View>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  topBanner: { backgroundColor: colors.primary, paddingBottom: 40, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, shadowColor: colors.primary, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 15 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#FFF', letterSpacing: -0.5 },
  profileSummary: { alignItems: 'center', marginTop: 20 },
  avatarGlow: { padding: 4, borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.2)' },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 32, fontWeight: '900', color: colors.primary },
  name: { fontSize: 26, fontWeight: '900', color: '#FFF', marginTop: 16, letterSpacing: -0.5 },
  badgeRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  pillBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)' },
  pillText: { fontSize: 13, fontWeight: '700', color: '#FFF' },
  content: { flex: 1, paddingHorizontal: 24, marginTop: -30 },
  statsGrid: { flexDirection: 'row', gap: 16, marginBottom: 24 },
  infoCard: { flex: 1, padding: 20, alignItems: 'flex-start' },
  cardValue: { fontSize: 22, fontWeight: '900', color: colors.text, marginTop: 12 },
  cardLabel: { fontSize: 13, fontWeight: '700', color: colors.textMuted, marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: colors.text, marginBottom: 12, marginTop: 8 },
  infoRow: { flexDirection: 'row', gap: 16, alignItems: 'center', paddingVertical: 12 },
  iconCircle: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  rowLabel: { fontSize: 12, fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  rowValue: { fontSize: 16, fontWeight: '700', color: colors.text, marginTop: 2 },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 4 },
  backButton: { padding: 4 },
});
