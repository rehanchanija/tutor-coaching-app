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
import { StudentDetailScreen } from './src/screens/StudentDetailScreen';
import { CreateBatchScreen } from './src/screens/CreateBatchScreen';
import { NotificationScreen } from './src/screens/NotificationScreen';
import { SupportScreen } from './src/screens/SupportScreen';
import { PrivacyPolicyScreen } from './src/screens/PrivacyPolicyScreen';
import { ChatSupportScreen } from './src/screens/ChatSupportScreen';
import { MessageScreen } from './src/screens/MessageScreen';
import { BatchChatScreen } from './src/screens/BatchChatScreen';
import { TabBar } from './src/components/TabBar';
import { colors } from './src/theme/Theme';
import Toast from 'react-native-toast-message';

type ScreenName = 'Login' | 'Main' | 'Subject' | 'Course' | 'StudentDetail' | 'Notifications' | 'Support' | 'Privacy' | 'ChatSupport' | 'BatchChat';
type TabName = 'Dashboard' | 'Batches' | 'Students' | 'Chat' | 'Profile';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('Login');
  const [activeTab, setActiveTab] = useState<TabName>('Dashboard');
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedBatchChat, setSelectedBatchChat] = useState<{id: string, name: string} | null>(null);

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
    
    if (currentScreen === 'StudentDetail') {
      return (
        <StudentDetailScreen 
          studentId="1" // Mock for now
          onBack={() => setCurrentScreen('Main')} 
        />
      );
    }

    if (currentScreen === 'Notifications') {
      return (
        <NotificationScreen 
          onBack={() => setCurrentScreen('Main')} 
        />
      );
    }

    if (currentScreen === 'Support') {
      return (
        <SupportScreen 
          onBack={() => setCurrentScreen('Main')} 
          onNavigateChat={() => setCurrentScreen('ChatSupport')}
        />
      );
    }

    if (currentScreen === 'ChatSupport') {
      return (
        <ChatSupportScreen 
          onBack={() => setCurrentScreen('Support')} 
        />
      );
    }

    if (currentScreen === 'Privacy') {
      return (
        <PrivacyPolicyScreen 
          onBack={() => setCurrentScreen('Main')} 
        />
      );
    }

    if (currentScreen === 'BatchChat' && selectedBatchChat) {
      return (
        <BatchChatScreen
          batchId={selectedBatchChat.id}
          batchName={selectedBatchChat.name}
          onBack={() => setCurrentScreen('Main')}
        />
      );
    }

    // Main screen with Tabs
    switch (activeTab) {
      case 'Dashboard':
        return (
          <DashboardScreen 
            onNavigateBatch={handleNavigateBatch} 
            onNavigateNotifications={() => setCurrentScreen('Notifications')}
          />
        );
      case 'Batches':
        return <BatchScreen onNavigateSubject={handleNavigateBatch} />;
      case 'Students':
        return <StudentsScreen onNavigateStudent={(id) => setCurrentScreen('StudentDetail')} />;
      case 'Profile':
        return (
          <ProfileScreen 
            onLogout={handleLogout} 
            onNavigateSupport={() => setCurrentScreen('Support')}
            onNavigatePrivacy={() => setCurrentScreen('Privacy')}
          />
        );
      case 'Chat':
        return (
          <MessageScreen 
            onNavigateChat={(id, name) => {
              setSelectedBatchChat({ id, name });
              setCurrentScreen('BatchChat');
            }} 
          />
        );
      default:
        return (
          <DashboardScreen 
            onNavigateBatch={handleNavigateBatch} 
            onNavigateNotifications={() => setCurrentScreen('Notifications')}
          />
        );
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.background}
        />
        <View style={styles.container}>{renderScreen()}</View>
        {isAuthenticated && currentScreen === 'Main' && (
          <TabBar
            tabs={['Dashboard', 'Batches', 'Students', 'Chat', 'Profile']}
            activeTab={activeTab}
            onChangeTab={tab => setActiveTab(tab as TabName)}
          />
        )}
      </SafeAreaView>
      <Toast />
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
