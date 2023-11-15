import React from 'react';
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

const Search = ( {navigation}) => {
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
        
        <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Filters</Text>
            <View style={styles.filterIcon}>
                <Icon name="sliders" size={20} color="#FFF" />
            </View>
          </TouchableOpacity>
          </ScrollView>
          <TouchableOpacity style={styles.floatButton} onPress={() => navigation.navigate('Home')}>
          <View style = {styles.homeicon}>
            <Icon name="home" size={40} color="#FFF" />
          </View>
          </TouchableOpacity>
        </View>
    );
  };
  
  const styles = StyleSheet.create({
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
    homeicon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#00507B",
        alignItems: 'center',
        justifyContent: 'center',
    },
});
  export default Search;