import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { queryUserByName, queryTeamByName, removeSpecialCharacters } from './firebase/utils';
import { getDatabase, ref, update, get } from 'firebase/database';


const PendingInvites = ({ navigation, route }) => {

  // Your component logic goes here
  const { email } = route.params; 
  const [invitesFromTeams, setInvitesFromTeams] = useState([]);
  const [requestsFromPeople, setRequestsFromPeople] = useState([]);

  useEffect(() => {
    const fetchInvites = async () => {
      const userInfo = await queryUserByName(email);
      const invites = userInfo.pending_invites;
      console.log("invites: ", invites); 
      setInvitesFromTeams(invites);
    };

    const fetchRequests = async () => {
      const userInfo = await queryUserByName(email);
      // for every team in userInfo.teams, query the team and get the requests
      const requestsList = [];
      for (let i = 0; i < userInfo.teams.length; i++) {
        const teamInfo = await queryTeamByName(userInfo.teams[i]);
        // const requests = [userInfo.teams[i], teamInfo.pendingRequest];
        for (let j = 0; j < teamInfo.pending_invites.length; j++) {
          // requestsList.push(userInfo.teams[i], teamInfo.pendingRequest[j]);
          requestsList.push(`${teamInfo.pending_invites[j].name} request to join ${userInfo.teams[i]}`)
        }
      }
      setRequestsFromPeople(requestsList);
    };
    fetchInvites();
    fetchRequests();
  }, [])


  
  const handleCheckPress = (type, inviteType) => {
    console.log("handleCheckPress")
    // Handle check press based on the type and inviteType
    // console.log(`Check pressed for ${type} - ${inviteType}`);
    Alert.alert(
      "Confirm",
      "Are you sure you want to accept this invite?",
      [
        {
          text: "Check",
          onPress: () => console.log("Check Pressed"),
          style: "check"
        },
        { text: "OK", onPress: () => rejectInvite(type, inviteType) }
      ]
    );
  };

  const handleCrossPress = (type, inviteType) => {
    console.log("handleCrossPress")
    // Handle cross press based on the type and inviteType
    // console.log(`Cross pressed for ${type} - ${inviteType}`);
    Alert.alert(
      "Confirm",
      "Are you sure you want to reject this invite?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => rejectInvite(type, inviteType) }
      ]
    );
  };

const removeInviteFromDatabase = async (userId, invite, type) => {
  const db = getDatabase();
  if (type == 'Team') {
    const userRef = ref(db, `user/${removeSpecialCharacters(userId)}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      if (userData.pending_invites) {
        // Find the index of the invite to be removed
        const index = userData.pending_invites.indexOf(invite);
        if (index > -1) {
          // Remove the invite from the array
          userData.pending_invites.splice(index, 1);
  
          // Update the database
          const updates = {};
          updates['/pending_invites'] = userData.pending_invites;
          await update(userRef, updates);
        }
      }
    } else {
      console.log("User not found");
    }
  } 
};

const acceptInvite = (type,invite) => {
  try {
    if (type === 'Team') {
      //delete invite from user info pending_invites

      removeInviteFromDatabase(email, invite, type); 
      setInvitesFromTeams(prevInvites => prevInvites.filter(i => i !== invite));
    } else if (type === 'Person') {
      //delete invite from team pending_invites
      setRequestsFromPeople(prevRequests => prevRequests.filter(r => r !== invite));
    }
  } catch (error) {
    console.error("error accepting invite", error); 
  }
}

  const rejectInvite = (type, invite) => {
    try {
      // Call a function to update the database
      // await updateDatabaseToRemoveInvite(type, invite); 
  
      // Update state to remove the invite from the UI
      if (type === 'Team') {
        //delete invite from user info pending_invites
        removeInviteFromDatabase(email, invite, type); 
        setInvitesFromTeams(prevInvites => prevInvites.filter(i => i !== invite));
      } else if (type === 'Person') {
        //delete invite from team pending_invites
        setRequestsFromPeople(prevRequests => prevRequests.filter(r => r !== invite));
      }
        
    } catch (error) {
      console.error("Error removing invite: ", error);
      // Handle any errors, e.g., show an error message
    }
  };

  const handleHomePress = () => {
    try { 
      navigation.navigate('Home', {email: email});
    } catch (e) {
      console.log("navigation error: ", e); 
    }
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
          <TouchableOpacity style={styles.card} onPress={() => {}}>
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