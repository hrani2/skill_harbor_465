import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity, StatusBar, SafeAreaView, ScrollView, Dimensions} from 'react-native';
import { Image } from 'react-native'; 
import HomeScreen from './HomeScreen';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const screenWidth = Dimensions.get('window').width;

const ProfileScreen = ({ route, navigation }) => {
    const { name, email, age, skills = ['Python', 'R', 'C++'] } = route.params;
    return (
      <View style={styles.container}>
         <View style={styles.header}>
        <Text style={styles.headerText}>Your Profile</Text>
      </View>


       <TouchableOpacity style={styles.menuItem}>
          <View style={styles.icon}>
            <Icon name="user" size={50} color='#00507B' />
          </View>
        </TouchableOpacity>

        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity style={styles.ageButton}>
            <Text style={styles.input}>Age: {age}</Text>
        </TouchableOpacity>
        {/* <Text style={styles.input}>Location: {location}</Text> */}
        <Text style={styles.input}>Email: {email}</Text>
        {/* <Text style={styles.input}>School: {school}</Text> */}
        <View style={styles.skillsContainer}>
            {skills.map((skill, index) => (
            <TouchableOpacity key={index} style={styles.skillButton}>
                <Text style={styles.input}>{skill}</Text>
            </TouchableOpacity>
            ))}
        </View>
        <TouchableOpacity style={styles.floatButton} onPress={() => navigation.navigate('Home', {email: email})}>
          <View style = {styles.homeicon}>
            <Icon name="home" size={30} color='#FFF' />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      backgroundColor: '#00507B',
      height: 250,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomLeftRadius: 450 / 2,
    },
    headerText: {
      color: '#FFF',
      fontSize: 24,
      position: 'absolute',
      top: 40, // Adjust this value as needed
      fontFamily: 'RobotoSlab-Medium',
      alignSelf: "center",
      margin: 40,
    },
    menuItem: {
      alignItems: 'center',
      justifyContent: 'center', // This ensures the icon is centered vertically  
    },
    icon: {
      justifyContent: 'center',// You must set a height for borderRadius to work as expected
      alignItems: 'center',
      width: 100,
      height: 100,
      borderColor: '#00507B',
      borderWidth: 2,
      backgroundColor: '#FFF', 
      borderRadius: 50, 
      top: -110,
      right: 110,
    },
    name: {
      fontSize: 40,
      fontWeight: 'bold',
      fontFamily: 'RobotoSlab-Bold',
      color: 'white',
      marginBottom: 10,
      left: 160,
      top: -200,
    },
    ageButton: {
      backgroundColor: '#00507B',
      fontFamily: 'RobotoSlab-Medium',
      width: "40%",
      paddingHorizontal: 15,
      paddingVertical: 5,
      borderRadius: 15,
      marginBottom: 20,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    input: {
      width: '100%',
      fontSize: 17,
      fontFamily: 'RobotoSlab-Medium',
      color: 'white',
      alignItems: 'center',
      alignSelf: 'center',
    },
    skillsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
    },
    skillButton: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 5,
      borderRadius: 15,
      marginHorizontal: 5,
    }, 
    floatButton: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 320,
        top: 750,
    },
    homeicon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#00507B",
        alignItems: 'center',
        justifyContent: 'center',
    },
  });
  
  export default ProfileScreen;