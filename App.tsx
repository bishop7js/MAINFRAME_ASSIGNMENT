import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';
import LoginScreen from './src/LoginScreen';
import HomeScreen from './src/HomeScreen';  
import ItemDetailScreen from './src/ItemDetailScreen'; // <-- Import your detail screen
import ProfileScreen from './src/ProfileScreen'; // Add this import
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen name="login" component={LoginScreen} options={{ title: 'Overview' }} />
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen
            name="itemDetail"
            component={ItemDetailScreen}
            options={{ title: 'Item Detail' }}
            initialParams={{ id: null }} // Optional: default param
          />
          <Stack.Screen
            name="profile"
            component={ProfileScreen}
            options={{ title: 'Profile' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
