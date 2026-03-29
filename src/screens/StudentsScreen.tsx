import React, { useState } from 'react';
import { z } from 'zod';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Search,
  Plus,
  UserPlus,
  X,
  Phone,
  MapPin,
  ChevronDown,
  Layers,
} from 'lucide-react-native';
import { colors, spacing, typography, radius } from '../theme/Theme';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

const mockStudents = [
  {
    id: '1',
    name: 'Aarav Sharma',
    batch: 'JEE A',
    roll: '01',
    status: 'Active',
    avatarBg: '#EEF2FF',
    avatarColor: '#0F172A',
  },
  {
    id: '2',
    name: 'Priya Gupta',
    batch: 'NEET B',
    roll: '07',
    status: 'Fee Due',
    avatarBg: '#FEF3C7',
    avatarColor: '#D97706',
  },
  {
    id: '3',
    name: 'Rohan Verma',
    batch: 'JEE A',
    roll: '03',
    status: 'Active',
    avatarBg: '#ECFDF5',
    avatarColor: '#059669',
  },
  {
    id: '4',
    name: 'Sneha Mishra',
    batch: 'Foundation',
    roll: '12',
    status: 'Inactive',
    avatarBg: '#EEF2FF',
    avatarColor: '#0F172A',
  },
  {
    id: '5',
    name: 'Arjun Kumar',
    batch: 'NEET B',
    roll: '14',
    status: 'Active',
    avatarBg: '#ECFDF5',
    avatarColor: '#059669',
  },
];

const availableBatches = [
  'React Native Basics',
  'Advanced JavaScript',
  'UI/UX Design',
  'Node.js Backend',
  'Foundation',
  'JEE A',
  'NEET B',
];

interface StudentsScreenProps {
  onNavigateStudent: (id: string) => void;
}

