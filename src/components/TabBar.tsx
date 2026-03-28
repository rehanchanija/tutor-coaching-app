import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LayoutDashboard, Library, Users, UserCircle } from 'lucide-react-native';
import { colors, spacing, typography } from '../theme/Theme';

interface TabBarProps {
  tabs: string[];
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

const getTabIcon = (tabName: string, color: string, size: number) => {
  switch (tabName) {
    case 'Dashboard':
      return <LayoutDashboard color={color} size={size} />;
    case 'Batches':
      return <Library color={color} size={size} />;
    case 'Students':
      return <Users color={color} size={size} />;
    case 'Profile':
      return <UserCircle color={color} size={size} />;
    default:
      return <LayoutDashboard color={color} size={size} />;
  }
};

export const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onChangeTab }) => {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.safeArea}>
      <View style={styles.container}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          const color = isActive ? colors.primary : colors.textLight;
          return (
            <TouchableOpacity
              key={tab}
              style={styles.tab}
              onPress={() => onChangeTab(tab)}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                {getTabIcon(tab, color, 24)}
              </View>
              <Text style={[
                typography.caption,
                styles.tabText,
                isActive && styles.activeTabText
              ]}>
                {tab}
              </Text>
              {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  container: {
    flexDirection: 'row',
    height: 65,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  iconContainer: {
    marginBottom: 4,
  },
  tabText: {
    fontWeight: '600',
    color: colors.textLight,
    fontSize: 11,
  },
  activeTabText: {
    color: colors.primary,
  },
  activeIndicator: {
    position: 'absolute',
    top: -1,
    width: 32,
    height: 3,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
});
