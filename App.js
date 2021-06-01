import { StatusBar } from "expo-status-bar";
import React, { useState,useMemo,useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import { init } from './helpers/db';
import JournalNavigator from './navigation/JournalNavigator'
//import FileSystem from 'expo-file-system';
import * as FileSystem from 'expo-file-system';
import { NavigationContainer } from "@react-navigation/native";
import RootStackScreen from "./screens/RootStackScreen";

import { AuthContext } from './components/context';


const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
//const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() => ({
    signIn: () => {
      setUserToken('fkks');
      setIsLoading(false);
    },
    signOut: () => {
      setUserToken(null);
      setIsLoading(false);
    },
    signUp: () => {
      setUserToken('fkks');
      setIsLoading(false);
    },
  }));

  useEffect(() => {
    setTimeout(()=>{
      setIsLoading(false);
    },1000);
  }, [])

  if( isLoading ){
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!fontLoaded) {
    return (
      <AppLoading
          startAsync={fetchFonts}
          onFinish={() => setFontLoaded(true)}
        />  
      
    );
  }

  //const Tab = createBottomTabNavigator();
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken !== null ? (
          <JournalNavigator />
        )
        :
        <RootStackScreen />
      }        
      </NavigationContainer>
      {/* <JournalNavigator /> */}
    </AuthContext.Provider>
     
  );
}
//export default App;
