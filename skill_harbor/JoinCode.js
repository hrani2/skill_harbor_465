// JoinCode.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const JoinCode = () => {
  return (
    <View style={styles.container}>
      {/* Organization/School */}
      <View style={styles.textBoxContainer}>
        <Text style={styles.labelText}>
          ORGANIZATION/SCHOOL{' '}
          <Text style={styles.requiredStar}>*</Text>
        </Text>
        <TextInput style={styles.textBox} placeholder="Enter organization/school" />
      </View>

      {/* Course (Optional) */}
      <View style={styles.textBoxContainer}>
        <Text style={styles.labelText}>COURSE (OPTIONAL)</Text>
        <TextInput style={styles.textBox} placeholder="Enter course (optional)" />
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
      <TouchableOpacity style={styles.homeButton}>
        <Icon name="home" size={30} color="#00507B" />
      </TouchableOpacity>

      {/* Complete Button */}
      <TouchableOpacity style={styles.completeButton}>
        <Text style={styles.completeButtonText}>Complete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00507B', // Blue background color
    padding: 20,
    position: 'relative',
  },
  textBoxContainer: {
    marginBottom: 20,
  },
  labelText: {
    color: '#FFF', // White text color
    marginBottom: 5,
  },
  requiredStar: {
    color: 'red',
  },
  textBox: {
    backgroundColor: '#FFF', // White text box background color
    padding: 10,
    borderRadius: 5,
  },
  largeTextBox: {
    backgroundColor: '#FFF', // White text box background color
    padding: 10,
    borderRadius: 5,
    height: 120,
    textAlignVertical: 'top',  // Move the placeholder to the top
  },
  homeButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#FFF', // White button color
    padding: 20,
    borderRadius: 50, // Make it a circle
    alignItems: 'center',
    justifyContent: 'center',
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
  },
});

export default JoinCode;
