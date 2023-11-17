import React from 'react';
import { Alert, View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const Browse = ({ route, navigation }) => {
  // This data would typically come from your application's state or props
  const { teamname } = route.params;
  const matches = [
    { name: 'Ric', rating: 8.8 },
    { name: 'Dawn', rating: 7.8 },
    { name: 'Mirra', rating: 7.6 },
  ];

  const recommended = [
    { name: 'Adelia', rating: 8.6 },
    { name: 'Jason', rating: 8.4 },
  ];

  const confirmAddition = (name) => {
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
            additionSuccessful(name); // Call another function to show the second alert
          }
        }
      ]
    );
  };

  const additionSuccessful = (name) => {
    Alert.alert(
      "Success",
      `You have added ${name} successfully!`,
      [
        { text: "OK", onPress: () => console.log('OK Pressed') }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{teamname}</Text>
      <Text style={styles.subheader}>Potential matches:</Text>
      <ScrollView style={styles.scrollView}>
        {matches.map((match, index) => (
          <TouchableOpacity key={index} style={styles.item} onPress={() => navigation.navigate('Profile', { name: match.name,  age: 20, location: 'Champaign', email: 'abc@illinois.edu', school: 'UIUC'})} >
            <Text style={styles.name}>{match.name}</Text>
            <View style={styles.matchInfo}>
              <Text style={styles.rating}>{match.rating}</Text>
              <TouchableOpacity onPress={() => confirmAddition(match.name)}>
                <Icon name="check" size={30} color="green" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.subheader}>Recommended:</Text>
      <View style={styles.recommendedContainer}>
        <ScrollView horizontal={true}
    showsHorizontalScrollIndicator={false}
    style={styles.scrollView}
    contentContainerStyle={styles.scrollViewContent}>
          {recommended.map((recommendation, index) => (
            <TouchableOpacity key={index} style={styles.recommendation}onPress={() => navigation.navigate('Profile', { name: recommendation.name,  age: 20, location: 'Champaign', email: 'abc@illinois.edu', school: 'UIUC'})} >
              <Text style={styles.name}>{recommendation.name}</Text>
              <View style={styles.matchInfo}>
                <Text style={styles.rating}>{recommendation.rating}</Text>
                <TouchableOpacity onPress={() => confirmAddition(recommendation.name)}>
                  <Icon name="check" size={30} color="green" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {/* Add navigation and other controls as necessary */}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    padding: 20,
  },
  subheader: {
    fontSize: 18,
    color: 'white',
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
    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 20,
    color: 'black',
  },
  rating: {
    fontSize: 20,
    fontWeight: 'bold',
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
    backgroundColor: 'white',
    borderRadius: 5,
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
});

export default Browse;
