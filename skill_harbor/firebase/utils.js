import { firebase, fireStoreDb, realtimeDb} from './config';
// import { collection, doc, setDoc } from "firebase/firestore";
import { ref, set, get, remove } from "firebase/database";
import { Alert } from 'react-native';


function removeSpecialCharacters(str) {
  return str.replace(/[.#$[\]]/g, '');
}

function generateJoinCode() {
  let code = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return code; 
};

export const addNewUser = async (name, email, password, age, skills) => {
  path_email = removeSpecialCharacters(email); 
  try {
    const userRef = ref(realtimeDb, "user/" + path_email);
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

export const addNewJoinCode = async (organization, course, code) => {
  try {
    const codeRef = ref(realtimeDb, "code/" + organization + course);
    await set(codeRef, {
      organization: organization, 
      course: course, 
      join_code: code, 
    }); 
    console.log("Join Code written successfully"); 
  } catch (e) {
    console.error("Error adding join code: ", e); 
  }
}

export const addNewTeam = async (name, location, team_size, join_code, skills, info) => {
  try {
    const teamRef = ref(realtimeDb, "team/" + name);
    await set(teamRef, {
      name: name,
      location: location,
      team_size: team_size,
      join_code: join_code,
      skills: skills,
      info: info, 
    });
    console.log("Document successfully written!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const queryUserByName = async (email) => {
    path_email = removeSpecialCharacters(email); 
    try{
        const userRef = ref(realtimeDb, "user/" + path_email);
        const snapshot = await get(userRef);
        if (snapshot.exists()){
          console.log(snapshot.val()); 
            return snapshot.val();
        }
        else{
            return null;
        };
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

export const queryTeamDb = async () => { 
  try { 
      const userRef = ref(realtimeDb, "team/"); 
      const snapshot = await get(userRef); 
      if (snapshot.exists()) { 
        console.log(snapshot.val()); 
        return snapshot.val(); 
      } else {
        return null; 
      }
  } catch(error) { 
    console.error("Error fetching data: ", error)
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