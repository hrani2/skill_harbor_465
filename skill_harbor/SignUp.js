import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity, StatusBar, SafeAreaView, ScrollView } from 'react-native';
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
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={text => setAge(text.replace(/[^0-9]/g, ''))} // Ensure only numbers are entered
        keyboardType="number-pad" // Show number pad on focus
        style={styles.input}
      />
      <TextInput
        placeholder="Add Skill"
        value={tempSkill}
        onChangeText={setTempSkill}
        onSubmitEditing={handleAddSkill} // Allows adding by pressing the return key
        style={styles.input}
      />
      <Button title="Add Skill" onPress={handleAddSkill} />
      <ScrollView style={styles.skillsList}>
        {skills.map((skill, index) => (
          <Text key={index} style={styles.skillItem}>
            {skill}
          </Text>
        ))}
      </ScrollView>
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
});

export default SignUpScreen;
