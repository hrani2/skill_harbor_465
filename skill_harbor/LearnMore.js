import React, {useState} from 'react';
import { Image } from 'react-native'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView , ScrollView, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const LearnMore = () => {
    return (
        <ScrollView style={styles.container}>

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
  
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>REQUEST</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF', // Adjust your color
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
  });
  
  
  export default LearnMore;