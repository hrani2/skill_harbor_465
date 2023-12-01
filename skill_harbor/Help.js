import React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Help = ({ navigation, route }) => {
    const { email } = route.params;

    const handleHomePress = () => {
        try { 
          console.log("email: ", email);
          navigation.navigate('Home', {email: email});
        } catch (e) {
          console.log("navigation error: ", e); 
        }
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalHeader, setModalTitle] = useState(null);

    // Function to handle feature detail navigation or display
    const handleFeaturePress = (feature) => {
        let content = null;
        setModalTitle(feature);
        switch (feature) {
            case 'Teams':
                content = (
                    <View>
                        <Text style={styles.modalText}>
                            <Text style={styles.bold}>Search all teams: </Text>
                            This button is intended to help you quickly find and access different teams within the platform. By clicking on it, you can search for teams by keywords, which may include team names, projects, or topics.
                        </Text>
                        <Text style={styles.modalText}>
                            <Text style={styles.bold}>Join an organization: </Text>
                            This button is a call-to-action for you to associate yourself with a larger group or entity within our platform. By selecting this, you would initiate the process to become part of an organization, which could involve entering an invitation code. You then can see all the teams within this certain organization. None of these teams will be available if you click on Search all teams.
                        </Text>
                    </View>
                );
                break;
            // Add cases for other features as needed
            case 'Create':
                content = (
                    <View>
                        <Text style={styles.modalText}>
                            <Text style={styles.bold}>Create teams: </Text>
                            This button is intended to for you to create teams within our platform.
                        </Text>
                        <Text style={styles.modalText}>
                            <Text style={styles.bold}>Create Join Code: </Text>
                            This button is designed to generate a unique code that 
                            students or members can use to join a specific class or organization within the platform. 
                            This simplifies the process of adding new members to a group for an organization. When an administrator 
                            or instructor clicks this button, the system automatically generates a unique alphanumeric code. This code 
                            can then be shared with prospective members.
                        </Text>
                    </View>
                );
                break;
            case 'People':
                content = (
                    <View>
                        <Text style={styles.modalText}>
                        <Text style={styles.bold}>In this feature, you have the capability to discover and invite potential new members to any team you're part of. </Text>
                        </Text>
                        <Text style={styles.modalText}>
                            Begin by selecting a team you belong to. Once you've chosen a team, you'll be presented with a list of prospective members. To invite someone to your team, simply tap the check mark beside their name.
                        </Text>
                        <Text style={styles.modalText}>
                            Each candidate is accompanied by a rating that reflects the alignment of their skills with your team's needs. For a more comprehensive understanding of their qualifications, you can visit each individual's profile page for additional details.
                        </Text>
                    </View>
                );
                break;
            case 'Sent Requests':
                content = (
                    <View>
                        <Text style={styles.modalText}>
                            In this feature, you are able to see all the requests sent by yourself.
                        </Text>
                        <Text style={styles.modalText}>
                            <Text style={styles.bold}>To Teams: </Text>
                            These are the requests that you sent to the teams you want to join in "Teams" feature.
                        </Text>
                        <Text style={styles.modalText}>
                            <Text style={styles.bold}>To People: </Text>
                            These are the requests that you sent to the people who you want them to join your teams in "People" feature.
                        </Text>
                    </View>
                );
                break;
            case 'Pending Invites':
                content = (
                    <View>
                        <Text style={styles.modalText}>
                            In this feature, you are able to see all the invites that wait for you to accept or reject.
                        </Text>
                        <Text style={styles.modalText}>
                            <Text style={styles.bold}>From Teams: </Text>
                            These invites are sent by teams wish you to join in them.
                        </Text>
                        <Text style={styles.modalText}>
                            <Text style={styles.bold}>From People: </Text>
                            These are sent by people who request your team and wish to join in your team.
                        </Text>
                    </View>
                );
                break;
            case 'Current Teams':
                content = (
                    <View>
                        <Text style={styles.modalText}>
                            All the teams you have successfully joined would show up in current teams.
                        </Text>
                    </View>
                );
                break;
            default:
                content = <Text style={styles.modalText}>Details about {feature}</Text>;
        }
        setModalContent(content);
        setModalVisible(true);
    };
    

    return (
        <View style={styles.container}>
        {/* Home Button */}
        <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
            <Icon name="home" size={30} color="#00507B" />
        </TouchableOpacity>

        <ScrollView>
            <View style={styles.featureContainer}>
                <TouchableOpacity onPress={() => handleFeaturePress('Create')} style={styles.feature}>
                    <Icon name="plus" size={40} color="#00507B" />
                    <Text style={styles.featureText}>Create</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleFeaturePress('People')} style={styles.feature}>
                    <Icon name="book" size={40} color="#00507B" />
                    <Text style={styles.featureText}>People</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleFeaturePress('Teams')} style={styles.feature}>
                    <Icon name="group" size={40} color="#00507B" />
                    <Text style={styles.featureText}>Teams</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => handleFeaturePress('Sent Requests')} style={styles.feature}>
                    <Icon name="paper-plane" size={40} color="#00507B" />
                    <Text style={styles.featureText}>Sent Requests</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleFeaturePress('Pending Invites')} style={styles.feature}>
                    <Icon name="hourglass-start" size={40} color="#00507B" />
                    <Text style={styles.featureText}>Pending Invites</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleFeaturePress('Current Teams')} style={styles.feature}>
                    <Icon name="list" size={50} color="#00507B" />
                    <Text style={styles.featureText}>Current Teams</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ScrollView>
                            <Text style={styles.modalTitle}>{modalHeader}</Text>
                            {modalContent}
                            <TouchableOpacity
                                style={styles.buttonClose}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.textStyle}>Close</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
    },
    featureContainer: {
        marginTop: 100,
        alignItems: 'flex-start',
    },
    feature: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    featureText: {
        fontSize: 20,
        marginLeft: 10,
        color: '#00507B',
        fontWeight: 'bold',
    },
    bold: {
        fontWeight: 'bold',
    },
    summary: {
        fontSize: 16,
    },
    // ... other styles ...
    // Add styles for modal elements below
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
    },
    modalView: {
        margin: 20,
        marginTop: 150,
        marginBottom: 200,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxWidth: '80%', // Set a max width for larger devices
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold"
    },
    modalText: {
        fontSize: 16,
        textAlign: "left",
        marginBottom: 10,
    },
    buttonClose: {
        backgroundColor: "#00507B",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    homeButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: '#FFF', // White button color
        padding: 20,
        borderRadius: 50, // Make it a circle
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

export default Help;
