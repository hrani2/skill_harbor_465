import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { queryUserSentRequests } from './firebase/utils';

const SentRequests = ({ navigation, route }) => {

  // Your component logic goes here
  const { email } = route.params; 

  const [requestsToPeople, setRequestsToPeople] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requestsData = await queryUserSentRequests(email);
        console.log("requestData", requestsData);
  
        // Check if the first property's value is an object - indicating an object of objects
        const isObjectOfObjects = requestsData && typeof Object.values(requestsData)[0] === 'object';
  
        let newRequests;
        if (isObjectOfObjects) {
          // If it's an object of objects, process each one
          newRequests = Object.values(requestsData).map(requestInfo => ({
            name: requestInfo.name,
            email: requestInfo.email,
          }));
        } else {
          // If it's a single object, wrap it in an array
          newRequests = [{
            name: requestsData.name,
            email: requestsData.email,
          }];
        }
  
        console.log('newRequests: ', newRequests);
        setRequestsToPeople(newRequests);
      } catch (error) {
        console.log("Error fetching requests: ", error);
      }
    };
    fetchRequests();
  }, [email]);
  

  const getStatusIcon = (status) => {
    switch (status) {
      case 'inProgress':
        return <Icon name="clock-o" size={30} color="#FFD700" />; // Yellow circle for in progress
      case 'completed':
        return <Icon name="check-circle" size={30} color="green" />; // Green check circle for completed
      case 'rejected':
        return <Icon name="times-circle" size={30} color="red" />; // Red times circle for rejected
      default:
        return null;
    }
  };

  const handleHomePress = () => {
    try { 
      console.log("email: ", email);
      navigation.navigate('Home', {email: email});
    } catch (e) {
      console.log("navigation error: ", e); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sent Requests</Text>

      {/* Header 1 */}
      <View style={styles.headerContainer}>
        <View style={styles.lineone} />
        <Text style={styles.contentHeader}>TO TEAMS</Text>
        <View style={styles.line} />
      </View>

      {/* Card 1 for Header 1 */}
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => {/* Handle card press for TO TEAMS */}}>
          <Text style={styles.cardText}>Team Request 1</Text>
          {getStatusIcon('inProgress')}
        </TouchableOpacity>
      </View>

      {/* Card 2 for Header 1 */}
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => {/* Handle card press for TO TEAMS */}}>
          <Text style={styles.cardText}>Team Request 2</Text>
          {getStatusIcon('completed')}
        </TouchableOpacity>
      </View>

      {/* Header 2 */}
      <View style={styles.headerContainer}>
        <View style={styles.lineone} />
        <Text style={styles.contentHeader}>TO PEOPLE</Text>
        <View style={styles.line} />
      </View>
      {requestsToPeople.map((request, index) => (
        <View key={index} style={styles.cardContainer}>
          <TouchableOpacity style={styles.card} onPress={() => {console.log("Data that should display", request)}}>
            <Text style={styles.cardText}>{request.name}</Text>
            {getStatusIcon('inProgress')}
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

export default SentRequests;