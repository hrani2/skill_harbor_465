import React, {useState} from 'react';
import { Image } from 'react-native'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView , ScrollView, Modal, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Explosion from 'react-native-confetti-cannon'; 
import { queryUserByName, updatePendingInvitesTeam, updateRequestsUserSentTeam } from './firebase/utils';

const MyModal = ({modalVisible, setModalVisible, navigation, team, email}) => {
  console.log("email: ", email); 
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView2}>
            <Text style={styles.paragraph}>Thank you for your interest in joining {team.name}. 
            Your request has been successfully sent. You can click on the pending requests tab on the home page to see your search requests. 
            </Text>
            <TouchableOpacity
              style={styles.close}
              onPress={() => navigation.navigate('Home', {email: email})}>
              <Text style={styles.home}>GO HOME</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  );
}

const LearnMore = ({route, navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);

    console.log("Received in Learn More:", route.params);
    const team = route.params?.team;
    const email = route.params?.email; 
    const Request = async () => {
        Alert.alert(
          'Confirmation',
          `Are you sure you want to a send a request to ${team.name}?`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: async () => {

                // Add any necessary logic before navigating
                const userInfo = await queryUserByName(email); 
                updatePendingInvitesTeam(team.name, email, userInfo.name);
                updateRequestsUserSentTeam(team.name, email);
                setModalVisible(true);
              },
            },
          ],
          { cancelable: false }
        );
      }


    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.rowformat}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/50' }} // Replace 
                    style={styles.profilePic}
                  />
                <Text style={styles.cardTitle}>{team.name}</Text>
                </View>
  
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current team members:</Text>
          <View style={styles.tagContainer}>
            <Text style={styles.tag}>Akanksha</Text>
            <Text style={styles.tag}>Havish</Text>
            <Text style={styles.tag}>Ric</Text>
          </View>
        </View>
  
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills Desired:</Text>
          <View style={styles.tagContainer}>
          {team.skills && team.skills.length > 0 ? (
      team.skills.map((skill, index) => (
        <Text key={index} style={styles.tag}>{skill}</Text>
      ))
    ) : (
      <Text style={styles.tag}>No skills specified</Text>
    )}
          </View>
        </View>
  
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location:</Text>
          <View style={styles.tagContainer}>
            <Text style={styles.tag}>{team.location}</Text>
          </View>
        </View>
  
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Info:</Text>
          <Text style={styles.summary}> {team.info} </Text>
          <View style={styles.infoPlaceholder} />
        </View>
  
        <TouchableOpacity style={styles.button} onPress={(Request)}>
          <Text style={styles.buttonText}>REQUEST</Text>
          <MyModal 
          modalVisible={modalVisible} 
          setModalVisible={setModalVisible}
           navigation={navigation} 
           team = {team}
           email = {email}/>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity style={styles.floatButton} onPress={() => navigation.navigate('Home')}>
          <View style = {styles.homeicon}>
            <Icon name="home" size={30} color="#00507B" />
          </View>
          </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF', // Adjust your color
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        width: "60%",
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
        alignSelf: 'center',
      },
      iconview: {
        flexDirection: 'row',
      },
      modalTitle: {
        fontSize: 21,
        color: '#00507B',
        fontFamily: 'RobotoSlab-Bold',
        letterSpacing: 1,
        top: 10,
      },
      closeicon: {
        top: 10,
        left: 100,
        paddingBottom: -50,
      },
      question: {
        color: '#00507B',
        fontFamily: 'RobotoSlab-Regular',
        width: '80%',
        alignSelf: 'center',
        paddingTop: 14,
        fontSize: 15,
      }, 
      answerview: {
        flexDirection: 'row',
        paddingTop: 20,
        justifyContent: 'space-between',
      }, 
      noback: {
        right: 40,
      },
      yes: {
        left: 40,
      },
      answer: {
        color: '#00507B',
        fontFamily: 'RobotoSlab-Bold',
        alignSelf: 'center',
      }, 
      modalView2: {
        backgroundColor: "white",
        borderRadius: 20,
        width: "90%",
        height: 140,
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
      paragraph : {
        color: '#00507B',
        fontFamily: 'RobotoSlab-Regular',
        width: '90%',
        alignSelf: 'center',
        paddingTop: 14,
        fontSize: 15,
      }, 
      home: {
        color: '#00507B',
        fontFamily: 'RobotoSlab-Bold',
        alignSelf: 'center',
        paddingTop: 14,
        fontSize: 18,
      },
    rowformat: {
        flexDirection: 'row',
        paddingTop: 60,
        left: 20,
      },
      profilePic: {
        width: 80, // Adjust the size as needed
        height: 80, // Adjust the size as needed
        borderRadius: 40, // Circular profile pictures
        marginRight: 10, // Add some spacing between the picture and the title
        alignSelf: 'flex-start',
      },
      cardTitle: {
        fontSize: 30,
        fontFamily: 'RobotoSlab-Bold',
        marginBottom: 10,
        top: 20,
        color: '#00507B',
        letterSpacing: 1,
        alignContent: "center",
      },
    section: {
      marginVertical: 10,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 18,
      color: '#00507B',
      fontFamily: 'RobotoSlab-Medium',
    },
    tagContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 10,
      borderRadius: 7,
    },
    tag: {
      backgroundColor: '#B2BCC1', // Adjust your color
      borderRadius: 7,
      padding: 8,
      margin: 4,
      color: '#00507B',
      fontFamily: 'RobotoSlab-Regular',
    },
    summary: {
        fontSize: 16,
        fontFamily: 'RobotoSlab-Regular',
        marginBottom: 30,
        top: 15,
        color: '#00507B',
        alignSelf: 'center',
      },
    button: {
      backgroundColor: '#097969', // Adjust your button color
      borderRadius: 7,
      padding: 15,
      margin: 20,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontFamily: 'RobotoSlab-Bold',
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
    homeicon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#FFF",
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
  
  
  export default LearnMore;