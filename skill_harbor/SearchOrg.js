import React, {useState} from 'react';
import { Image } from 'react-native'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView , ScrollView, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 


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

  

const SearchOrg = ( {navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.container}>
             <ScrollView>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.input}
            placeholder="Search teams"
            // onChangeText
          />
          <View style = {styles.searchicon}>
            <Icon name="search" size={20} color="#00507B" />
          </View>
        </View>
        
        <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.filterText}>Filters</Text>
            <View style={styles.filterIcon}>
                <Icon name="sliders" size={20} color="#FFF" />
            </View>
            <MyModal 
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
          />
          </TouchableOpacity>

            <View style={styles.cardContainer}>

              <View style={styles.card}>
                <View style={styles.rowformat}>
                  <Image
                    source={{ uri: 'https://via.placeholder.com/50' }} // Replace 
                    style={styles.profilePic}
                  />
                <Text style={styles.cardTitle}>Font-astic Six</Text>
                </View>
                <Text style={styles.summary}> We are a dynamic group dedicated 
                to developing a groundbreaking team-forming app, designed to transform the 
                way teams are created and managed. With a focus on leveraging advanced algorithms 
                and user-friendly interfaces, this app seeks to facilitate the team formation process 
                by intelligently matching individuals based on their skills, experience, and 
                interpersonal compatibility. Currently, Font-astic Six is on the lookout for
                enthusiastic members who possess expertise in UI/UX design. </Text>
              <TouchableOpacity style={styles.learnMoreButton} onPress={() =>  {navigation.navigate('LearnMore')}}>
                <Text style={styles.learnMoreText}>Learn More</Text>
              </TouchableOpacity>
              </View>

              {/* Card 2 */}
              <View style={styles.card}>
                <View style={styles.rowformat}>
                  <Image
                    source={{ uri: 'https://via.placeholder.com/50' }} // Replace 
                    style={styles.profilePic}
                  />
                  <Text style={styles.cardTitle}>UI Utopia</Text>
              </View>
              <Text style={styles.summary}> We are an energetic and inventive collective, committed to pioneering a 
              unique web application that promises to redefine user experience in a distinctive domain. Our mission 
              centers on harnessing cutting-edge technology and intuitive design principles to deliver a web app that 
              not only engages but also inspires its users.  We are currently expanding our talented team and are eager to welcome 
              individuals with a passion for web development and a flair for creative problem-solving. Our ideal candidates are those 
              who are skilled in modern web technologies and have a keen eye for aesthetic and functional design. </Text>
              <TouchableOpacity style={styles.learnMoreButton} onPress={() =>  {navigation.navigate('LearnMore')}}>
                <Text style={styles.learnMoreText}>Learn More</Text>
              </TouchableOpacity>
              </View>

              {/* Card 3 */}
              <View style={styles.card}>
                <View style={styles.rowformat}>
                  <Image
                    source={{ uri: 'https://via.placeholder.com/50' }} // Replace 
                    style={styles.profilePic}
                  />
                <Text style={styles.cardTitle}>Vision</Text>
                </View>
                <Text style={styles.summary}> We are a dynamic group dedicated 
                to developing a groundbreaking team-forming app, designed to transform the 
                way teams are created and managed. With a focus on leveraging advanced algorithms 
                and user-friendly interfaces, this app seeks to facilitate the team formation process 
                by intelligently matching individuals based on their skills, experience, and 
                interpersonal compatibility. Currently, Font-astic Six is on the lookout for
                enthusiastic members who possess expertise in UI/UX design. </Text>
              <TouchableOpacity style={styles.learnMoreButton} onPress={() =>  {navigation.navigate('LearnMore')}}>
                <Text style={styles.learnMoreText}>Learn More</Text>
              </TouchableOpacity>
              </View>

              {/* Card 4 */}
              <View style={styles.card}>
                <View style={styles.rowformat}>
                  <Image
                    source={{ uri: 'https://via.placeholder.com/50' }} // Replace 
                    style={styles.profilePic}
                  />
                <Text style={styles.cardTitle}>0(1)</Text>
                </View>
                <Text style={styles.summary}> We are a dynamic group dedicated 
                to developing a groundbreaking team-forming app, designed to transform the 
                way teams are created and managed. With a focus on leveraging advanced algorithms 
                and user-friendly interfaces, this app seeks to facilitate the team formation process 
                by intelligently matching individuals based on their skills, experience, and 
                interpersonal compatibility. Currently, Font-astic Six is on the lookout for
                enthusiastic members who possess expertise in UI/UX design. </Text>
              <TouchableOpacity style={styles.learnMoreButton} onPress={() =>  {navigation.navigate('LearnMore')}}>
                <Text style={styles.learnMoreText}>Learn More</Text>
              </TouchableOpacity>
              </View>

            </View>
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
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      backgroundColor: "white",
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
      color: '#00507B',
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
    },
    searchSection: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFF',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: "#00507B",
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
      backgroundColor: "#00507B",
      borderColor:  "#00507B",
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
        color: 'white',
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
      backgroundColor: '#00507B',
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
      color: '#FFF',
      letterSpacing: 1,
    },
    summary: {
      fontSize: 16,
      fontFamily: 'RobotoSlab-Regular',
      marginBottom: 30,
      top: 20,
      color: '#FFF',
      alignSelf: 'center',
    },
    learnMoreButton: {
      backgroundColor: '#FFF',
      padding: 10,
      borderRadius: 7,
      alignSelf: 'center',
    },
    learnMoreText: {
      color: '#00507B',
      fontSize: 16,
      fontFamily: 'RobotoSlab-Regular',
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
  export default SearchOrg;