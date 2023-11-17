import React, {useState} from 'react';
import { Image } from 'react-native'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView , ScrollView, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to install this package

//Pop-up for Join a Team (asks to search all teams or Join Organization)
const MyModal = ({modalVisible, setModalVisible, navigation}) => {

  return(
  <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(!modalVisible);
    }}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.iconview}>
        <TouchableOpacity style = {styles.helpicon}>
          <Icon name="question-circle" size={25}  color="#00507B"/> 
         </TouchableOpacity>
          <TouchableOpacity style = {styles.closeicon}
          onPress={() => setModalVisible(false)}>
          <Icon name="times" size={25} color="#00507B"/> 
         </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>  {navigation.navigate('Search'); setModalVisible(false);}}>
          <Text style={styles.textStyle}>Search All Teams</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {/* Your action for second option */}}>
          <Text style={styles.textStyle}>Join Organization</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);
  }

const JoinOrg = ({modalVisible, setModalVisible, navigation}) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(!modalVisible);
    }}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>

        <View style={styles.iconview}>
        <TouchableOpacity>
          <Text style={styles.reseticon}>Reset</Text> 
         </TouchableOpacity>
        <Text style={styles.modalTitle}>FILTERS</Text>
          <TouchableOpacity style = {styles.closeicon}
          onPress={() => setModalVisible(false)}>
          <Icon name="times" size={25} color="#00507B"/> 
         </TouchableOpacity>
        </View>
        <View style={styles.lineone} />

       </View>
    </View>
  </Modal>
);


const HomeScreen = ({text, count, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
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

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Browse')} >
          <View style={styles.icon}>
            <Icon name="book" size={30} color="#FFF" />
          </View>
          <Text style={styles.menuItemText}>BROWSE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => setModalVisible(true)} >
          <View style={styles.icon}>
            <Icon name="search" size={30} color="#FFF" />
          </View>
          <Text style={styles.menuItemText}>JOIN</Text>
          <MyModal 
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              navigation={navigation}
          />
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
          <Icon name="chevron-right" size={20} color="#000" style={styles.pillButtonIcon} />
          <Text style={styles.pillButtonText}>Pending Invites</Text>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "80%",
    height: 170,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 9,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    borderRadius: 15,
    backgroundColor: '#00507B',
    width: "80%",
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,

  },
  iconview: {
    flexDirection: 'row',
  },
  helpicon: {
    top: -5,
    right: 120,
    paddingBottom: -70,
  },
  closeicon: {
    top: -5,
    left: 120,
    paddingBottom: -70,
  },
  textStyle: {
    color: "white",
    fontFamily: 'RobotoSlab-Medium',
    fontSize: 21,
    textAlignVertical: 'center',
    textAlign: 'center',
    alignContent: 'center',
  },
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
    right: 6,
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