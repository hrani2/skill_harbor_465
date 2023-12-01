
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal , ScrollView, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { addNewTeam } from './firebase/utils';

const CreateTeam = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isSkillModalVisible, setSkillModalVisible] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState([]);
  const [isAddButtonDisabled, setAddButtonDisabled] = useState(true);
  const { email } = route.params; 
  const [userInfo, setUserInfo] = useState(); 

  const handleCompletePress = () => {
    if (name.trim() === '' || location.trim() === '' || teamSize.trim() === '' || additionalInfo.trim() === '' || parseInt(teamSize) < 2 || parseInt(teamSize) >= 1000) {
        // Show an error message if the required fields are empty or teamSize is less than 2 or greater than 1000
        Alert.alert('Error', 'Please complete all required fields (marked with a yellow star) and ensure that the team size is 2 or greater.');
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
              addNewTeam(name,location,teamSize,joinCode,skills,additionalInfo);
              console.log('Complete button pressed - confirmed');
              navigation.navigate('TeamRequestPosted', {
                name,
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

  const handleAddSkill = () => {
    // Show the skill modal
    setSkillModalVisible(true);
  };

  const handleSkillModalClose = () => {
    // Close the skill modal
    setSkillModalVisible(false);
  };

  const handleAddNewSkill = () => {
    // Add the new skill to the list
    setSkills([...skills, newSkill]);

    // Close the skill modal
    setSkillModalVisible(false);

    // Optionally, clear the input field
    setNewSkill('');

    // Disable the button again after adding a skill
    setAddButtonDisabled(true);
  };

  const handleSkillInputChange = (text) => {
    setNewSkill(text);
    // Enable/disable the button based on whether there is text
    setAddButtonDisabled(text.trim() === '');
  };

  const handleRemoveSkill = (index) => {
    // Remove the skill at the specified index
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <View style={styles.container}>
      {/* Team Name */}
      <View style={styles.textBoxContainer}>
        <Text style={styles.labelText}>
          TEAM NAME{' '}
          <Text style={styles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={styles.textBox}
          placeholder="Enter a team name or project subject"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>

      {/* Location */}
      <View style={styles.textBoxContainer}>
        <Text style={styles.labelText}>
          LOCATION{' '}
          <Text style={styles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={styles.textBox}
          placeholder="What city is your project based out of? (Can be remote.)"
          value={location}
          onChangeText={(text) => setLocation(text)}
        />
      </View>

      {/* Team size and Join Code */}
      <View style={styles.doubleTextBoxContainer}>
        {/* Team Size */}
        <View style={[styles.squareTextBoxContainer, { marginRight: 10 }]}>
          <Text style={styles.labelText}>
            MAX TEAM SIZE{' '}
            <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TextInput
            style={styles.squareTextBox}
            placeholder="?"
            value={teamSize}
            onChangeText={(text) => setTeamSize(text.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
          />
        </View>

        {/* Join Code */}
        <View style={styles.textBoxContainer}>
          <Text style={styles.labelText}>JOIN CODE (OPTIONAL)</Text>
          <TextInput
            style={styles.textBox}
            placeholder="Enter join code"
            value={joinCode}
            onChangeText={(text) => setJoinCode(text)}
          />
        </View>
      </View>

      {/* m */}

      {/* Add Skill Section */}
      <View style={styles.addSkillContainer}>
        <TouchableOpacity style={styles.addSkillButton} onPress={handleAddSkill}>
          <Text style={styles.addSkillButtonText}>Add desired skills +</Text>
        </TouchableOpacity>
      </View>

      {/* Render Skills */}
      {skills.length > 0 && (
        <View style={styles.skillsContainer}>
          {skills.map((skill, index) => (
            <TouchableOpacity key={index} style={styles.skillItemContainer}>
              <Text style={styles.skillItemText}>{skill}</Text>
              <TouchableOpacity style={styles.removeSkillButtonContainer} onPress={() => handleRemoveSkill(index)}>
                <Icon name="times" size={22} color="#FFF" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      )}


      {/* m */}

      {/* Additional Info (Optional) */}
      <View style={styles.textBoxContainer}>
        <Text style={styles.labelText}>
          ADDITIONAL INFO {' '}
        <Text style={styles.requiredStar}>*</Text>
        </Text>
        <TextInput
          style={styles.largeTextBox}
          placeholder="A short description about your team and/or project goals..."
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top" 
          onChangeText={(text) => setAdditionalInfo(text)} // Move the placeholder to the top
        />
      </View>

      {/* Home Button */}
      <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
        <Icon name="home" size={30} color="#00507B" />
      </TouchableOpacity>

      {/* Complete Button */}
      <TouchableOpacity style={styles.completeButton} onPress={handleCompletePress}>
        <Text style={styles.completeButtonText}>Complete</Text>
      </TouchableOpacity>

      {/* Skill Modal */}
      <Modal visible={isSkillModalVisible} transparent={true} animationType="slide">
        <View style={styles.skillModalContainer}>
          <TextInput
            style={styles.skillModalInput}
            placeholder="Enter skill"
            value={newSkill}
            onChangeText={handleSkillInputChange}
          />
          <View style={styles.skillModalButtonsContainer}>
            <TouchableOpacity
              style={styles.skillModalCloseButton}
              onPress={handleSkillModalClose}
            >
              <Text style={styles.skillModalButtonText}>CLOSE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.skillModalAddButton}
              onPress={handleAddNewSkill}
              disabled={isAddButtonDisabled}
            >
              <Text style={styles.skillModalButtonText}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#00507B', // Blue background color
    padding: 20,
    position: 'relative',
    paddingTop: 60,
  },
  textBoxContainer: {
    marginBottom: 20,
    fontFamily: 'RobotoSlab-Regular',
  },
  labelText: {
    color: '#FFF', // White text color
    marginBottom: 5,
    fontFamily: 'RobotoSlab-Bold',
    letterSpacing: 1,
  },
  requiredStar: {
    color: '#FFEB38',
  },
  textBox: {
    backgroundColor: '#FFF', // White text box background color
    padding: 10,
    borderRadius: 5,
    fontFamily: 'RobotoSlab-Regular',
  },
  squareTextBox: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    width: 50,  // Adjust the width as needed
    textAlign: 'center',
  },
  //
  addSkillContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  skillsContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  addSkillTitle: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'RobotoSlab-Bold',
  },
  addSkillButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 15,
  },
  addSkillButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'RobotoSlab-Regular',
  },
  skillsTitle: {
    color: '#00507B',
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'RobotoSlab-Bold',
  },
  skillItem: {
    color: '#00507B',
    fontSize: 16,
  },
  skillModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.85)', // Semi-transparent black background
  },
  skillModalInput: {
    backgroundColor: '#FFF', // White background color
    padding: 10,
    borderRadius: 5,
    color: '#000', // Set text color to black
    width: '80%', // Adjust the width as needed
    fontFamily: 'RobotoSlab-Regular',
  },
  skillModalButtonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  skillModalCloseButton: {
    width:'40%',
    backgroundColor: '#00507B',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
    alignItems: 'center',
    fontFamily: 'RobotoSlab-Bold',
  },
  skillModalAddButton: {
    width:'40%',
    backgroundColor: '#00507B',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
    alignItems: 'center',
  },
  skillModalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'RobotoSlab-Bold',
    letterSpacing: 1,
  },
  skillItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00507B', // White background color
    borderRadius: 20, // Adjust the border radius for an oval shape
    padding: 10,
    marginVertical: 5,
  },
  skillItemText: {
    flex: 1, // Take up remaining space
    color: '#FFF',
    fontSize: 16,
    marginRight: 30,
    fontFamily: 'RobotoSlab-Regular',
  },
  removeSkillButtonContainer: {
    // backgroundColor: '#FFF', // White background color
    // borderRadius: 15,
    // padding: 5, // Adjust the padding as needed
  },
  removeSkillButton: {
    color: '#00507B',
    fontSize: 22,
  },
  //
  doubleTextBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  largeTextBox: {
    backgroundColor: '#FFF', // White text box background color
    padding: 10,
    borderRadius: 5,
    height: 120,
    textAlignVertical: 'top',  // Move the placeholder to the top
    fontFamily: 'RobotoSlab-Regular',
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

export default CreateTeam;