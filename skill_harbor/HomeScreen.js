import React, {useState, useRef, useEffect } from 'react';
import { Image } from 'react-native'
import { queryUserByName , queryTeamByName } from './firebase/utils';
import { queryTeamsWithJoinCode } from './firebase/utils';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView , ScrollView, Modal, PanResponder, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to install this package

//Pop-up for Join a Team (asks to search all teams or Join Organization)
const MyModal = ({modalVisible, setModalVisible, navigation, openJoinModal, email}) => {
  const [helpModalVisible, sethelpModalVisible] = useState(false);

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
        <TouchableOpacity style = {styles.helpicon} onPress={() => sethelpModalVisible(true)}>
          <Icon name="question-circle" size={25}  color="#00507B"/> 
          <HelpModal 
              modalVisible={helpModalVisible} 
              setModalVisible={sethelpModalVisible} 
              navigation={navigation} 
          />

         </TouchableOpacity>


          <TouchableOpacity style = {styles.closeicon}
          onPress={() => setModalVisible(false)}>
          <Icon name="times" size={25} color="#00507B"/> 
         </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>  {navigation.navigate('Search', {email: email}); setModalVisible(false);}}>
          <Text style={styles.textStyle}>Search All Teams</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
            onPress= {openJoinModal}>
          <Text style={styles.textStyle}>Join Organization</Text>
          {/* <JoinOrg 
              modalVisible={joinModalVisible} 
              setModalVisible={setjoinModalVisible} 
              navigation={navigation} 
          /> */}
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);
  };

  //Pop-up for Join  Code 
  const JoinOrg = ({modalVisible, setModalVisible, navigation, onSubmitJoinCode, email}) => {
    const [code, setCode] = useState('');
    const [submissionSuccessful, setSubmissionSuccessful] = useState(false);
    const [filteredTeams, setFilteredTeams] = useState([]);


    const handleSubmit = async (code) => {
      try {
        const teamsWithCode = await queryTeamsWithJoinCode();
        console.log("Received code:", code);
        const filtered = teamsWithCode.filter(team => team.join_code === code);
        
        if (filtered.length > 0) {
          setFilteredTeams(filtered);
          setSubmissionSuccessful(true);
        } else {
          Alert.alert('No Teams Found', 'No teams found with the provided join code.');
          setSubmissionSuccessful(false);
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
        Alert.alert('Error', 'An error occurred while fetching teams.');
        setSubmissionSuccessful(false);
      }
  };

  useEffect(() => {
    if (submissionSuccessful) {
      navigation.navigate('SearchOrg', { joinCode: code, email: email });
      setModalVisible(false); // if you want to close the modal upon navigation
      setSubmissionSuccessful(false); // Reset the flag
    }
  }, [submissionSuccessful, filteredTeams, navigation]);
  
  useEffect(() => {
    return () => {
      setFilteredTeams([]);
      setSubmissionSuccessful(false);
    };
  }, []);

    return(
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView4}>
        <View style={styles.modalView4}>
  
            <TouchableOpacity style = {styles.closeicon4}
            onPress={() => setModalVisible(false)}>
            <Icon name="times" size={25} color="#00507B"/> 
           </TouchableOpacity>

           <View style={styles.textBoxContainer}>
            <Text style={styles.labelText}>
              Join Code{' '}
            </Text>
            <TextInput
              placeholder=" Enter Code"
              style={styles.input}
              value={code}
              onChangeText={setCode}
              placeholderTextColor = "#00507B"
            />
          </View>
          <TouchableOpacity onPress={() => {
              handleSubmit(code);
              // if (submissionSuccessful) {
              //   navigation.navigate('SearchOrg');
              //   setModalVisible(false);
              // }
            }}>
            <Text style={styles.next}>Next</Text>
             </TouchableOpacity>
             
        </View>
      </View>
    </Modal>
  );
    };

