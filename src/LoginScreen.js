import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameData = '123';
  const userpasswordData = "123";

  const handleLogin = () => {
    if (username === usernameData && password === userpasswordData) {
      navigation.navigate('home');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerSection}>
        <Text style={styles.title}>Practical Text</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button title="Login" onPress={handleLogin} />
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
    backgroundColor: '#f0f0f0',
  },
  centerSection: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 260,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    padding: 8,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  forgotPassword: {
    marginTop: 10,
    color: '#green',
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
