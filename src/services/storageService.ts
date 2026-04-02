import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const TOKEN_KEY = 'elite_login_session';
const EXPIRY_DAYS = 99;

export const storageService = {
  saveSession: async (token: string, user: any) => {
    try {
      console.log('--- storageService: Starting saveSession ---');
      if (!token) {
        console.warn('--- storageService: Empty token, skipping save ---');
        return;
      }

      const expiresAt = Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000;
      const sessionData = { token, user, expiresAt };
      const serializedData = JSON.stringify(sessionData);

      await AsyncStorage.setItem(TOKEN_KEY, serializedData);
      console.log('--- storageService: Session saved successfully! ---');
      
      const allKeys = await AsyncStorage.getAllKeys();
      console.log('--- storageService: Current Storage Keys:', allKeys);

      Toast.show({
        type: 'success',
        text1: 'Storage Success',
        text2: 'Session saved to device.',
      });
    } catch (error: any) {
      console.error('--- storageService ERROR: Failed to save session ---', error);
      Toast.show({
        type: 'error',
        text1: 'Storage Error',
        text2: error?.message || 'Failed to save login session.',
      });
    }
  },

  getSession: async () => {
    try {
      console.log('--- storageService: Starting getSession ---');
      const session = await AsyncStorage.getItem(TOKEN_KEY);

      if (!session) {
        console.log('--- storageService: No session found. ---');
        return null;
      }

      let parsed;
      try {
        parsed = JSON.parse(session);
      } catch (e) {
        console.warn('--- storageService: Invalid storage format. ---');
        return null;
      }

      const { token, user, expiresAt } = parsed;

      if (expiresAt && Date.now() > expiresAt) {
        console.log('--- storageService: Session expired. ---');
        await AsyncStorage.removeItem(TOKEN_KEY);
        return null;
      }

      console.log('--- storageService: Valid session retrieved! ---');
      return { token, user };
    } catch (error: any) {
      console.error('--- storageService ERROR: Failed to get session ---', error);
      Toast.show({
        type: 'error',
        text1: 'Storage Retrieval Error',
        text2: error?.message || 'Failed to read login session.',
      });
      return null;
    }
  },

  removeToken: async () => {
    try {
      console.log('--- storageService: Removing token ---');
      await AsyncStorage.removeItem(TOKEN_KEY);
      console.log('--- storageService: Token removed. ---');
    } catch (error) {
      console.error('--- storageService ERROR: Failed to remove token ---');
      console.error(error);
    }
  },

  // Debug function to see all keys in AsyncStorage
  debugStorage: async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await Promise.all(
        keys.map(async key => {
          const value = await AsyncStorage.getItem(key);
          return [key, value];
        }),
      );
      console.log('--- AsyncStorage Debug Dump ---');
      console.log(result);
      return result;
    } catch (error) {
      console.error('--- storageService Debug Error ---', error);
    }
  },
};
