// ReceiveJoinCode.js
import React from 'react';
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

const TeamRequestPosted = ({ route , navigation }) => {

  const { name, email } = route.params || {};
  const handleHomePress = () => {
    // Navigate back to the HomeScreen
    console.log('Home button pressed');
    navigation.navigate('Home', {email: email});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.congratulationsText}>Congratulations!</Text>

      <Text style={styles.header}>Your team request for:</Text>

      <View style={styles.cardContainer}>
        <Text style={styles.joinCodeText}>{name}</Text>
      </View>

      <Text style={styles.header}>has been sent out.</Text>


      {/* Additional information paragraphs */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
            Make changes and get updates in the Dashboard on the home page.
        </Text>
      </View>

      {/* Home Button */}
      <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
        <Icon name="home" size={30} color="#00507B" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    congratulationsText: {
        fontSize: 50,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#FFEB38', // Choose your desired color
        marginBottom: 50,
    },
    container: {
      flex: 1,
      backgroundColor: '#00507B',
      padding: 20,
      alignItems: 'center',
    },
    header: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#FFF',
      marginBottom: 20,
    },
    cardContainer: {
      backgroundColor: '#FFF',
      padding: 60,
      borderRadius: 20,
      alignItems: 'center',
      marginBottom: 20,
    },
    joinCodeText: {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#00507B',
      fontFamily: 'RobotoSlab-Medium',
    },
    infoContainer: {
      marginTop: 80,
      alignItems: 'center',
    },
    infoText: {
      color: '#FFF',
      fontSize: 20,
      marginBottom: 10,
      textAlign: 'center',
      fontWeight: 'bold', // Bold the text
    },
    organizationText: {
      color: '#FFEB38', // Add your desired color here
      fontWeight: 'bold',
    },
    courseText: {
      color: '#FFEB38', // Add your desired color here
      fontWeight: 'bold',
    },
    homeButton: {
      position: 'absolute',
      bottom: 20,
      left: '50%', // Center the button horizontally
      transform: [{ translateX: -25 }], // Adjust position to center
      backgroundColor: '#FFF',
      padding: 20,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  

export default TeamRequestPosted;