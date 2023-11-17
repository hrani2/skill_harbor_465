import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import { Image } from 'react-native'; 
import HomeScreen from './HomeScreen';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const ProfileScreen = ({ route, navigation }) => {
    const { name, email, age, skills = ['Python', 'R', 'C++'] } = route.params;
    return (
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity style={styles.ageButton}>
            <Text>Age: {age}</Text>
        </TouchableOpacity>
        {/* <Text style={styles.input}>Location: {location}</Text> */}
        <Text style={styles.input}>Email: {email}</Text>
        {/* <Text style={styles.input}>School: {school}</Text> */}
        <View style={styles.skillsContainer}>
            {skills.map((skill, index) => (
            <TouchableOpacity key={index} style={styles.skillButton}>
                <Text>{skill}</Text>
            </TouchableOpacity>
            ))}
        </View>
        <TouchableOpacity style={styles.floatButton} onPress={() => navigation.navigate('Home', {email: email})}>
          <View style = {styles.homeicon}>
            <Icon name="home" size={40} color="#FFF" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#00507B',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 10,
    },
    ageButton: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 5,
      borderRadius: 15,
      marginBottom: 20,
    },
    input: {
      width: '100%',
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 5,
      color: 'black',
      fontSize: 16,
      marginBottom: 15,
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