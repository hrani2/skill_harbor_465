import React, {useState, useEffect} from 'react';
import { Image } from 'react-native'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView , ScrollView, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { queryTeamsWithJoinCode} from './firebase/utils';


const MyModal = ({modalVisible, setModalVisible, navigation}) => (
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
            <Icon name="times" size={25} color="#FFF"/> 
           </TouchableOpacity>
          </View>
          <View style={styles.lineone} />

         </View>
      </View>
    </Modal>
  );

  

const SearchOrg = ( {navigation, route}) => {
  const [TeamsWithJoinCode, setTeamsWithJoinCode] = useState([]);
  const { joinCode, email } = route.params;
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const updateSearchResults = (query) => {
    setSearchQuery(query);
  
    if (query.trim() === '') {
      setFilteredData(TeamsWithJoinCode);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = TeamsWithJoinCode.filter(team =>
        team.name.toLowerCase().includes(lowerCaseQuery) ||
        team.location.toLowerCase().includes(lowerCaseQuery) ||
        team.info.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredData(filtered);
    }
  };

  const fetchTeamsWithJoinCode = async () => {
    try {
      const teams = await queryTeamsWithJoinCode();
      const filteredTeams = teams.filter(team => team.join_code === joinCode);
      setTeamsWithJoinCode(filteredTeams);
      setFilteredData(teams);
    } catch (error) {
      console.error("Error fetching teams: ", error);
    }
  };
  // Fetch teams when the component mounts
  useEffect(() => {
    fetchTeamsWithJoinCode();
  }, []);
  useEffect(() => {
    fetchTeamsWithJoinCode();
  }, [joinCode]);

    return (
        <View style={styles.container}>
             <ScrollView>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder="Search teams"
            value={searchQuery}
            onChangeText={updateSearchResults}
          />
          <View style = {styles.searchicon}>
            <Icon name="search" size={20} color="#00507B" />
          </View>
        </View>

            <View style={styles.cardContainer}>
            {filteredData.map((team) => ( 
              <View style={styles.card}>
                <View style={styles.rowformat}>
                <Text style={styles.cardTitle}>{team.name}</Text>
                </View>
                <Text style={styles.summary}> {team.info} </Text>
              <TouchableOpacity style={styles.learnMoreButton} onPress={() =>  {navigation.navigate('LearnMore',  { team: team })}}>
                <Text style={styles.learnMoreText}>Learn More</Text>
              </TouchableOpacity>
              </View>
              ))}
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.floatButton} onPress={() => navigation.navigate('Home', {email: email})}>
          <View style = {styles.homeicon}>
            <Icon name="home" size={30} color="#FFF" />
          </View>
          </TouchableOpacity>
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
      backgroundColor: "#00507B",
      borderRadius: 20,
      width: "90%",
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
      alignSelf: 'center',
    },
    iconview: {
      flexDirection: 'row',
    },
    modalTitle: {
      fontSize: 21,
      color: '#FFF',
      fontFamily: 'RobotoSlab-Bold',
      letterSpacing: 1,
      top: 10,
    },
    reseticon: {
      right: 90,
      top: 16,
      color: "red",
      fontSize:15,
      alignSelf: 'center',
    },
    closeicon: {
      top: 10,
      left: 90,
      paddingBottom: -50,
    },
    lineone: {
      borderBottomWidth: 1,
      borderColor: '#808080',
      width: '100%', 
      top: 12,
    },
    container: {
      flex: 1,
      backgroundColor: '#00507B',
    },
    searchSection: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFF',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: "#FFF",
      margin: 10,
      top: 50,
      padding: 5,
      marginBottom: 60,
    },
    searchicon: {
        right: 10,
    },
    input: {
      flex: 1,
      padding: 10,
      fontFamily: 'RobotoSlab-Regular',
      // Other styling for the text input
    },
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 50,
      justifyContent: 'center',
      borderWidth: 2,
      width: 100,
      backgroundColor: "#FFF",
      borderColor:  "#FFF",
      borderRadius: 7,
    },
    filterIcon: {
        alignItems: 'center',
        alignSelf: 'center',
        left: 8,
    },
    filterText: {
        fontSize: 17,
        fontFamily: 'RobotoSlab-Regular',
        color: '#00507B',
        alignSelf: 'center',
        right: 5,
    },
    floatButton: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 320,
        top: 750,
    },
    cardContainer: {
      padding: 10,
      margintop: 40,
    },
    card: {
      backgroundColor: '#FFF',
      borderRadius: 10,
      padding: 20,
      marginBottom: 10,
      margintop: 40,
    },
    rowformat: {
      flexDirection: 'row',
    },
    profilePic: {
      width: 50, // Adjust the size as needed
      height: 50, // Adjust the size as needed
      borderRadius: 25, // Circular profile pictures
      marginRight: 10, // Add some spacing between the picture and the title
      alignSelf: 'flex-start',
    },
    cardTitle: {
      fontSize: 20,
      fontFamily: 'RobotoSlab-Bold',
      marginBottom: 10,
      top: 10,
      color: '#00507B',
      letterSpacing: 1,
    },
    summary: {
      fontSize: 16,
      fontFamily: 'RobotoSlab-Regular',
      marginBottom: 30,
      top: 20,
      color: '#00507B',
      alignSelf: 'center',
    },
    learnMoreButton: {
      backgroundColor: '#00507B',
      padding: 10,
      borderRadius: 7,
      alignSelf: 'center',
    },
    learnMoreText: {
      color: '#FFF',
      fontSize: 16,
      fontFamily: 'RobotoSlab-Regular',
    },
    homeicon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: "#00507B",
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
  export default SearchOrg;