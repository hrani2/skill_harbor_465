import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SentRequests = ({ navigation }) => {

  // Your component logic goes here

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

      {/* Card 1 for Header 2 */}
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => {/* Handle card press for TO PEOPLE */}}>
          <Text style={styles.cardText}>Person Request 1</Text>
          {getStatusIcon('rejected')}
        </TouchableOpacity>
      </View>

      {/* Card 2 for Header 2 */}
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => {/* Handle card press for TO PEOPLE */}}>
          <Text style={styles.cardText}>Person Request 2</Text>
          {getStatusIcon('inProgress')}
        </TouchableOpacity>
      </View>

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
});

export default SentRequests;