//Pop-up for help modal for search teams
const HelpModal = ({modalVisible, setModalVisible, navigation}) => {

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dy > 150) {
          setModalVisible(false);
        }
      },
    })
  ).current;

    return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(!modalVisible);
    }}>
    <View style={styles.bottomView}  {...panResponder.panHandlers}>
      <View style={styles.modalView3}>

        <Text style={styles.titlehelp}>HELP</Text>
        {/* <TouchableOpacity style = {styles.closeicon2}
          onPress={() => setModalVisible(false)}>
          <Icon name="times" size={25} color="#00507B"/> 
         </TouchableOpacity> */}
      
        <Text style={styles.summary}>
        <Text style={styles.bold}>Search all teams: </Text> This button is intended to help you quickly find and access 
        different teams within the platform. By clicking on it, you can search for teams 
        by keywords, which may include team names, projects, or topics.
        </Text>

        <Text style={styles.summary}>
        <Text style={styles.bold}>Join an organization: </Text>This button is a call-to-action for you to associate yourself 
        with a larger group or entity within our platform. By selecting this, you would initiate 
        the process to become part of an organization, which could involve entering an invitation code. You
        then can see all the teams within this certain organization. None of these teams will 
        be available if you click on Search all teams. 

        </Text>

       </View>
    </View>
  </Modal>
);
  };

  //Pop-up for help modal for create teams
  const HelpModal2 = ({modalVisible, setModalVisible, navigation}) => {

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
          if (gestureState.dy > 150) {
            setModalVisible(false);
          }
        },
      })
    ).current;
  
      return (
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.bottomView}  {...panResponder.panHandlers}>
        <View style={styles.modalView3}>
  
          <Text style={styles.titlehelp2}>HELP</Text>
          {/* <TouchableOpacity style = {styles.closeicon2}
            onPress={() => setModalVisible(false)}>
            <Icon name="times" size={25} color="#00507B"/> 
           </TouchableOpacity> */}
        
          <Text style={styles.summary2}>
          <Text style={styles.bold}>Create Teams: </Text> This button is intended to for you to create teams 
          within our platform. 
          </Text>
  
          <Text style={styles.summary2}>
          <Text style={styles.bold}>Create Join Code: </Text> This button is designed to generate a unique code that 
          students or members can use to join a specific class or organization within the platform. 
          This simplifies the process of adding new members to a group for an organization. When an administrator 
          or instructor clicks this button, the system automatically generates a unique alphanumeric code. This code 
          can then be shared with prospective members.
  
          </Text>
  
         </View>
      </View>
    </Modal>
  );
    };

const Create = ({modalVisible, setModalVisible, navigation, email}) => {
  const [helpModalVisible2, sethelpModalVisible2] = useState(false);

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
        <TouchableOpacity style = {styles.helpicon} onPress={() => sethelpModalVisible2(true)}>
          <Icon name="question-circle" size={25}  color="#00507B"/> 
          <HelpModal2 
              modalVisible={helpModalVisible2} 
              setModalVisible={sethelpModalVisible2} 
              navigation={navigation} 
          />
         </TouchableOpacity>
          <TouchableOpacity style = {styles.closeicon}
          onPress={() => setModalVisible(false)}>
          <Icon name="times" size={25} color="#00507B"/> 
         </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log({email});
            console.log('Create Team button pressed');
            navigation.navigate('CreateTeam', {email: email}); setModalVisible(false);}}>
          <Text style={styles.textStyle}>Create Teams</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log('Create Join Code button pressed');
            navigation.navigate('JoinCode', {email: email}); setModalVisible(false);}}>
          <Text style={styles.textStyle}>Create Join Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  );
};

const getMemberCountForTeam = (teamId) => {
  // Replace this with the actual logic to fetch the member count for the given teamId
  // For now, let's assume you have a hardcoded value
  return Math.floor(Math.random() * 10) + 1; // Replace this with the actual member count
};

