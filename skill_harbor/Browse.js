import { Alert, View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import { queryTeamByName, queryAllUsers, updateTeamRequests} from './firebase/utils';


const Browse = ({ route, navigation }) => {
  // This data would typically come from your application's state or props
  const { teamname, user_email } = route.params;
  const [score, setScore] = useState(0);
  const [matches, setMatches] = useState([]);


  useEffect(() => { 
    const calculateScore = async () => {
      console.log('user email', user_email); 
      allUserInfos = await queryAllUsers();
      teamInfos = await queryTeamByName(teamname);

      const teamSkills = teamInfos.skills;
      const newMatches = Object.values(allUserInfos).map(userInfo => {
        // Calculate score
        const userSkills = userInfo.skills;
        let skillMatchCounter = 0;
        for (let i = 0; i < userSkills.length; i++) {
          if (teamSkills.map(skill => skill.toLowerCase()).includes(userSkills[i].toLowerCase())) {
            skillMatchCounter += 1;
          }
        }
        const score = (skillMatchCounter / teamSkills.length) * 10;
        
        // Return new object with calculated rating
        return {
          name: userInfo.name,
          email: userInfo.email, 
          rating: Number((score).toFixed(1)),
          age: userInfo.age,
          skills: userInfo.skills,
        };
      });
      const sortedMatches = [...newMatches].sort((a, b) => b.rating - a.rating);
      setMatches(sortedMatches);
    };
    calculateScore(); 
  }, []);


  // const recommended = [
  //   { name: 'Adelia', rating: 8.6, age:20, skills:['Python', 'Git', 'Linux'] },
  //   { name: 'Jason', rating: 8.4, age: 22, skills:['R', 'C++', 'C'] },
  // ];

  const confirmAddition = (teamname, name, requesteduser_email) => {
    Alert.alert(
      "Confirmation",
      `Are you sure you want to add ${name} to your team?`,
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            console.log("Yes Pressed");
            additionSuccessful(teamname, name, requesteduser_email); // Call another function to show the second alert
          }
        }
      ]
    );
  };

  // when i request a person for my team, they need to show up in my sent requests.  
  const additionSuccessful = (teamname, name, requesteduser_email) => {
    Alert.alert(
      "Success",
      `You have sent a request to ${name} successfully!`,
      [
        { text: "OK", onPress: () => console.log('OK Pressed') }
      ]
    );
    console.log("teamname: ", teamname); 
    console.log("user_email", user_email);
    updateTeamRequests(teamname, name, requesteduser_email, 'inProgress')
  };

  const handleHomePress = () => {
    // Show a confirmation dialog before navigating to the HomeScreen
    Alert.alert(
      'Confirmation',
      'Are you sure you want to go to the home? Your progress will not be saved.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            console.log('Home button pressed - confirmed');
            navigation.navigate('Home', {email: user_email});
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Icon name="arrow-left" size={24} color="#00507B" />
      </TouchableOpacity>

      <Text style={styles.header}>{teamname}</Text>
      <Text style={styles.subheader}>Potential matches:</Text>
      <ScrollView style={styles.scrollView}>
        {matches.map((match, index) => (
          <TouchableOpacity key={index} style={styles.item} onPress={() => navigation.navigate('Profile', { name: match.name,  profile_email: match.email, age: match.age, skills: match.skills, user_email: user_email})} >
            <Text style={styles.name}>{match.name}</Text>
            <View style={styles.matchInfo}>
              <Text style={styles.rating}>{match.rating}</Text>
              <TouchableOpacity onPress={() => confirmAddition(teamname, match.name, match.email)}>
                <Icon name="check" size={30} color="green" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Add navigation and other controls as necessary */}

      {/* Home Button */}
      <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
          <Icon name="home" size={30} color="#00507B" />
        </TouchableOpacity>
      </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00507B', // Dark blue background
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    padding: 20,
    marginTop: 40,
  },
  subheader: {
    fontSize: 22,
    fontFamily: 'RobotoSlab-Bold',
    color: '#FFF',
    paddingLeft: 20,
    paddingBottom: 10,
  },
  scrollView: {
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 20,
    fontFamily: 'RobotoSlab-Regular',
    color: '#00507B',
  },
  rating: {
    fontSize: 20,
    fontFamily: 'RobotoSlab-Bold',
    color: 'green',
    marginLeft: 10,
    marginRight: 30,
  },
  recommendedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  recommendation: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 10,
    width: width * 0.4, // Adjust the width as per your design requirement
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  matchInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollViewContent: {
    alignItems: 'center', // Centers items on the cross axis
    // You can add more styles as needed
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
  backButton: {
    position: 'absolute',
    top: 20, // Adjust top and left as per your UI requirements
    marginTop: 40,
    left: 20,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10, // Make sure it's above other elements
  },
});

export default Browse;
