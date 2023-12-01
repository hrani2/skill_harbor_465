import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { queryUserByName, queryTeamByName } from './firebase/utils';

const PendingInvites = ({ navigation, route }) => {

  // Your component logic goes here
  const { email } = route.params; 
  const [invitesFromTeams, setInvitesFromTeams] = useState([]);
  const [requestsFromPeople, setRequestsFromPeople] = useState([]);
  // pendingRequest needs to be changed to pending_invites
  useEffect(() => {
    const fetchInvites = async () => {
      const userInfo = await queryUserByName(email);
      const invites = userInfo.pendingInvites;
      setInvitesFromTeams(invites);
    };

    const fetchRequests = async () => {
      const userInfo = await queryUserByName(email);
      // for every team in userInfo.teams, query the team and get the requests
      const requestsList = [];
      for (let i = 0; i < userInfo.teams.length; i++) {
        const teamInfo = await queryTeamByName(userInfo.teams[i]);
        // const requests = [userInfo.teams[i], teamInfo.pendingRequest];
        for (let j = 0; j < teamInfo.pendingRequest.length; j++) {
          // requestsList.push(userInfo.teams[i], teamInfo.pendingRequest[j]);
          requestsList.push(`${teamInfo.pendingRequest[j].name} request to join ${userInfo.teams[i]}`)
        }
        // requestsList.push(requests);
      }
      setRequestsFromPeople(requestsList);
    };

    fetchInvites();
    fetchRequests();
  }, [])


  
  const handleCheckPress = (type, inviteType) => {
    // Handle check press based on the type and inviteType
    // console.log(`Check pressed for ${type} - ${inviteType}`);
  };

  const handleCrossPress = (type, inviteType) => {
    // Handle cross press based on the type and inviteType
    // console.log(`Cross pressed for ${type} - ${inviteType}`);
  };

  const handleHomePress = () => {
    // try { 
    //   navigation.navigate('Home', {email: email});
    // } catch (e) {
    //   console.log("navigation error: ", e); 
    // }
  };


  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pending Invites</Text>

      {/* Header 1 */}
      <View style={styles.headerContainer}>
        <View style={styles.lineone} />
        <Text style={styles.contentHeader}>FROM TEAMS</Text>
        <View style={styles.line} />
      </View>

      {/* Card 1 for Header 1 */}
      {invitesFromTeams.map((team, index) => (
        <View key={index} style={styles.cardContainer}>
          <TouchableOpacity style={styles.card} onPress={() => {/* Handle card press for FROM TEAMS */}}>
            <TouchableOpacity onPress={() => handleCrossPress('Team', team)}>
              <Icon name="times" size={30} color="red" />
            </TouchableOpacity>
            <Text style={styles.cardText}>{team}</Text>
            <TouchableOpacity onPress={() => handleCheckPress('Team', team)}>
              <Icon name="check" size={30} color="green" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      ))}

      {/* Header 2 */}
      <View style={styles.headerContainer}>
        <View style={styles.lineone} />
        <Text style={styles.contentHeader}>FROM PEOPLE</Text>
        <View style={styles.line} />
      </View>

      {requestsFromPeople.map((person, index) => (
        <View key={index} style={styles.cardContainer}>
          <TouchableOpacity style={styles.card} onPress={() => {/* Handle card press for FROM PEOPLE */}}>
            <TouchableOpacity onPress={() => handleCrossPress('Person', person)}>
              <Icon name="times" size={30} color="red" />
            </TouchableOpacity>
            <Text style={styles.cardText}>{person}</Text>
            <TouchableOpacity onPress={() => handleCheckPress('Person', person)}>
              <Icon name="check" size={30} color="green" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#00507B',
  },
  header: {
    fontSize: 40,
    color: '#FFF',
    textAlign: 'center',
    padding: 20,
    marginTop: 40,
    fontFamily: 'RobotoSlab-Black',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  lineone: {
    flex: 1,
    height: 2,
    backgroundColor: '#FFF',
    marginRight: -30,
    maxWidth: 40,
    marginLeft: 15,
  },
  contentHeader: {
    fontFamily: 'RobotoSlab-Black',
    fontSize: 17,
    color: '#FFF',
    paddingVertical: 10,
    letterSpacing: 1,
    alignSelf: 'flex-start',
    paddingHorizontal: 40,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#FFF',
    marginLeft: -30,
    marginRight: 15,
  },
  cardContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  cardText: {
    fontSize: 18,
    fontFamily: 'RobotoSlab-Regular',
    color: '#00507B',
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

export default PendingInvites;