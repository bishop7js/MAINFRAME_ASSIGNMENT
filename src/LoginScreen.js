import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const currentUser = {
    username: 'emilys',
    password: 'emilyspass',
  }

  const handleLogin = () => {
    if (username === currentUser.username && password === currentUser.password) {
      navigation.navigate('MainTabs', { screen: 'home' });
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerSection}>
        <Text style={styles.title}>Practical Test</Text>
        <View style={styles.inputWrapper}>
          <Feather name="user" size={22} color="#888" style={styles.inputIcon} />
          <TextInput
            placeholder="Username"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
            style={[styles.input, { fontWeight: 'bold' }]}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Feather name="lock" size={22} color="#888" style={styles.inputIcon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={[styles.input, { fontWeight: 'bold' }]}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.customButton} onPress={handleLogin} activeOpacity={0.8}>
            <Text style={styles.customButtonText}>Log in</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.forgotPassword}>Forgot Password</Text>
      </View>
      <View style={styles.flexSpacer} />
      <Text style={styles.terms}>Terms and Conditions</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  centerSection: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 260,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Optima, sans-serif',
    marginBottom: 60,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 14,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  buttonWrapper: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  customButton: {
    backgroundColor: '#50C878',
    borderRadius: 25,
    paddingVertical: 18, // More padding top and bottom
    alignItems: 'center',
    width: '100%',
  },
  customButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  forgotPassword: {
    marginTop: 10,
    color: '#000000',
  },
  flexSpacer: {
    flex: 1,
  },
  terms: {
    marginBottom: 20,
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default LoginScreen;
