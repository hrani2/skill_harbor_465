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
      </View>


       <View style={styles.menuItem}>
          <View style={styles.icon}>
            <Icon name="user" size={50} color='#00507B' />
          </View>
        </View>

        <Text style={styles.name} numberOfLines={2}>
          {name}
          </Text>

        <View style={styles.Containered}>
        <Text style={styles.title}>Age: </Text>
          <View style={styles.tagContainer}>
              <Text style={styles.tag}>{age}</Text>
          </View >
          </View>
          {/* <Text style={styles.input}>Location: {location}</Text> */}
          <View style={styles.Containered}>
          <Text style={styles.title}>E-mail: </Text>
          <View style={styles.tagContainer}>
          <Text style={styles.tag}>{email}</Text>
          </View>
          {/* <Text style={styles.input}>School: {school}</Text> */}
          </View>
          <View style={styles.Containered}>
          <Text style={styles.title}>Skills: </Text>
          <ScrollView style={styles.skillsContainer} horizontal={true}  showsHorizontalScrollIndicator={true}>
              {skills.map((skill, index) => (
              <TouchableOpacity key={index} style={styles.tagContainer2}>
                  <Text style={styles.tag}>{skill}</Text>
              </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.floatButton} onPress={() => navigation.navigate('Home', {email: email})}>
          <View style = {styles.homeicon}>
            <Icon name="home" size={30} color='#00507B' />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    header: {
      backgroundColor: '#00507B',
      height: 250,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomLeftRadius: 450 / 2,
      overflow: 'hidden',
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
      top: -100,
      right: 110,
    },
    name: {
      fontSize: 40,
      fontWeight: 'bold',
      fontFamily: 'RobotoSlab-Bold',
      color: 'white',
      marginBottom: 10,
      left: 160,
      top: -210,
      maxWidth: screenWidth - 120, // Adds space to the sides
    },
    Containered: {
      marginTop: 30,
      top: -180,
      marginVertical: 5,
      paddingHorizontal: 20,
      left: 20,
      flexDirection: 'row',
    },
    tagContainer: {
      borderRadius: 7,
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
    tagContainer2: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      borderRadius: 7,
    },
    tag: {
      backgroundColor: '#FFF', // Adjust your color
      borderRadius: 7,
      padding: 8,
      margin: 3,
      color: '#00507B',
      fontFamily: 'RobotoSlab-Regular',
      textTransform:'uppercase',
      borderColor: '#00507B',
      borderWidth: 2,

    },
    title : {
      fontFamily: 'RobotoSlab-Bold',
      color:  '#00507B',
      fontSize: 20,
    },
    skillsContainer: {
      flexDirection: 'row',
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
      backgroundColor: "#FFF",
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
  
  export default ProfileScreen;