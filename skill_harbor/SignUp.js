import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity, StatusBar, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Image } from 'react-native'; 
import HomeScreen from './HomeScreen';
import { addNewUser } from './firebase/utils'



const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [skills, setSkills] = useState([]);
  const [tempSkill, setTempSkill] = useState('');

  const handleAddSkill = () => {
    if (tempSkill) {
      setSkills([...skills, tempSkill]);
      setTempSkill('');
    }
  };


  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match");
      return;
    }
    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim() || !age.trim() || skills.length === 0) {
      // Display an error message
    Alert.alert('Error', 'Please fill in all required fields.');
    return; // Stop the function if any field is empty
  }
    const ageNumber = parseInt(age);
    if (isNaN(ageNumber) || ageNumber < 14 || ageNumber > 80) {
      Alert.alert("Invalid Age", "Age must be a number between 14 and 80.");
      return;
    };
    console.log("Skills: ", skills);
    addNewUser(fullName, email, password, age, skills);

    try {
        // Your sign-up logic...
        console.log('Navigating to Home...');
        Alert.alert('Sign Up Successful', 'Welcome ' + fullName);
        navigation.navigate('Home', {email: email});
      } catch (error) {
        console.error('Navigation error:', error);
      }
  };

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }} // Take up the entire screen
    behavior={Platform.OS === "ios" ? "padding" : "height"} // Platform-specific behavior
  >
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>



      <View style={styles.textBoxContainer}>
        <Text style={styles.labelText}>
          Full Name:{' '}
          <Text style={styles.requiredStar}>*</Text>
        </Text>
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />
      </View>

      <View style={styles.textBoxContainer}>
        <Text style={styles.labelText}>
          Email (username):{' '}
          <Text style={styles.requiredStar}>*</Text>
        </Text>
        <TextInput
           placeholder="Email Address"
           value={email}
           onChangeText={setEmail}
           autoCapitalize="none"
           keyboardType="email-address"
           style={styles.input}
        />
      </View>

      <View style={styles.textBoxContainer}>
        <Text style={styles.labelText}>
          Password:{' '}
          <Text style={styles.requiredStar}>*</Text>
        </Text>
        <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
        />
      </View>

      <View style={styles.textBoxContainer}>
        <Text style={styles.labelText}>
        Confirm Password:{' '}
          <Text style={styles.requiredStar}>*</Text>
        </Text>
        <TextInput
             placeholder="Confirm Password"
             value={confirmPassword}
             onChangeText={setConfirmPassword}
             secureTextEntry
             style={styles.input}
        />
      </View>

      <View style={styles.textBoxContainer}>
        <Text style={styles.labelText}>
        Age:{' '}
          <Text style={styles.requiredStar}>*</Text>
        </Text>
        <TextInput
             placeholder="Age"
             value={age}
             onChangeText={text => setAge(text.replace(/[^0-9]/g, ''))} // Ensure only numbers are entered
             keyboardType="number-pad" // Show number pad on focus
             style={styles.input}
        />
      </View>

      <View style={styles.textBoxContainer}>
        <Text style={styles.labelText}>
        Skills:{' '}
          <Text style={styles.requiredStar}>*</Text>
        </Text>
        <ScrollView style={styles.skillsList}>
        {skills.map((skill, index) => (
          <Text key={index} style={styles.skillItem}>
            {skill}
          </Text>
        ))}
      </ScrollView>
        <TextInput
             placeholder="Add Skill"
             value={tempSkill}
             onChangeText={setTempSkill}
             onSubmitEditing={handleAddSkill} // Allows adding by pressing the return key
             style={styles.input}
        />
      </View>
      {/* <Button title="Add Skill" onPress={handleAddSkill} /> */}

      <TouchableOpacity
        style={styles.signInButton}
        onPress={(handleSignUp)}
      >
        <Text style={styles.signInButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {navigation.navigate('Log In')}}
        style={styles.signInRedirect}
       >
        <Text style={styles.signInRedirect}>Already have an account? 
        <Text style={styles.SignInText}> SIGN IN</Text>
        </Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 67,
  },
  title: {
    fontSize: 24,
    fontFamily: 'RobotoSlab-Bold',
    color: "#00507B",
    marginBottom: 20,
    alignSelf: 'center',
  },
  textBoxContainer: {
    marginBottom: 20,
    fontFamily: 'RobotoSlab-Regular',
  },
  labelText: {
    color: '#00507B', // White text color
    marginBottom: 5,
    fontFamily: 'RobotoSlab-Bold',
    letterSpacing: 1,
    alignSelf: 'flex-start',
  },
  requiredStar: {
    color: 'red',
  },
  input: {
    backgroundColor: '#B2BCC1', // White text box background color
    padding: 10,
    borderRadius: 5,
    fontFamily: 'RobotoSlab-Regular',
    width: "100%",
    alignSelf: 'flex-start',
  },
  signInRedirect: {
    color: 'blue',
    marginTop: 20,
  },
  skillsList: {
    alignSelf: 'stretch',
    maxHeight: 100, 
    marginBottom: 10,
  },
  skillItem: {
    backgroundColor: '#ddd',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  signInButton: {
    backgroundColor: '#00507B',
    borderRadius: 5,
    padding: 15,
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'RobotoSlab-Medium'
  },
  signInRedirect: {
    margin: 20,
    color: 'black',
    fontFamily: 'RobotoSlab-Regular',
    alignSelf: 'center',
  },
  SignInText: {
    fontFamily: 'RobotoSlab-Bold',
    left: 20,
  }
});

export default SignUpScreen;
