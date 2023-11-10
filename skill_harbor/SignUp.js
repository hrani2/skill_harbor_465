import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import { Image } from 'react-native'; 
import HomeScreen from './HomeScreen';

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Here you would add your validation logic and possibly network requests
    // For this example, we'll just show an alert
    // if (password !== confirmPassword) {
    //   Alert.alert("Passwords don't match");
    //   return;
    // }
    // Proceed with backend sign-up process...
    // Alert.alert('Sign Up Successful', 'Welcome ' + fullName);
    // After sign up, you can navigate to another screen
    try {
        // Your sign-up logic...
        console.log('Navigating to Home...');
        navigation.navigate('Home');
      } catch (error) {
        console.error('Navigation error:', error);
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <TouchableOpacity
        onPress={() => {navigation.navigate('Log In')}}
        style={styles.signInRedirect}
       >
        <Text style={styles.signInRedirect}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  signInRedirect: {
    color: 'blue',
    marginTop: 20,
  },
});

export default SignUpScreen;
