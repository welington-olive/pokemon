import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import './global.css';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { View, StyleSheet } from 'react-native';
import { AuthProvider, useAuthContext } from './src/contexts/AuthContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { colors } from './src/theme/colors';
import { queryClient } from './src/lib/react-query/queryClient';
import { Logo } from './src/components/Logo';

// Previne que a splash screen seja escondida automaticamente
SplashScreen.preventAutoHideAsync();

const AppContent: React.FC = () => {
  const { loading } = useAuthContext();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Aguarda até que o AuthContext termine de carregar
        if (!loading) {
          setAppIsReady(true);
        }
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, [loading]);

  useEffect(() => {
    async function hideSplashScreen() {
      if (appIsReady && !loading) {
        await SplashScreen.hideAsync();
      }
    }

    hideSplashScreen();
  }, [appIsReady, loading]);

  if (!appIsReady || loading) {
    return (
      <View style={styles.splashContainer}>
        <Logo />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <AppNavigator />
    </>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
