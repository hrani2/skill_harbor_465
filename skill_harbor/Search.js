import React, {useState, useEffect} from 'react';
import { Image } from 'react-native'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView , ScrollView, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { queryTeamsWithoutJoinCode} from './firebase/utils';
import { Picker } from '@react-native-picker/picker';



const MyModal = ({modalVisible, setModalVisible, navigation, onApplyFilter}) => {
  const [selectedCities, setSelectedCities] = useState({});

  const cities = ['Champaign', 'Naperville', 'Remote', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'San Francisco'];

  const handleReset = () => {
    setSelectedCities({});
    onApplyFilter([]);
  };

  const toggleCitySelection = (city) => {
    setSelectedCities(prevCities => ({
      ...prevCities,
      [city]: !prevCities[city]
    }));
  };

  const handleApplyFilter = () => {
    onApplyFilter(Object.keys(selectedCities).filter(city => selectedCities[city]));
    setModalVisible(false);
  };

  return (
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
          <TouchableOpacity onPress={handleReset}>
            <Text style={styles.reseticon}>Reset</Text> 
           </TouchableOpacity>
          <Text style={styles.modalTitle}>FILTERS</Text>
            <TouchableOpacity style = {styles.closeicon}
            onPress={() => setModalVisible(false)}>
            <Icon name="times" size={25} color="#FFF"/> 
           </TouchableOpacity>
          </View>
          <View style={styles.lineone} />

        <View style={styles.headerContainer}>
          <View style={styles.linetwo} />
          <Text style={styles.contentHeader}>Location</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.section}>
            <View style={styles.tagContainer}>
              {cities.map(city => (
                <TouchableOpacity key={city} onPress={() => toggleCitySelection(city)}>
                  <Text style={selectedCities[city] ? styles.selectedTag : styles.tag}>{city}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <TouchableOpacity onPress={handleApplyFilter}>
            <Text style = {styles.button}>Apply Filter</Text>
          </TouchableOpacity>
         </View>
      </View>
    </Modal>
  );
    };

  

const Search = ( {navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [teamsWithoutJoinCode, setTeamsWithoutJoinCode] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleApplyFilter = (selectedCities) => {
    if (selectedCities.length === 0) {
      setFilteredData(teamsWithoutJoinCode); // Reset to show all teams
    } else {
      const filtered = teamsWithoutJoinCode.filter(team => 
        selectedCities.some(city => 
          team.location.toLowerCase().includes(city.toLowerCase())
        )
      );
      setFilteredData(filtered);
    }
  };

  const updateSearchResults = (query) => {
    setSearchQuery(query);
  
    if (query.trim() === '') {
      setFilteredData(teamsWithoutJoinCode);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = teamsWithoutJoinCode.filter(team =>
        team.name.toLowerCase().includes(lowerCaseQuery) ||
        team.location.toLowerCase().includes(lowerCaseQuery) ||
        team.info.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredData(filtered);
    }
  };

  const fetchTeamsWithoutJoinCode = async () => {
    try {
      const teams = await queryTeamsWithoutJoinCode();
      setTeamsWithoutJoinCode(teams);
      setFilteredData(teams);
    } catch (error) {
      console.error("Error fetching teams: ", error);
    }
  };

  // Fetch teams when the component mounts
  useEffect(() => {
    fetchTeamsWithoutJoinCode();
  }, []);

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
        
        <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.filterText}>Filters</Text>
            <View style={styles.filterIcon}>
                <Icon name="sliders" size={20} color="#00507B" />
            </View>
            <MyModal 
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              onApplyFilter={handleApplyFilter}
          />
          </TouchableOpacity>

            <View style={styles.cardContainer}>
            {filteredData.map((team) => ( 
              <View style={styles.card} key={team.id}>
                <View style={styles.rowformat}>
                <Text style={styles.cardTitle}>{team.name}</Text>
                </View>
                <Text style={styles.summary}> {team.info} </Text>
              <TouchableOpacity style={styles.learnMoreButton} onPress={() => { 
                console.log("Navigating with team:", team);
                navigation.navigate('LearnMore', { team: team }) }}>
                <Text style={styles.learnMoreText}>Learn More</Text>
              </TouchableOpacity>
              </View>
               ))}
              </View>
          </ScrollView>
          <TouchableOpacity style={styles.floatButton} onPress={() => navigation.navigate('Home')}>
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
    },
    modalView: {
      backgroundColor: "#00507B",
      borderRadius: 20,
      width: "90%",
      height: 320,
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
        color: '#00507B',
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
    },
    card: {
      backgroundColor: '#FFF',
      borderRadius: 10,
      padding: 20,
      marginBottom: 10,
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  linetwo: {
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
  tagContainer: {
    top: -30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
    borderRadius: 7,
  },
  tag: {
    backgroundColor: '#B2BCC1', // Adjust your color
    borderRadius: 7,
    padding: 8,
    margin: 4,
    color: '#00507B',
    fontFamily: 'RobotoSlab-Regular',
    textTransform: 'uppercase',
  },
  selectedTag: {
    backgroundColor: 'green', // Adjust your color
    borderRadius: 7,
    padding: 8,
    margin: 4,
    color: 'white',
    fontFamily: 'RobotoSlab-Regular',
  },
  button: {
    backgroundColor: 'black', // Adjust your color
    borderRadius: 7,
    padding: 8,
    margin: 4,
    color: 'white',
    fontFamily: 'RobotoSlab-Regular',
    top: -25,
  },
});
  export default Search;