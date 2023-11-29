// ReceiveJoinCode.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import * as Font from 'expo-font';

const fetchFonts = () => {
  return Font.loadAsync({
    'RobotoSlab-Regular': require('./assets/fonts/RobotoSlab-Regular.ttf'),
    'RobotoSlab-Black': require('./assets/fonts/RobotoSlab-Black.ttf'),
    'RobotoSlab-Bold': require('./assets/fonts/RobotoSlab-Bold.ttf'),
    'RobotoSlab-ExtraBold': require('./assets/fonts/RobotoSlab-ExtraBold.ttf'),
    'RobotoSlab-ExtraLight': require('./assets/fonts/RobotoSlab-ExtraLight.ttf'),
    'RobotoSlab-Light': require('./assets/fonts/RobotoSlab-Light.ttf'),
    'RobotoSlab-Medium': require('./assets/fonts/RobotoSlab-Medium.ttf'),
    'RobotoSlab-SemiBold': require('./assets/fonts/RobotoSlab-SemiBold.ttf'),
    'RobotoSlab-Thin': require('./assets/fonts/RobotoSlab-Thin.ttf')
  });
};

const ReceiveJoinCode = ({ route , navigation }) => {

  const { organization, course, joinCode } = route.params || {};

  const handleHomePress = () => {
    // Navigate back to the HomeScreen
    console.log('Home button pressed');
    navigation.navigate('Home');
  };




  return (
    <View style={styles.container}>
      <Text style={styles.header}>Here is your join code:</Text>

      <View style={styles.cardContainer}>
        <Text style={styles.joinCodeText}>{joinCode}</Text>
      </View>

      {/* Additional information paragraphs */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Save this join code and provide it to the members of your organization to allow them to self-invite and create teams
          <Text style={styles.whiteText}>{course ? ' within ' : ''}</Text>
          <Text style={styles.organizationText}>{course ? `${course}` : ''}</Text>
          <Text style={styles.whiteText}> at </Text>
          <Text style={styles.courseText}>{organization}</Text>.
        </Text>
        <Text style={styles.infoText}>
          To access this code later, visit the Current Teams section on the home page.
        </Text>
      </View>

      {/* Home Button */}
      <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
        <Icon name="home" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      padding: 20,
      paddingTop: 60,
      alignItems: 'center',
    },
    header: {
      fontSize: 24,
      fontFamily: 'RobotoSlab-Bold',
      color: '#00507B',
      marginBottom: 20,
    },
    cardContainer: {
      backgroundColor: '#00507B',
      padding: 60,
      borderRadius: 20,
      alignItems: 'center',
    },
    joinCodeText: {
      fontSize: 40,
      color: '#FFF',
      fontFamily: 'RobotoSlab-Medium',
    },
    infoContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    infoText: {
      color: '#00507B',
      fontSize: 20,
      fontFamily: 'RobotoSlab-Regular',
      marginBottom: 10,
      textAlign: 'center',// Bold the text
    },
    organizationText: {
      color: '#CF12AF', // Add your desired color here
      fontWeight: 'bold',
    },
    courseText: {
      color: '#CF12AF', // Add your desired color here
      fontWeight: 'bold',
    },
    homeButton: {
      position: 'absolute',
      bottom: 40,
      left: '50%', // Center the button horizontally
      transform: [{ translateX: -20 }], // Adjust position to center
      backgroundColor: '#00507B',
      padding: 20,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
    },
  });
  

export default ReceiveJoinCode;