const TeamCard = ({ teamName, teamLocation, teamCourse, memberCount, teamSizes, onPress }) => {
  // const memberCount = getMemberCountForTeam(teamName); // Use teamName or teamId as per your data structure

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.teamCard}>
        <Text style={styles.teamName}>{teamName}</Text>
        <Text style={styles.teamLocation}>{`${teamLocation}`}</Text>
        {memberCount === 1 ? (
          <Text style={styles.teamMembers}>{`${memberCount} member`}</Text>
        ) : (
          <Text style={styles.teamMembers}>{`${memberCount} members`}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};



const HomeScreen = ({text, request_count, invite_count, route, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);
  const [userTeams, setUserTeams] = useState([]);
  const [teamLocations, setTeamLocations] = useState([]);
  const [teamSizes, setTeamSizes] = useState([]);

  const openJoinModal = () => {
    setModalVisible(false);
    setIsJoinModalVisible(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user teams
        const user = await queryUserByName(email);
        console.log('Fetched user:', user);
  
        const teams = user.teams || [];
        console.log('User teams:', teams);
  
        setUserTeams(teams);
  
        // Fetch team information
        const teamInfoPromises = teams.map(async (teamName) => {
          const teamInfo = await queryTeamByName(teamName);
  
          // Check if teamInfo is not null
          if (teamInfo) {
            return {
              name: teamName,
              location: teamInfo.location,
              teamSize: teamInfo.team_size,
            };
          } else {
            // Handle the case where teamInfo is null (team not found)
            console.warn(`Team not found: ${teamName}`);
            return null;
          }
        });
  
        // Wait for all teamInfoPromises to resolve
        const teamInfoList = await Promise.all(teamInfoPromises);
  
        // Filter out null values (teams not found)
        const validTeamInfoList = teamInfoList.filter((info) => info !== null);
  
        // Extract and store team names, locations, and sizes in the state
        const teamNames = validTeamInfoList.map((teamInfo) => teamInfo.name);
        const teamLocations = validTeamInfoList.map((teamInfo) => teamInfo.location);
        const teamSizes = validTeamInfoList.map((teamInfo) => teamInfo.teamSize);
  
        console.log('Team Names:', teamNames);
        console.log('Locations:', teamLocations);
        console.log('Team Sizes:', teamSizes);
  
        setUserTeams(teamNames); // Update userTeams state with team names
        setTeamLocations(teamLocations);
        setTeamSizes(teamSizes); // Update teamSizes state
        // Additional logic or state updates can be added here if needed
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();

    // Set up auto-refresh every 5 seconds (adjust the interval as needed)
  const refreshInterval = setInterval(() => {
    fetchData();
  }, 5 * 1000); // 5 seconds in milliseconds

  // Clear the interval on component unmount to prevent memory leaks
  return () => clearInterval(refreshInterval);
  }, []); // Removed email from the dependency array
  
  
  


  

  const {email} = route.params || {}; 
  const profileScreen = async (email) => {
      user_dat = await queryUserByName(email);  
      try {
        console.log('Navigating to Profile...');
        navigation.navigate('Profile', {name: user_dat["name"], profile_email: email, 
                                        age: user_dat["age"], skills: user_dat["skills"]});
      } catch (error) {
        console.error('Navigation error:', error);
      }
  }

  const handleLogOut = () => {
    try {
      console.log('Navigating to Login Screen'); 
      Alert.alert(
        'Confirmation',
        'Are you sure you want to go to log out?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              console.log('Log out Button Pressed');
              navigation.navigate('Log In');
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Navigation Error: ', error); 
    }
  }

  const handleJoinCodeSubmit = async (code) => {
    try {
      const teamsWithCode = await queryTeamsWithJoinCode();
      console.log("here");

      const filteredTeams = teamsWithCode.filter(team => team.join_code === code);
      console.log("here");
      if (filteredTeams.length > 0) {
        navigation.navigate('SearchOrg', { joinCode: code });
      } else {
        // Handle no results found
        Alert.alert('No Teams Found', 'No teams found with the provided join code.');
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
      Alert.alert('Error', 'An error occurred while fetching teams.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.header}>
      <TouchableOpacity style={styles.headerIcon}
          onPress={() => profileScreen(email)}
      >
          <Icon name="user" size={30} color="#FFF"/>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Skill Harbor</Text>
      <TouchableOpacity style={styles.qeustionIcon}
          onPress={() => navigation.navigate('Help', {email: email})}
      >
          <Icon name="question" size={30} color="#FFF"/>
      </TouchableOpacity> 
      <TouchableOpacity style={styles.signOut}
          onPress={() => handleLogOut()}
      >
          <Icon name="sign-out" size={30} color="#FFF"/>
      </TouchableOpacity>
      </View>



      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} 
        onPress={() => setCreateModalVisible(true)}>
        {/* \\onPress={() => navigation.navigate('Create', {email: email})}> */}
          <View style={styles.icon}>
            <Icon name="plus" size={30} color="#FFF"/>
          </View>
          <Text style={styles.menuItemText}>CREATE</Text>
          <Create 
              modalVisible={createModalVisible} 
              setModalVisible={setCreateModalVisible} 
              navigation={navigation} 
              email={email} 
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ChooseTeam', { email: email })} >
          <View style={styles.icon}>
            <Icon name="book" size={30} color="#FFF" />
          </View>
          <Text style={styles.menuItemText}>PEOPLE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => setModalVisible(true)} >
          <View style={styles.icon}>
            <Icon name="group" size={30} color="#FFF" />
          </View>
          <Text style={styles.menuItemText}>TEAMS</Text>
          <MyModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        openJoinModal={openJoinModal}
        navigation={navigation}
        email={email}
      />

      <JoinOrg
        modalVisible={isJoinModalVisible}
        setModalVisible={setIsJoinModalVisible}
        onSubmitJoinCode={handleJoinCodeSubmit}
        navigation={navigation}
        email={email}
      />
        </TouchableOpacity>

      </View>


      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <View style={styles.lineone} />
          <Text style={styles.contentHeader}>NOTIFICATIONS</Text>
          <View style={styles.line} />
        </View>

      
        <TouchableOpacity style={styles.pillButton} onPress={() => navigation.navigate('SentRequests', {email: email})}> 
          <Text style={styles.pillButtonText}>Sent Requests</Text>
          {request_count  && request_count > 0 && (
            <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{request_count}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.pillButton} onPress={() => navigation.navigate('PendingInvites', {email: email})}>
          <Text style={styles.pillButtonText}>Pending Invites</Text>
          {invite_count && invite_count > 0 && (
            <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{invite_count}</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <View style={styles.lineone} />
          <Text style={styles.contentHeader}>CURRENT TEAMS</Text>
          <View style={styles.line} />
        </View>

        {/* Render team cards here */}

        {userTeams.map((team, index) => (
          <TeamCard
          key={index} // or use a unique identifier from your data, e.g., team.teamId
          teamName={team}
          teamLocation={teamLocations[index]}
            memberCount={teamSizes[index]}  // Pass team size to TeamCard
            onPress={() => console.log(`${team} pressed`)}
          />
        ))}
          {/* Add more TeamCard components for each team */}

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
    // justifyContent: 'space-between', // space out the children
    alignItems: 'center',// center children vertically
    paddingHorizontal: 15, // add some padding on the sides
    paddingTop: 55,
    backgroundColor: '#00507B', // background color for the header
  },
  headerIcon: {
    fontSize: 30, 
    color: "#FFF",
    marginLeft: 10,
  },
  qeustionIcon: {
    fontSize: 30, 
    color: "#FFF",
    marginLeft: 40,
  },
  signOut: {
    fontSize: 30, 
    color: "#FFF",
    marginLeft: 30,
  },
  headerTitle: {
    fontSize: 25, // size of the title text
    fontWeight: 'bold', // make the title bold
    alignSelf: 'center',
    color: "#FFF",
    fontFamily: 'RobotoSlab-ExtraBold',
    letterSpacing: 1,
    marginLeft: 90,
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
    marginBottom: 20, // Space between pill buttons
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    position: 'relative', // Added for absolute positioning of badge
  },
  pillButtonText: {
    alignSelf: 'flex-start',
    paddingTop: 8,
    justifyContent: "center",
    fontFamily: 'RobotoSlab-Medium',
    fontSize: 17,
    color: "#FFF",
  },
  badgeContainer: {
    backgroundColor: '#E38E20', // Change to your preferred badge color
    borderRadius: 12.5, // Half of the width and height to make it circular
    width: 25, // Badge width
    height: 25, // Badge height
    position: 'absolute', // Absolute positioning
    top: -10,
    right: 5, // Adjust as needed to position the badge to the right
  },
  badgeText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center', // Center the text horizontally
    textAlignVertical: 'center', // Center the text vertically
  },
  pillButtonIcon: {
    color: '#FFF',
    paddingHorizontal: 15,
  },
  bottomView: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 700,
    alignItems: 'center',
  },
  modalView3: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "80%",
    height: 500,
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
  closeicon2: {
    top: -115,
    left: 130,
    paddingBottom: -70,
  },
  summary: {
    top: -100,
    fontSize: 14,
    fontFamily: 'RobotoSlab-Regular',
    justifyContent: 'flex-end',
    width: "90%",
    marginBottom: 10,
    color: '#00507B',
  },
  bold: {
    fontFamily: 'RobotoSlab-Bold',
    color: '#00507B',
    fontSize: 16,
  }, 
  titlehelp: {
    top: -90,
    fontSize: 20,
    fontFamily: 'RobotoSlab-Bold',
    marginBottom: 10,
    color: '#00507B',
    alignSelf: 'center',
  },
  titlehelp2: {
    top: -100,
    fontSize: 20,
    fontFamily: 'RobotoSlab-Bold',
    marginBottom: 10,
    color: '#00507B',
    alignSelf: 'center',
  },
  summary2: {
    top: -110,
    fontSize: 14,
    fontFamily: 'RobotoSlab-Regular',
    justifyContent: 'flex-end',
    width: "90%",
    marginBottom: 10,
    color: '#00507B',
  },
  centeredView4: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView4: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "70%",
    height: 150,
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
  textBoxContainer: {
    marginBottom: 10,
    fontFamily: 'RobotoSlab-Regular',
    width: "60%",
  },
  labelText: {
    color: '#00507B', // White text color
    marginBottom: 5,
    fontFamily: 'RobotoSlab-Bold',
    letterSpacing: 1,
    alignSelf: 'center',
    fontSize: 25,
  },
  requiredStar: {
    color: 'red',
  },
  input: {
    backgroundColor: '#D3D3D3', // White text box background color
    padding: 10,
    borderRadius: 5,
    fontFamily: 'RobotoSlab-Regular',
    width: "100%",
    alignSelf: 'flex-start',
    borderColor: '#00507B',
    borderWidth: 1,
  },
  closeicon4: {
    top: 0,
    left: 110,
    paddingBottom: -70,
  },
  next: {
    fontFamily: 'RobotoSlab-Bold',
    fontSize: 19,
    alignSelf: 'flex-end',
    color: '#00507B',
    top: 2,
    left: 100,
  },
  teamCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    width: '90%',
    alignSelf: 'center', // Center the TeamCard horizontally
  },
  teamName: {
    fontFamily: 'RobotoSlab-Bold',
    fontSize: 18,
    color: '#00507B',
  },
  teamLocation: {
    fontFamily: 'RobotoSlab-Bold',
    fontSize: 14,
    color: '#707070',
  },
  teamMembers: {
    fontFamily: 'RobotoSlab-Regular',
    fontSize: 14,
    color: '#707070',
  },
});

export default HomeScreen;
