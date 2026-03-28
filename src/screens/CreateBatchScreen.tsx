import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  Sun,
  Moon,
  CalendarDays,
  BookOpen,
} from 'lucide-react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { colors, radius, spacing, typography } from '../theme/Theme';

interface CreateBatchScreenProps {
  onBack: () => void;
}

export const CreateBatchScreen: React.FC<CreateBatchScreenProps> = ({
  onBack,
}) => {
  const [batchName, setBatchName] = useState('');
  const [batchType, setBatchType] = useState<'Morning' | 'Evening'>('Morning');

  const handleCreate = () => {
    // Mock save
    console.log('Batch Created', { batchName, batchType });
    onBack();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'top']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onBack}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <ChevronLeft color={colors.text} size={26} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={[typography.h2, styles.title]}>Create New Batch</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
        >
          <View style={styles.formGroup}>
            <Input
              label="Batch Name"
              placeholder="e.g. JEE Advanced 2026"
              value={batchName}
              onChangeText={setBatchName}
              icon={<BookOpen color={colors.textLight} size={20} />}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.fieldLabel}>Timing Slot</Text>
            <View style={styles.toggleRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.toggleBtn,
                  batchType === 'Morning' && styles.activeToggle,
                ]}
                onPress={() => setBatchType('Morning')}
              >
                <Sun
                  size={18}
                  color={
                    batchType === 'Morning' ? colors.white : colors.textLight
                  }
                  strokeWidth={2.5}
                />
                <Text
                  style={[
                    styles.toggleText,
                    batchType === 'Morning' && styles.activeToggleText,
                  ]}
                >
                  Morning
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.toggleBtn,
                  batchType === 'Evening' && styles.activeToggle,
                  { marginLeft: spacing.m },
                ]}
                onPress={() => setBatchType('Evening')}
              >
                <Moon
                  size={18}
                  color={
                    batchType === 'Evening' ? colors.white : colors.textLight
                  }
                  strokeWidth={2.5}
                />
                <Text
                  style={[
                    styles.toggleText,
                    batchType === 'Evening' && styles.activeToggleText,
                  ]}
                >
                  Evening
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title="Create Batch"
            onPress={handleCreate}
            disabled={batchName.trim() === ''}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.l,
    marginBottom: spacing.l,
    paddingTop: spacing.s,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.m,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  title: {
    flex: 1,
    color: '#0F172A',
    marginBottom: 0,
  },
  scrollContent: {
    paddingHorizontal: spacing.l,
    paddingBottom: spacing.xxl,
  },
  formGroup: {
    marginBottom: spacing.xl,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  toggleRow: {
    flexDirection: 'row',
  },
  toggleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: radius.l,
  },
  activeToggle: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  toggleText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
  },
  activeToggleText: {
    color: '#FFFFFF',
  },
  footer: {
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.l,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
  },
});
