import React from 'react';
import { Image } from 'react-native'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView , ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to install this package
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({text, count, navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.header}>
      <TouchableOpacity style={styles.headerIcon}>
          <Icon name="user" size={30} color="#FFF"/> 
          </TouchableOpacity>
      <Text style={styles.headerTitle}>Skill Harbor</Text>
      <TouchableOpacity style={styles.headerIcon}>
          <Icon name="gear" size={30} color="#FFF"/> 
          </TouchableOpacity>
      </View>



      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} 
        onPress={() => navigation.navigate('Create')}>
          <View style={styles.icon}>
            <Icon name="plus" size={30} color="#FFF"/>
          </View>
          <Text style={styles.menuItemText}>CREATE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ChooseTeam')} >
          <View style={styles.icon}>
            <Icon name="book" size={30} color="#FFF" />
          </View>
          <Text style={styles.menuItemText}>BROWSE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Search')} >
          <View style={styles.icon}>
            <Icon name="search" size={30} color="#FFF" />
          </View>
          <Text style={styles.menuItemText}>JOIN</Text>
        </TouchableOpacity>

      </View>


      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <View style={styles.lineone} />
          <Text style={styles.contentHeader}>NOTIFICATIONS</Text>
          <View style={styles.line} />
        </View>

      
        <TouchableOpacity  style={styles.pillButton}>
          <Icon name="chevron-right" size={20} color="#000" style={styles.pillButtonIcon} />
          <Text style={styles.pillButtonText}>Sent Requests</Text>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity  style={styles.pillButton}>
        <Text style={styles.pillButtonText}>Pending Invites</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity>
        <View style={styles.pillButton} />
        </TouchableOpacity> */}

        <View style={styles.headerContainer}>
          <View style={styles.lineone} />
          <Text style={styles.contentHeader}>CURRENT TEAMS</Text>
          <View style={styles.line} />
        </View>

        {/* <TouchableOpacity>
        <View style={styles.pillButton} />
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={styles.pillButton} />
        </TouchableOpacity> */}

      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 120, // set the height of your header
    flexDirection: 'row', // layout children in a row
    justifyContent: 'space-between', // space out the children
    alignItems: 'center',// center children vertically
    paddingHorizontal: 15, // add some padding on the sides
    paddingTop: 55,
    backgroundColor: '#00507B', // background color for the header
  },
  headerIcon: {
    fontSize: 30, 
    color: "#FFF"
  },
  headerTitle: {
    fontSize: 25, // size of the title text
    fontWeight: 'bold', // make the title bold
    alignSelf: 'center',
    color: "#FFF",
    fontFamily: 'RobotoSlab-ExtraBold',
    letterSpacing: 1,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 50,
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center', // This ensures the icon is centered vertically  
  },
  icon: {
    justifyContent: 'center',// You must set a height for borderRadius to work as expected
    alignItems: 'center',
    width: 70,
    height: 70,
    borderColor: '#00507B',
    backgroundColor: '#00507B', 
    borderRadius: 35, 
  },
  menuItemText: {
    padding: 5,
    fontFamily: 'RobotoSlab-Medium',
    fontSize: 17,
    color: "#00507B",

  },
  content: {
    flex: 1,
    paddingTop: 20,
    // additional styling
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  lineone: {
    flex: 1,
    height: 2,
    backgroundColor: '#00507B', // Line color
    marginRight: -30,
    maxWidth: 40,
    marginLeft: 15,
  },
  contentHeader: {
    fontFamily: 'RobotoSlab-Black',
    fontSize: 17,
    color: "#00507B",
    paddingVertical: 10,
    letterSpacing: 1,
    alignSelf: 'flex-start',
    paddingHorizontal: 40,
    // additional styling
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#00507B', // Line color
    marginLeft: -30,
    marginRight: 15,
  },
  pillButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    height: 40, // Height of the pill-shaped buttons
    backgroundColor: '#00507B', // Button color
    borderRadius: 20, // Half of the height to make it pill-shaped
    marginBottom: 10, // Space between pill buttons
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  pillButtonText: {
    alignSelf: 'flex-start',
    paddingHorizontal: 30,
    paddingTop: 8,
    justifyContent: "center",
    fontFamily: 'RobotoSlab-Medium',
    fontSize: 17,
    color: "#FFF"
  },
  badgeContainer: {
    backgroundColor: '#007AFF', // Change to your preferred badge color
    borderRadius: 15, // Half of the width and height to make it circular
    width: 30, // Badge width
    height: 30, // Badge heigh
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
  },
  pillButtonIcon: {
    color: '#FFF',
    paddingHorizontal: 15,
  },

});

export default HomeScreen;