/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Text, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import IssueScreen from './src/screens/issue';
import HomeScreen from './src/screens/home';
import { RootStackParamList } from '@/navigation/types';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const config = {
  screens: {
    Home: 'home',
    Issue: 'issue',
  },
};

const linking = {
  prefixes: ['wwwallet://'],
  config,
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={backgroundStyle}>
        <NavigationContainer
          linking={linking}
          fallback={<Text>Loading...</Text>}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animation: 'none',
            }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Issue" component={IssueScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
