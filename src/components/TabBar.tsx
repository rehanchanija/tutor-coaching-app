import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Home, Package, Users, User } from 'lucide-react-native';
import { colors, radius, spacing } from '../theme/Theme';

interface TabBarProps {
  tabs: string[];
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

const getTabIcon = (tabName: string, isActive: boolean, size: number) => {
  const iconColor = isActive ? '#4F46E5' : '#94A3B8'; // Purple if active, Slate 400 if not
  
  // To closely match the requested visual design:
  switch (tabName) {
    case 'Dashboard':
    case 'Home':
      return <Home color={isActive ? '#EA580C' : '#94A3B8'} size={size} strokeWidth={2.5} />; // Orange-ish home
    case 'Batches':
    case 'Batch':
      return <Package color={isActive ? '#B45309' : '#94A3B8'} size={size} strokeWidth={2.5} /> ; // Brown package
    case 'Students':
      return <Users color={iconColor} size={size} strokeWidth={2.5} />;
    case 'Profile':
      return <User color={iconColor} size={size} strokeWidth={2.5} />;
    default:
      return <Home color={iconColor} size={size} strokeWidth={2.5} />;
  }
};

export const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onChangeTab }) => {
  // Map standard tabs to the requested display labels
  const tabDisplayNames: Record<string, string> = {
    'Dashboard': 'Home',
    'Batches': 'Batch',
    'Students': 'Students',
    'Profile': 'Profile'
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.safeArea}>
      <View style={styles.container}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          const displayLabel = tabDisplayNames[tab] || tab;
          
          return (
            <TouchableOpacity
              key={tab}
              style={styles.tab}
              onPress={() => onChangeTab(tab)}
              activeOpacity={0.8}
            >
              <View style={[styles.iconWrapper, isActive && styles.iconActiveBg]}>
                {getTabIcon(tab, isActive, 22)}
              </View>
              <Text style={[
                styles.tabText,
                isActive && styles.activeTabText
              ]}>
                {displayLabel}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9', // subtle border top matches the app list
  },
  container: {
    flexDirection: 'row',
    height: 70,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },
  iconWrapper: {
    padding: 8,
    borderRadius: 14,
    marginBottom: 4,
    // Add light purple bg to the active tab icon just like the screenshot
  },
  iconActiveBg: {
    backgroundColor: '#EEF2FF', 
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: -0.2,
  },
  activeTabText: {
    color: '#4F46E5', // Matches the active tab purple text from screenshot
  },
});
