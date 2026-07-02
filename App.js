import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator } from 'react-native';

import RootNavigator from './src/navigation/RootNavigator';
import { setupPlayer } from './src/services/trackPlayerSetup';
import { colors } from './src/constants/theme';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      await setupPlayer();
      setIsReady(true);
    })();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.accent} size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <RootNavigator />
    </SafeAreaProvider>
  );
}
