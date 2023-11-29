import React from 'react';
import { Image } from 'react-native'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView, ScrollView } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.logoContainer}>
        <Image
        source={require('./assets/logo.png')} // Replace with the correct path to your local image
        style={styles.logo} // You may need additional styling for your image
        />
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
        onPress={() => {navigation.navigate('SignUp')}}
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
    
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
    paddingHorizontal: 16.877,
    flexShrink: 0,
  },
  logo: {
    // If you want to specify the size of the logo or any other style:
    width: 200, // Set the width as needed
    height: 100, // Set the height as needed
    resizeMode: 'contain', // Ensures the image is scaled to fit within the container
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00507B',
    fontFamily: 'RobotoSlab-ExtraBold',
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#00507B',
    marginBottom: 20,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    fontFamily: 'RobotoSlab-Bold',
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
    fontFamily: 'RobotoSlab-Regular'
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
  },
  forgotPasswordText: {
    color: 'blue',

    fontFamily: 'RobotoSlab-Regular'
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
    fontFamily: 'RobotoSlab-Medium'
  },
  signUpButton: {
    marginTop: 20,
  },
  signUpButtonText: {
    color: 'black',
    fontFamily: 'RobotoSlab-Regular'
  },
});

export default LoginScreen;
