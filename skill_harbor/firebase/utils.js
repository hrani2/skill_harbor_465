import { firebase, fireStoreDb, realtimeDb} from './config';
// import { collection, doc, setDoc } from "firebase/firestore";
import { ref, set, get, remove } from "firebase/database";
import { Alert } from 'react-native';


export const addNewUser = async (name, email, password, age, skills) => {
  try {
    const userRef = ref(realtimeDb, "user/" + email);
    await set(userRef, {
      name: name,
      email: email,
      password: password,
      age: age,
      skills: skills
    });
    console.log("Document successfully written!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const createNewTeam = async (name, location, max_size, join_code, skills, info) => {
  try {
    const teamRef = ref(realtimeDb, "team/" + name);
    await set(teamRef, {
      name: name,
      location: location,
      max_size: max_size,
      join_code: join_code,
      skills: skills,
      info: info, 
    });
    console.log("Document successfully written!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const queryUserByName = async (name) => {
    try{
        const userRef = ref(realtimeDb, "user/" + email);
        const snapshot = await get(userRef);
        if (snapshot.exists()){
            return snapshot.val();
        }
        else{
            return null;
        };
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

export const checkUserLogin = async (email, password) => {
    try{
        snapshot = await queryUserByName(email);
        if (snapshot == null){
            Alert.alert("You haven't signed up! Wrong email address!");
            return false;
        }
        if (snapshot["password"] == password){
            return true;
        }
        else{
            Alert.alert("incorrect password");
            return false;
        }
    } catch (e) {
        console.error("Error fetching data: ", e);
    };
}



export const queryData = async () => {
  try {
    const cityRef = ref(realtimeDb, "cities/IL");
    const snapshot = await get(cityRef);

    if (snapshot.exists()) {
      console.log("Retrieved data: ", snapshot.val());
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export const deleteData = async () => {
  try {
    const cityRef = ref(realtimeDb, "cities");
    await remove(cityRef);
    console.log("Data successfully deleted");
  } catch (error) {
    console.error("Error deleting data: ", error);
  }
};