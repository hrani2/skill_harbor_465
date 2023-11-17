import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

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


  return (
    <View style={styles.container}>
      <Text style={styles.header}>{teamname}</Text>
      <Text style={styles.subheader}>Potential matches:</Text>
      <ScrollView style={styles.scrollView}>
        {matches.map((match, index) => (
          <TouchableOpacity key={index} style={styles.item} onPress={() => navigation.navigate('Profile', { name: match.name,  age: 20, location: 'Champaign', email: 'abc@illinois.edu', school: 'UIUC'})} >
            <Text style={styles.name}>{match.name}</Text>
            <Text style={styles.rating}>{match.rating}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.subheader}>Recommended:</Text>
      <View style={styles.recommendedContainer}>
        {recommended.map((recommendation, index) => (
          <TouchableOpacity key={index} style={styles.recommendation}onPress={() => navigation.navigate('Profile', { name: recommendation.name,  age: 20, location: 'Champaign', email: 'abc@illinois.edu', school: 'UIUC'})} >
            <Text style={styles.name}>{recommendation.name}</Text>
            <Text style={styles.rating}>{recommendation.rating}</Text>
          </TouchableOpacity>
        ))}
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
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 16,
    color: 'black',
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginLeft: 10,
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
  },
  // You can add more styles for navigation and other controls as needed
});

export default Browse;
