import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const JoinCode = ({ navigation }) => {
  const [organization, setOrganization] = useState('');
  const [course, setCourse] = useState('');

  const handleCompletePress = () => {
    if (organization.trim() === '') {
      // Show an error message if the organization field is empty
      Alert.alert('Error', 'Please enter the organization/school.');
    } else {
      // Show a confirmation dialog before completing the form
      Alert.alert(
        'Confirmation',
        'Are you sure you want to submit the form?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              // Add any necessary logic before navigating
              console.log('Complete button pressed - confirmed');
              navigation.navigate('ReceiveJoinCode', {
                organization,
                course,
              });
            },
          },
        ],
        { cancelable: false }
      );
    }
  };


  const handleHomePress = () => {
    // Show a confirmation dialog before navigating to the HomeScreen
    Alert.alert(
      'Confirmation',
      'Are you sure you want to go to the home? Your progress will not be saved.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            console.log('Home button pressed - confirmed');
            navigation.navigate('Home');
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {/* Organization/School */}
      <View style={styles.textBoxContainer}>
        <Text style={styles.labelText}>
          ORGANIZATION/SCHOOL{' '}
          <Text style={styles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={styles.textBox}
          placeholder="Enter organization/school"
          value={organization}
          onChangeText={(text) => setOrganization(text)}
        />
      </View>

      {/* Course (Optional) */}
      <View style={styles.textBoxContainer}>
        <Text style={styles.labelText}>COURSE (OPTIONAL)</Text>
        <TextInput
          style={styles.textBox}
          placeholder="Enter course (optional)"
          value={course}
          onChangeText={(text) => setCourse(text)}
        />
      </View>

      {/* Additional Info (Optional) */}
      <View style={styles.textBoxContainer}>
        <Text style={styles.labelText}>ADDITIONAL INFO (OPTIONAL)</Text>
        <TextInput
          style={styles.largeTextBox}
          placeholder="Enter additional information (optional)"
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"  // Move the placeholder to the top
        />
      </View>

      {/* Home Button */}
      <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
        <Icon name="home" size={30} color="#FFF" />
      </TouchableOpacity>

      {/* Complete Button */}
      <TouchableOpacity style={styles.completeButton} onPress={handleCompletePress}>
        <Text style={styles.completeButtonText}>Complete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', // Blue background color
    padding: 20,
    paddingTop: 60,
    position: 'relative',
  },
  textBoxContainer: {
    marginBottom: 20,
  },
  labelText: {
    color: '#00507B', // White text color
    marginBottom: 5,
    fontFamily: 'RobotoSlab-Bold',
    letterSpacing: 1,
  },
  requiredStar: {
    color: 'red',
  },
  textBox: {
    backgroundColor: '#B2BCC1', // White text box background color
    padding: 10,
    borderRadius: 5,
    fontFamily: 'RobotoSlab-Regular',
  },
  largeTextBox: {
    backgroundColor: '#B2BCC1', // White text box background color
    padding: 10,
    borderRadius: 5,
    height: 120,
    textAlignVertical: 'top',  // Move the placeholder to the top
  },
  homeButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#00507B', // White button color
    padding: 20,
    borderRadius: 50, // Make it a circle
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
  },
  completeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50', // Green button color
    padding: 20,
    borderRadius: 50, // Make it a circle
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeButtonText: {
    color: '#FFF', // White text color
    fontSize: 16,
    fontFamily: 'RobotoSlab-Regular',
  },
});

export default JoinCode;
