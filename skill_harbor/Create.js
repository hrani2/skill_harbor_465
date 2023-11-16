import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Create = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // Add navigation logic for creating a team
          console.log('Create Team button pressed');
        }}
      >
        <Text style={styles.buttonText}>Create Team</Text>
        <Icon name="chevron-right" size={18} color="#FFF" style={styles.buttonIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // Add navigation logic for creating a join code
          console.log('Create Join Code button pressed');
          navigation.navigate('JoinCode');
        }}
      >
        <Text style={styles.buttonText}>Create Join Code</Text>
        <Icon name="chevron-right" size={18} color="#FFF" style={styles.buttonIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center items horizontally
  },
  button: {
    flexDirection: 'row', // Align text and icon in a row
    backgroundColor: '#00507B',
    padding: 20, // Increase padding for larger buttons
    marginVertical: 10,
    borderRadius: 15, // Increase border radius for rounded corners
    width: 300, // Increase button width
    alignItems: 'center',
    justifyContent: 'space-between', // Space out text and icon
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18, // Increase font size for larger buttons
    fontFamily: 'RobotoSlab-Medium',
  },
  buttonIcon: {
    marginLeft: 10, // Add left margin for the icon
  },
});

export default Create;
