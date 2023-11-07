import React, { useState , useEffect}  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const fetchFonts = () => {
  return Font.loadAsync({
    'RobotoSlab-Regular': require('./assets/fonts/RobotoSlab-Regular.ttf'),
    // ... include all the custom fonts you need here
  });
};

const Stack = createNativeStackNavigator();

function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts and wait for it to finish
        await fetchFonts();
        // Inform the app that the fonts are loaded
        setFontLoaded(true);
      } catch (e) {
        console.warn(e);
      } finally {
        // Hide the splash screen
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Log In">
        <Stack.Screen name="Log In" component={LoginScreen} 
        options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;