import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { queryTeamDb } from './firebase/utils';

const ChooseTeam = ({route, navigation}) => {
    const { email } = route.params;
    return (
        <View style={styles.container}>
        <Text style={styles.header}>CURRENT TEAMS:</Text>
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
    backgroundColor: '#FFF', // Assuming a navy blue background
  },
  header: {
    fontSize: 24,
    fontFamily: 'RobotoSlab-Bold',
    marginBottom: 40,
    color: '#00507B',
  },
  button: {
    backgroundColor: '#00507B',
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
    color: '#FFF',
    fontFamily: 'RobotoSlab-Regular',
    fontSize: 20,
    // Add additional styling to match the design
  },
});

export default ChooseTeam;
