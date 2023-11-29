import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PendingInvites = ({ navigation }) => {

  // Your component logic goes here

  const handleCheckPress = (type, inviteType) => {
    // Handle check press based on the type and inviteType
    console.log(`Check pressed for ${type} - ${inviteType}`);
  };

  const handleCrossPress = (type, inviteType) => {
    // Handle cross press based on the type and inviteType
    console.log(`Cross pressed for ${type} - ${inviteType}`);
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
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => {/* Handle card press for FROM TEAMS */}}>
          <TouchableOpacity onPress={() => handleCrossPress('Team', 'Invite 1')}>
            <Icon name="times" size={30} color="red" />
          </TouchableOpacity>
          <Text style={styles.cardText}>Team Invite 1</Text>
          <TouchableOpacity onPress={() => handleCheckPress('Team', 'Invite 1')}>
            <Icon name="check" size={30} color="green" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      {/* Card 2 for Header 1 */}
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => {/* Handle card press for FROM TEAMS */}}>
          <TouchableOpacity onPress={() => handleCrossPress('Team', 'Invite 2')}>
            <Icon name="times" size={30} color="red" />
          </TouchableOpacity>
          <Text style={styles.cardText}>Team Invite 2</Text>
          <TouchableOpacity onPress={() => handleCheckPress('Team', 'Invite 2')}>
            <Icon name="check" size={30} color="green" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      {/* Header 2 */}
      <View style={styles.headerContainer}>
        <View style={styles.lineone} />
        <Text style={styles.contentHeader}>FROM PEOPLE</Text>
        <View style={styles.line} />
      </View>

      {/* Card 1 for Header 2 */}
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => {/* Handle card press for FROM PEOPLE */}}>
          <TouchableOpacity onPress={() => handleCrossPress('Person', 'Invite 1')}>
            <Icon name="times" size={30} color="red" />
          </TouchableOpacity>
          <Text style={styles.cardText}>Person Invite 1</Text>
          <TouchableOpacity onPress={() => handleCheckPress('Person', 'Invite 1')}>
            <Icon name="check" size={30} color="green" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      {/* Card 2 for Header 2 */}
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => {/* Handle card press for FROM PEOPLE */}}>
          <TouchableOpacity onPress={() => handleCrossPress('Person', 'Invite 2')}>
            <Icon name="times" size={30} color="red" />
          </TouchableOpacity>
          <Text style={styles.cardText}>Person Invite 2</Text>
          <TouchableOpacity onPress={() => handleCheckPress('Person', 'Invite 2')}>
            <Icon name="check" size={30} color="green" />
          </TouchableOpacity>
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

export default PendingInvites;
