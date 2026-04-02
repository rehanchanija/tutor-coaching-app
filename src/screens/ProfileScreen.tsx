import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  LogOut,
  User,
  Phone,
  Mail,
  Shield,
  HelpCircle,
  ChevronRight,
  Settings,
  Building,
  Edit3,
} from 'lucide-react-native';
import { Card } from '../components/Card';
import { colors, radius, spacing, typography } from '../theme/Theme';

interface ProfileScreenProps {
  onLogout: () => void;
  onNavigateSupport: () => void;
  onNavigatePrivacy: () => void;
  userData?: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onLogout,
  onNavigateSupport,
  onNavigatePrivacy,
  userData,
}) => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => setIsRefreshing(false), 1000);
  }, []);

  const adminData = {
    coachingName: 'SRK Coaching ',
    adminName: userData?.name || 'Loading...',
    phone: userData?.phone || 'Not provided',
    email: userData?.email || 'Not provided',
    role: userData?.role || 'User',
  };

  const renderOption = (
    icon: any,
    label: string,
    color: string,
    onPress?: () => void,
  ) => (
    <TouchableOpacity style={styles.optionRow} onPress={onPress}>
      <View style={[styles.optionIconBox, { backgroundColor: color + '15' }]}>
        {React.createElement(icon, {
          size: 20,
          color: color,
          strokeWidth: 2.5,
        })}
      </View>
      <Text style={styles.optionLabel}>{label}</Text>
      <ChevronRight size={20} color={colors.textMuted} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={[colors.primary]} />
        }
      >
        <View style={styles.header}>
          <Text style={typography.h1}>Admin Profile</Text>
        </View>

        {/* Profile Card with Edit Profile */}
        <Card style={styles.profileCard}>
          <View style={styles.profileTopRow}>
            <View style={styles.avatar}>
              <Building color={colors.white} size={32} strokeWidth={2} />
              <View style={styles.editBadge}>
                <Edit3 size={12} color={colors.white} strokeWidth={3} />
              </View>
            </View>
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text style={styles.coachingLabel}>COACHING NAME</Text>
              <Text style={styles.coachingNameText}>
                {adminData.coachingName}
              </Text>
              <Text style={styles.adminLabel}>ADMIN NAME</Text>
              <Text style={styles.adminNameText}>{adminData.adminName}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editProfileBtn} activeOpacity={0.8}>
            <Settings size={18} color={colors.primary} strokeWidth={2.5} />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </Card>

        {/* Contact Information */}
        <Text style={styles.sectionLabel}>Contact Details</Text>
        <Card variant="outline" style={styles.fullCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <Phone size={18} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.infoSmallLabel}>CONTACT NUMBER</Text>
              <Text style={styles.infoMainText}>{adminData.phone}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <Mail size={18} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.infoSmallLabel}>EMAIL ADDRESS</Text>
              <Text style={styles.infoMainText}>{adminData.email}</Text>
            </View>
          </View>
        </Card>

        {/* Support & Legal */}
        <Text style={styles.sectionLabel}>Help & Support</Text>
        <Card variant="outline" style={styles.fullCard}>
          {renderOption(
            HelpCircle,
            'Contact Support',
            colors.primary,
            onNavigateSupport,
          )}
          {renderOption(
            Shield,
            'Privacy Policy',
            colors.accent,
            onNavigatePrivacy,
          )}
          <View style={styles.divider} />
          <TouchableOpacity style={styles.optionRow} onPress={onLogout}>
            <View
              style={[
                styles.optionIconBox,
                { backgroundColor: colors.danger + '15' },
              ]}
            >
              <LogOut size={20} color={colors.danger} strokeWidth={2.5} />
            </View>
            <Text style={[styles.optionLabel, { color: colors.danger }]}>
              Logout Account
            </Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingHorizontal: spacing.l, paddingBottom: 120 },
  header: { marginTop: spacing.m, marginBottom: spacing.l },
  profileCard: { padding: 20 },
  profileTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coachingLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 1,
  },
  coachingNameText: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 8,
  },
  adminLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 1,
  },
  adminNameText: { fontSize: 16, fontWeight: '700', color: colors.textLight },
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: colors.primaryLight,
    gap: 8,
  },
  editProfileText: { fontSize: 14, fontWeight: '800', color: colors.primary },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textMuted,
    marginTop: spacing.l,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  fullCard: { padding: 4 },
  infoRow: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 16 },
  infoIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoSmallLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  infoMainText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginTop: 2,
  },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginHorizontal: 16 },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  optionIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionLabel: { flex: 1, fontSize: 15, fontWeight: '700', color: colors.text },
});
