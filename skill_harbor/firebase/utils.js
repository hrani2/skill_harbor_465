import { firebase, fireStoreDb, realtimeDb} from './config';
// import { collection, doc, setDoc } from "firebase/firestore";
import { ref, set, get, remove } from "firebase/database";


export const addNewUser = async (name, email, password, age, skills) => {
  try {
    const userRef = ref(realtimeDb, "user/");
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