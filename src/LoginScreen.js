import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');

  const currentUser = {
    password: '123',
  };

  const handleLogin = () => {
    if (
      password === currentUser.password
    ) {
      navigation.navigate('MainTabs', {screen: 'TodoList'});
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerSection}>
        <Text style={styles.title}>To Do</Text>
        <View style={styles.labelWrapper}>
          <Text style={styles.labelText}>Enter Password</Text>
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={[styles.input, { fontWeight: 'bold' }]}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.customButtonText}>Unlock</Text>
          </TouchableOpacity>
        </View>
      </View>
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

  labelWrapper: {
    width: '80%',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  labelText: {
    fontSize: 16,
    color: '#333',
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
    paddingVertical: 18,
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
