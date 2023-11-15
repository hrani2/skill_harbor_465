import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import { Image } from 'react-native'; 
import HomeScreen from './HomeScreen';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const ProfileScreen = ({ route, navigation }) => {
    const { name, email, age, skills } = route.params;
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Name: {name}</Text>
        <Text style={styles.text}>Email: {email}</Text>
        <Text style={styles.text}>Age: {age}</Text>
        <Text style={styles.text}>Skills:</Text>
        {skills.map((skill, index) => (
          <Text key={index} style={styles.skill}>
            {skill}
          </Text>
        ))}
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
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    },
    text: {
      fontSize: 18,
      marginBottom: 10
    },
    skill: {
      fontSize: 16
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