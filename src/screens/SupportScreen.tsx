import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ChevronLeft, 
  Mail, 
  MessageSquare,
  ChevronRight,
  ExternalLink
} from 'lucide-react-native';
import { colors, spacing, typography, radius } from '../theme/Theme';
import { Card } from '../components/Card';

interface SupportScreenProps {
  onBack: () => void;
  onNavigateChat: () => void;
}

const faqs = [
  { q: 'How to add a new batch?', a: 'Go to the Batches tab and tap the "+" icon.' },
  { q: 'Can I change coaching name?', a: 'Yes, go to Edit Profile in your settings.' },
  { q: 'How to export student data?', a: 'Export feature is coming in the next update!' },
];

export const SupportScreen: React.FC<SupportScreenProps> = ({ onBack, onNavigateChat }) => {
  const handleEmail = () => {
    Linking.openURL('mailto:rehanchanija@gmail.com');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
            <TouchableOpacity onPress={onBack} style={styles.backBtn}>
                <ChevronLeft color={colors.text} size={28} strokeWidth={2.5} />
            </TouchableOpacity>
            <Text style={typography.h1}>Help & Support</Text>
        </View>

        <Text style={styles.sectionLabel}>Direct Support</Text>
        <Card variant="outline" style={styles.emailCard}>
            <View style={styles.iconCircle}><Mail color={colors.primary} size={24} /></View>
            <View style={{ flex: 1, marginLeft: 16 }}>
                <Text style={styles.emailTitle}>Email Support</Text>
                <Text style={styles.emailAddress}>rehanchanija@gmail.com</Text>
            </View>
            <TouchableOpacity onPress={handleEmail} style={styles.emailActionBtn} activeOpacity={0.7}>
                <ExternalLink size={18} color={colors.primary} strokeWidth={2.5} />
            </TouchableOpacity>
        </Card>

        <Text style={styles.sectionLabel}>Frequently Asked Questions</Text>
        {faqs.map((faq, index) => (
            <Card key={index} variant="outline" style={styles.faqCard}>
                <View style={styles.faqHeader}>
                    <Text style={styles.faqTitle}>{faq.q}</Text>
                    <ChevronRight size={16} color={colors.textMuted} />
                </View>
                <Text style={styles.faqAnswer}>{faq.a}</Text>
            </Card>
        ))}

        {/* Live Chat Action */}
        <Card style={styles.chatCard} onPress={onNavigateChat}>
            <MessageSquare color="#FFF" size={24} strokeWidth={2.5} />
            <View style={{ flex: 1, marginLeft: 16 }}>
                <Text style={styles.chatTitle}>Live Chat Support</Text>
                <Text style={styles.chatSub}>Chat with our experts now</Text>
            </View>
            <View style={styles.chatStatus}><View style={styles.statusDot} /><Text style={styles.statusText}>Live</Text></View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 120 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 16, marginBottom: 24 },
  backBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  sectionLabel: { fontSize: 13, fontWeight: '800', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16, marginTop: 8 },
  emailCard: { flexDirection: 'row', alignItems: 'center', padding: 16, marginBottom: 24 },
  iconCircle: { width: 48, height: 48, borderRadius: 14, backgroundColor: colors.primaryLight, justifyContent: 'center', alignItems: 'center' },
  emailTitle: { fontSize: 15, fontWeight: '700', color: colors.text },
  emailAddress: { fontSize: 13, color: colors.textLight, marginTop: 2 },
  emailActionBtn: { width: 36, height: 36, borderRadius: 8, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  faqCard: { padding: 16, marginBottom: 12 },
  faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  faqTitle: { fontSize: 15, fontWeight: '700', color: colors.text, flex: 1, marginRight: 16 },
  faqAnswer: { fontSize: 14, color: colors.textLight, lineHeight: 20 },
  chatCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, padding: 20, marginTop: 12 },
  chatTitle: { fontSize: 17, fontWeight: '800', color: '#FFF' },
  chatSub: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  chatStatus: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 99 },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.secondary },
  statusText: { fontSize: 11, fontWeight: '800', color: '#FFF' },
});
