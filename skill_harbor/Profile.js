import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Profile = ({ route, navigation }) => {
    const skills = [
        'Python' ,
        'C++' ,
        'React',
      ];

    const { name, age, location, email, school } = route.params;

    return (
        <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity style={styles.ageButton}>
            <Text>Age: {age}</Text>
        </TouchableOpacity>
        <Text style={styles.input}>Location: {location}</Text>
        <Text style={styles.input}>Email: {email}</Text>
        <Text style={styles.input}>School: {school}</Text>
        <View style={styles.skillsContainer}>
            {skills.map((skill, index) => (
            <TouchableOpacity key={index} style={styles.skillButton}>
                <Text>{skill}</Text>
            </TouchableOpacity>
            ))}
        </View>
        <TouchableOpacity style={styles.homeButton}>
            {/* Icon would be placed here */}
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
    homeButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      // Icon styling would go here
    },
    // Add any other styles you need for your component
  });

export default Profile;
