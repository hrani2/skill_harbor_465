import { firebase, fireStoreDb, realtimeDb} from './config';
// import { collection, doc, setDoc } from "firebase/firestore";
import { ref, set, get, remove } from "firebase/database";
import { Alert } from 'react-native';


export function removeSpecialCharacters(str) {
  return str.replace(/[.#$[\]]/g, '');
}

export const queryAllUsers = async () => {
  try {
    const userRef = ref(realtimeDb, "user/");
    const snapshot = await get(userRef);
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


export const addNewUser = async (name, email, password, age, skills) => {
  path_email = removeSpecialCharacters(email); 
  try {
    const userRef = ref(realtimeDb, "user/" + path_email);
    // add a empty list of teams
    await set(userRef, {
      name: name,
      email: email,
      password: password,
      age: age,
      skills: skills,
      teams: "None"
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
      members: "None"
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
          // console.log(snapshot.val()); 
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

export const queryTeamByName = async (name) => {
    try{
        const teamRef = ref(realtimeDb, "team/" + name);
        const snapshot = await get(teamRef);
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
            Alert.alert("Incorrect Password!");
            return false;
        }
    } catch (e) {
        console.error("Error fetching data: ", e);
    };
}


export const queryData = async () => {
  try {
    const cityRef = ref(realtimeDb, "user/"+email);
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

export const queryTeamsWithoutJoinCode = async () => { 
  try { 
    // Fetch all teams
    const allTeamsRef = ref(realtimeDb, "team/"); 
    const snapshot = await get(allTeamsRef); 

    if (snapshot.exists()) { 
      const allTeams = snapshot.val(); 
      // Filter teams without a join code
      const teamsWithoutJoinCode = Object.keys(allTeams).filter(key => !allTeams[key].join_code).map(key => allTeams[key]);

      console.log("Teams without join code: ", teamsWithoutJoinCode); 
      return teamsWithoutJoinCode; 
    } else {
      console.log("No team data available"); 
      return []; 
    }
  } catch(error) { 
    console.error("Error fetching data: ", error);
    return [];
  }
}
