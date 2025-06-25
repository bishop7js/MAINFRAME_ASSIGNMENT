import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import LoginScreen from './src/LoginScreen';
import HomeScreen from './src/HomeScreen';
import ItemDetailScreen from './src/ItemDetailScreen';
import ProfileScreen from './src/ProfileScreen';
import SearchScreen from './src/SearchScreen'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ProductProvider } from './src/contexts/ProductContext';
import { CartProvider } from './src/contexts/CartContext';
import CartScreen from './src/CartScreen';
import { Provider } from 'react-redux';
import store from './src/store';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#000',
          borderRadius: 25,
          position: 'absolute',
          left: 20,
          right: 20,
          bottom: 20,
          height: 70,
          elevation: 10,
          borderTopWidth: 0,
          marginLeft: 30,
          marginRight: 30,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fff',
        tabBarItemStyle: {
          marginTop: 8,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = 'home';
          if (route.name === 'home') iconName = 'home-outline';
          else if (route.name === 'Search') iconName = 'search-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';
          return (
            <View style={{ alignItems: 'center' }}>
              <Ionicons name={iconName} size={size} color={color} />
              {focused && (
                <View
                  style={{
                    height: 3,
                    width: 28,
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    marginTop: 4,
                  }}
                />
              )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function SplashScreen() {
  return (
    <View style={styles.splashContainer}>
      <Text style={styles.splashTitle}>MAINFRAME</Text>
      <ActivityIndicator size="large" color="#50C878" style={{ marginTop: 24 }} />
    </View>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Provider store={store}>
      <ProductProvider>
        <CartProvider>
          <View style={styles.container}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="login">
                <Stack.Screen
                  name="login"
                  component={LoginScreen}
                  options={{ title: 'Overview', headerShown: false }}
                />
                <Stack.Screen
                  name="MainTabs"
                  component={MainTabs}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="itemDetail"
                  component={ItemDetailScreen}
                  options={{
                    title: 'Item details',
                    headerTitleAlign: 'center',
                  }}
                  initialParams={{ id: null }}
                />
                <Stack.Screen
                  name="Cart"
                  component={CartScreen}
                  options={{ title: 'Cart' }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </CartProvider>
      </ProductProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashTitle: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});

export default App;
