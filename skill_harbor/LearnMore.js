import React, {useState} from 'react';
import { Image } from 'react-native'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView , ScrollView, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Explosion from 'react-native-confetti-cannon'; 

const MyModal = ({modalVisible, setModalVisible, navigation}) => {
    const [secondModalVisible, setSecondModalVisible] = useState(false);

  const handleYesPress = () => {
    // Close the first modal and open the second modal
    setModalVisible(false);
    setSecondModalVisible(true);
  };
  return (
    <>
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
            <TouchableOpacity style = {styles.closeicon}
            onPress={() => setModalVisible(false)}>
            <Icon name="times" size={25} color="#00507B"/> 
           </TouchableOpacity>
          </View>
          <Text style={styles.question}>Are you sure you want to send a request to Font-astic Six?</Text>

          <View style={styles.answerview}>
            <TouchableOpacity style = {styles.noback}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.answer}>NO, GO BACK</Text>
           </TouchableOpacity>
           <TouchableOpacity style = {styles.yes} onPress={handleYesPress}>
            <Text style={styles.answer}>YES</Text>
           </TouchableOpacity>
          </View>
         </View>
      </View>
    </Modal>

    {/* Second modal */}
    <Modal
        animationType="fade"
        transparent={true}
        visible={secondModalVisible}
        onRequestClose={() => {
          setSecondModalVisible(!secondModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView2}>
            <Text style={styles.paragraph}>Thank you for your interest in joining Font-astic Six. 
            Your request has been successfully sent. You can click on the pending requests tab on the home page to see your pending requests. 
</Text>
            <TouchableOpacity
              style={styles.close}
              onPress={() => navigation.navigate('Home')}>
              <Text style={styles.home}>GO HOME</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const LearnMore = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.rowformat}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/50' }} // Replace 
                    style={styles.profilePic}
                  />
                <Text style={styles.cardTitle}>Font-astic Six</Text>
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
            <Text style={styles.tag}>Python</Text>
            <Text style={styles.tag}>C++</Text>
            <Text style={styles.tag}>Kotlin</Text>
            <Text style={styles.tag}>Java</Text>
            <Text style={styles.tag}>UI/UX</Text>
          </View>
        </View>
  
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location:</Text>
          <View style={styles.tagContainer}>
            <Text style={styles.tag}>Champaign, Illinois</Text>
          </View>
        </View>
  
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Info:</Text>
          {/* Placeholder for additional info */}
          <View style={styles.infoPlaceholder} />
        </View>
  
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>REQUEST</Text>
          <MyModal 
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              navigation={navigation}
          />
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity style={styles.floatButton} onPress={() => navigation.navigate('Home')}>
          <View style = {styles.homeicon}>
            <Icon name="home" size={40} color="#00507B" />
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
        width: "60%",
        height: 210,
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
        width: '80%',
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
    infoPlaceholder: {
      height: 60, // Adjust as needed
      backgroundColor: '#00507B', // Placeholder color
      marginTop: 10,
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