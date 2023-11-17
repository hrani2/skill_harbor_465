import React, { useState , useEffect}  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import Create from './Create';
import Browse from './Browse';
import ChooseTeam from './ChooseTeam';
import Search from './Search';
import SignUpScreen from './SignUp';
import CreateTeam from './CreateTeam';
import TeamRequestPosted from './TeamRequestPosted'
import JoinCode from './JoinCode';
import ReceiveJoinCode  from './ReceiveJoinCode';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import ProfileScreen from './ProfileScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'RobotoSlab-Regular': require('./assets/fonts/RobotoSlab-Regular.ttf'),
    'RobotoSlab-Black': require('./assets/fonts/RobotoSlab-Black.ttf'),
    'RobotoSlab-Bold': require('./assets/fonts/RobotoSlab-Bold.ttf'),
    'RobotoSlab-ExtraBold': require('./assets/fonts/RobotoSlab-ExtraBold.ttf'),
    'RobotoSlab-ExtraLight': require('./assets/fonts/RobotoSlab-ExtraLight.ttf'),
    'RobotoSlab-Light': require('./assets/fonts/RobotoSlab-Light.ttf'),
    'RobotoSlab-Medium': require('./assets/fonts/RobotoSlab-Medium.ttf'),
    'RobotoSlab-SemiBold': require('./assets/fonts/RobotoSlab-SemiBold.ttf'),
    'RobotoSlab-Thin': require('./assets/fonts/RobotoSlab-Thin.ttf')
    // ... include all the custom fonts you need here
  });
};

const Stack = createNativeStackNavigator();

function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await SplashScreen.preventAutoHideAsync();
  
        // Load fonts
        await fetchFonts();
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setFontLoaded(true);
        await SplashScreen.hideAsync();
      }
    }
  
    loadResourcesAndDataAsync();
  }, []);

  if (!fontLoaded) {
    return null; // or a custom loading component if you wish
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Log In">
        <Stack.Screen name="Log In" component={LoginScreen} 
        options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen}
        options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen}
        options={{ headerShown: false }} />
         <Stack.Screen name="Create" component={Create} />
         <Stack.Screen name="CreateTeam" component={CreateTeam} />
         <Stack.Screen name="TeamRequestPosted" component={TeamRequestPosted} />
         <Stack.Screen name="JoinCode" component={JoinCode} />
         <Stack.Screen name="ReceiveJoinCode" component={ReceiveJoinCode} />
         <Stack.Screen name="Search" component={Search} 
          options={{ headerShown: false }}/>
         <Stack.Screen name="Browse" component={Browse}/>
         <Stack.Screen name="ChooseTeam" component={ChooseTeam}/>
         {/* <Stack.Screen name="Profile" component={Profile}/> */}
         <Stack.Screen name="SignUp" component={SignUpScreen}
        options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
