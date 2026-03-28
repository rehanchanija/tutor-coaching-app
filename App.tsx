import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LoginScreen } from './src/screens/LoginScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { BatchScreen } from './src/screens/BatchScreen';
import { SubjectScreen } from './src/screens/SubjectScreen';
import { CourseScreen } from './src/screens/CourseScreen';
import { StudentsScreen } from './src/screens/StudentsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { TabBar } from './src/components/TabBar';
import { colors } from './src/theme/Theme';

type ScreenName = 'Login' | 'Main' | 'Subject' | 'Course';
type TabName = 'Dashboard' | 'Batches' | 'Students' | 'Profile';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('Login');
  const [activeTab, setActiveTab] = useState<TabName>('Dashboard');
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentScreen('Main');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('Login');
    setActiveTab('Dashboard');
    setSelectedBatchId(null);
    setSelectedSubjectId(null);
  };

  const handleNavigateBatch = (batchId: string) => {
    setSelectedBatchId(batchId);
    setCurrentScreen('Subject');
  };

  const handleNavigateSubject = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setCurrentScreen('Course');
  };

  const renderScreen = () => {
    if (!isAuthenticated || currentScreen === 'Login') {
      return <LoginScreen onLogin={handleLogin} />;
    }

    if (currentScreen === 'Subject') {
      return (
        <SubjectScreen
          onBack={() => setCurrentScreen('Main')}
          onNavigateCourse={handleNavigateSubject}
        />
      );
    }

    if (currentScreen === 'Course') {
      return (
        <CourseScreen
          onBack={() => setCurrentScreen('Subject')}
        />
      );
    }

    // Main screen with Tabs
    switch (activeTab) {
      case 'Dashboard':
        return <DashboardScreen onNavigateBatch={handleNavigateBatch} />;
      case 'Batches':
        return <BatchScreen onNavigateSubject={handleNavigateBatch} />;
      case 'Students':
        return <StudentsScreen />;
      case 'Profile':
        return <ProfileScreen onLogout={handleLogout} />;
      default:
        return <DashboardScreen onNavigateBatch={handleNavigateBatch} />;
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.container}>
        {renderScreen()}
      </View>
      {isAuthenticated && currentScreen === 'Main' && (
        <TabBar
          tabs={['Dashboard', 'Batches', 'Students', 'Profile']}
          activeTab={activeTab}
          onChangeTab={(tab) => setActiveTab(tab as TabName)}
        />
      )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
});

export default App;
