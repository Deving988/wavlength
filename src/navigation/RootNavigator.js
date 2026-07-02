import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import LibraryScreen from '../screens/LibraryScreen';
import PlayerScreen from '../screens/PlayerScreen';
import MiniPlayer from '../components/MiniPlayer';
import { colors } from '../constants/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabIcon({ label, focused }) {
  return (
    <Text style={{ color: focused ? colors.accent : colors.textSecondary, fontSize: 12, fontWeight: '600' }}>
      {label}
    </Text>
  );
}

function MainTabs() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            height: 58,
            paddingBottom: 8,
            paddingTop: 8,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarIcon: ({ focused }) => <TabIcon label="Home" focused={focused} /> }}
        />
        <Tab.Screen
          name="Library"
          component={LibraryScreen}
          options={{ tabBarIcon: ({ focused }) => <TabIcon label="Library" focused={focused} /> }}
        />
      </Tab.Navigator>
      <MiniPlayer />
    </View>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen
          name="Player"
          component={PlayerScreen}
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
