import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import { colors, spacing, typography } from '../theme/Theme';

// Exact mock data from the image to match the requested design perfectly.
const mockStudents = [
  { 
    id: '1', 
    name: 'Aarav Sharma', 
    batch: 'JEE A', 
    roll: '01', 
    status: 'Active',
    avatarBg: '#EEF2FF', 
    avatarColor: '#4F46E5' 
  },
  { 
    id: '2', 
    name: 'Priya Gupta', 
    batch: 'NEET B', 
    roll: '07', 
    status: 'Fee Due',
    avatarBg: '#FEF3C7', 
    avatarColor: '#D97706' 
  },
  { 
    id: '3', 
    name: 'Rohan Verma', 
    batch: 'JEE A', 
    roll: '03', 
    status: 'Active',
    avatarBg: '#ECFDF5', 
    avatarColor: '#059669' 
  },
  { 
    id: '4', 
    name: 'Sneha Mishra', 
    batch: 'Foundation', 
    roll: '12', 
    status: 'Inactive',
    avatarBg: '#EEF2FF', 
    avatarColor: '#4F46E5' 
  },
  { 
    id: '5', 
    name: 'Arjun Kumar', 
    batch: 'NEET B', 
    roll: '14', 
    status: 'Active',
    avatarBg: '#ECFDF5', 
    avatarColor: '#059669' 
  },
];

interface StudentsScreenProps {
  onNavigateStudent: (id: string) => void;
}

export const StudentsScreen: React.FC<StudentsScreenProps> = ({ onNavigateStudent }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
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

  const renderStudent = ({ item }: { item: typeof mockStudents[0] }) => {
    const statusStyle = getStatusStyle(item.status);

    return (
      <TouchableOpacity 
        style={styles.studentItem} 
        activeOpacity={0.7}
        onPress={() => onNavigateStudent(item.id)}
      >
        {/* Avatar */}
        <View style={[styles.avatar, { backgroundColor: item.avatarBg }]}>
          <Text style={[styles.avatarText, { color: item.avatarColor }]}>
            {getInitials(item.name)}
          </Text>
        </View>

        {/* Info */}
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.subtitle}>
            {item.batch} • Roll {item.roll}
          </Text>
        </View>

        {/* Status Badge */}
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
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search color="#64748B" size={18} strokeWidth={2.5} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search student..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Student List */}
        <FlatList
          data={mockStudents}
          keyExtractor={(item) => item.id}
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
    backgroundColor: '#FFFFFF', // Clean white background for lists
  },
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC', // light grayish blue
    marginHorizontal: spacing.l,
    marginTop: spacing.m,
    marginBottom: spacing.m,
    borderRadius: 16,
    height: 48,
    paddingHorizontal: spacing.m,
  },
  searchIcon: {
    marginRight: spacing.s,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '500',
    height: '100%',
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
  studentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9', // Very subtle separator
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.m,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: spacing.s,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8', // Slate 400
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