export const StudentsScreen: React.FC<StudentsScreenProps> = ({
  onNavigateStudent,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isBatchPickerVisible, setBatchPickerVisible] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('Select Batch');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const studentSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    address: z.string().min(5, 'Address must be at least 5 characters'),
    batch: z.string().refine(val => val !== 'Select Batch', {
      message: 'Please select a batch',
    }),
  });

  const validate = () => {
    try {
      setErrors({});
      studentSchema.parse({ name, phone, address, batch: selectedBatch });
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        err.issues.forEach(e => {
          if (e.path[0]) formattedErrors[e.path[0].toString()] = e.message;
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Active':
        return { bg: '#D1FAE5', text: '#059669' };
      case 'Fee Due':
        return { bg: '#FEF3C7', text: '#D97706' };
      case 'Inactive':
        return { bg: '#FEE2E2', text: '#DC2626' };
      default:
        return { bg: '#F1F5F9', text: '#64748B' };
    }
  };

  const handleAddStudent = () => {
    if (!validate()) return;
    setModalVisible(false);
    // Reset form
    setName('');
    setAddress('');
    setPhone('');
    setSelectedBatch('Select Batch');
  };

  const renderStudent = ({ item }: { item: (typeof mockStudents)[0] }) => {
    const statusStyle = getStatusStyle(item.status);

    return (
      <TouchableOpacity
        style={styles.studentItem}
        activeOpacity={0.7}
        onPress={() => onNavigateStudent(item.id)}
      >
        <View style={[styles.avatar, { backgroundColor: item.avatarBg }]}>
          <Text style={[styles.avatarText, { color: item.avatarColor }]}>
            {getInitials(item.name)}
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.subtitle}>
            {item.batch} • Roll {item.roll}
          </Text>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
          <Text style={[styles.statusText, { color: statusStyle.text }]}>
            {item.status}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[typography.h1, styles.title]}>Students</Text>
          <TouchableOpacity
            style={styles.plusButton}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.8}
          >
            <Plus color="#FFF" size={24} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search
            color="#64748B"
            size={18}
            strokeWidth={2.5}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search student by name..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Student List */}
        <FlatList
          data={mockStudents}
          keyExtractor={item => item.id}
          renderItem={renderStudent}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        {/* Add Student Modal */}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() => setModalVisible(false)}
            />
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={styles.keyboardView}
            >
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <View style={styles.modalTitleRow}>
                    <View style={styles.modalIconBox}>
                      <UserPlus color={colors.primary} size={20} />
                    </View>
                    <Text style={typography.h2}>Add New Student</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.closeBtn}
                  >
                    <X color="#94A3B8" size={20} strokeWidth={2.5} />
                  </TouchableOpacity>
                </View>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={styles.modalBody}
                >
                  <Input
                    label="Full Name"
                    placeholder="e.g. Rahul Verma"
                    value={name}
                    onChangeText={setName}
                    error={errors.name}
                  />

                  <Input
                    label="Phone Number"
                    placeholder="e.g. +91 9876543210"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    icon={<Phone size={18} color={colors.textMuted} />}
                    error={errors.phone}
                  />

                  <Input
                    label="Address"
                    placeholder="Enter permanent address"
                    value={address}
                    onChangeText={setAddress}
                    icon={<MapPin size={18} color={colors.textMuted} />}
                    error={errors.address}
                  />

                  <Text style={styles.fieldLabel}>Assign Batch</Text>
                  <TouchableOpacity
                    style={styles.batchSelector}
                    onPress={() => setBatchPickerVisible(true)}
                  >
                    <View style={styles.batchSelectorInner}>
                      <Layers size={18} color={colors.primary} />
                      <Text
                        style={[
                          styles.batchSelectorText,
                          selectedBatch !== 'Select Batch' && {
                            color: colors.text,
                          },
                        ]}
                      >
                        {selectedBatch}
                      </Text>
                    </View>
                    <ChevronDown size={20} color={colors.textMuted} />
                  </TouchableOpacity>
                </ScrollView>

                <Button
                  title="Register Student"
                  onPress={handleAddStudent}
                  disabled={!name || selectedBatch === 'Select Batch'}
                  style={styles.submitBtn}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>

        {/* Batch Picker Modal */}
        <Modal
          visible={isBatchPickerVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setBatchPickerVisible(false)}
        >
          <View style={styles.pickerOverlay}>
            <View style={styles.pickerContent}>
              <View style={styles.pickerHeader}>
                <Text style={styles.pickerTitle}>Select Batch</Text>
                <TouchableOpacity onPress={() => setBatchPickerVisible(false)}>
                  <X color={colors.textMuted} size={24} />
                </TouchableOpacity>
              </View>
              <ScrollView>
                {availableBatches.map(batch => (
                  <TouchableOpacity
                    key={batch}
                    style={styles.pickerItem}
                    onPress={() => {
                      setSelectedBatch(batch);
                      setBatchPickerVisible(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.pickerItemText,
                        selectedBatch === batch && styles.selectedItemText,
                      ]}
                    >
                      {batch}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 12,
    marginBottom: 8,
  },
  title: { marginBottom: 0 },
  plusButton: {
    backgroundColor: colors.primary,
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 16,
    height: 52,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  searchIcon: { marginRight: 12 },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '500',
    height: '100%',
  },
  listContent: { paddingBottom: 100 },
  studentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: { fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
  info: { flex: 1, justifyContent: 'center' },
  name: { fontSize: 17, fontWeight: '700', color: '#0F172A', marginBottom: 2 },
  subtitle: { fontSize: 14, fontWeight: '600', color: '#94A3B8' },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: '800' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'flex-end',
  },
  keyboardView: { width: '100%' },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  modalIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtn: { padding: 6, backgroundColor: '#F8FAFC', borderRadius: 12 },
  modalBody: { maxHeight: 400, marginBottom: 20 },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    marginTop: 4,
  },
  batchSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  batchSelectorInner: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  batchSelectorText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textMuted,
  },
  submitBtn: { width: '100%' },
  pickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  pickerContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 20,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  pickerTitle: { fontSize: 18, fontWeight: '800', color: colors.text },
  pickerItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  pickerItemText: { fontSize: 16, fontWeight: '600', color: colors.textLight },
  selectedItemText: { color: colors.primary, fontWeight: '800' },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '600',
    marginTop: -12,
    marginBottom: 16,
    marginLeft: 4,
  },
});
