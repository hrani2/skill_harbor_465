import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.logoContainer}>
        {/* Add your logo here */}
        <Text style={styles.logoText}>Skill Harbor</Text>
      </View>
      <Text style={styles.title}>Sign in</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email or User Name"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <TouchableOpacity
        onPress={() => {/* Implement Forgot Password navigation */}}
        style={styles.forgotPasswordButton}
      >
        <Text style={styles.forgotPasswordText}>Forget Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.signInButtonText}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {/* Implement Sign Up navigation */}}
        style={styles.signUpButton}
      >
        <Text style={styles.signUpButtonText}>Don’t have account? Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  logoContainer: {
    marginBottom: 40,
    // If you have a logo image, you can use Image component instead
  },
  logoText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00507B',
    fontFamily: 'RobotoSlab-Regular'
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 20,
  },
  inputContainer: {
    width: '90%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#00507B',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-middle',
  },
  forgotPasswordText: {
    color: 'blue',
  },
  signInButton: {
    backgroundColor: '#00507B',
    borderRadius: 5,
    padding: 15,
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  signUpButton: {
    marginTop: 20,
  },
  signUpButtonText: {
    color: 'blue',
  },
});

export default LoginScreen;
