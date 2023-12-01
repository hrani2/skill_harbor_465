// import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { queryTeamDb, queryUserByName } from './firebase/utils';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';


const ChooseTeam = ({route, navigation}) => {
    const { email } = route.params;
    const [userInfo, setUserInfo] = useState();
    useEffect(() => { 
      const fetchUser = async () => {
        // print email
        console.log("email: ", email);
        const info = await queryUserByName(email);
        console.log("info: ", info);
        setUserInfo(info);
      };
      fetchUser();
    }, []);

    const handleHomePress = () => {
      try { 
        navigation.navigate('Home', {email: email});
      } catch (e) {
        console.log("navigation error: ", e); 
      }
    };
  

    
    return (
        <View style={styles.container}>

        <Text style={styles.header}>CURRENT TEAMS:</Text>
          {userInfo && userInfo["teams"] && userInfo["teams"].map((team) => (
            <TouchableOpacity 
              key={team}  
              style={styles.button} 
              onPress={() => navigation.navigate('Browse', { teamname: team, user_email: email })}
            >
              <Text style={styles.buttonText}>{team}</Text>
            </TouchableOpacity>
          ))}

        <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
          <Icon name="home" size={30} color="#00507B" />
        </TouchableOpacity>

        </View>
    );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00507B', // Assuming a navy blue background
  },
  header: {
    fontSize: 24,
    fontFamily: 'RobotoSlab-Bold',
    marginBottom: 40,
    color: '#FFF',
  },
  button: {
    backgroundColor: '#FFF',
    padding: 10,
    marginVertical: 10,
    borderRadius: 15,
    width: '80%', // Assuming the buttons take up 80% of container width
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 0 },
    elevation: 3,
  },
  buttonText: {
    textAlign: 'center',
    color: '#00507B',
    fontFamily: 'RobotoSlab-Regular',
    fontSize: 20,
    // Add additional styling to match the design
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
});

export default ChooseTeam;
