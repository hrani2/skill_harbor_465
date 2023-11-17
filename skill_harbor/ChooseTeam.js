import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ChooseTeam = ({navigation}) => {
    return (
        <View style={styles.container}>
        <Text style={styles.header}>Current Teams:</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Browse', { teamname: 'Fantastic Six' })} >
            <Text style={styles.buttonText}>Fantastic Six</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Browse', { teamname: 'TeamWin' })} >
            <Text style={styles.buttonText}>TeamWin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Browse', { teamname: 'AMAZ' })} >
            <Text style={styles.buttonText}>AMAZ</Text>
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
    marginBottom: 80,
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
    borderRadius: 20,
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
    // Add additional styling to match the design
  },
});

export default ChooseTeam;
