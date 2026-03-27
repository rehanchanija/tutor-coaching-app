import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { colors, spacing, typography } from '../theme/Theme';

interface TabBarProps {
  tabs: string[];
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onChangeTab }) => {
  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <View style={styles.container}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={styles.tab}
              onPress={() => onChangeTab(tab)}
              activeOpacity={0.7}
            >
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
    height: 60,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontWeight: '600',
    color: colors.textLight,
  },
  activeTabText: {
    color: colors.primary,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: spacing.xs,
    width: 20,
    height: 3,
    backgroundColor: colors.primary,
    borderRadius: 1.5,
  },
});
