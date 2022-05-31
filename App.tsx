import { Ionicons, Foundation } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, Base } from './styles';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react';
import FlashMessage from "react-native-flash-message";

import authModel from './models/auth';
import artefactsModel from './models/artefacts';

import Artefact from './interfaces/artefact';

import Home from './components/Home/Home';
import About from './components/About/About';
import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';



const Tab = createBottomTabNavigator();
// https://icons.expo.fyi/ sortera på ionicons eller importera bibliotek
const routeIcons = {
  "Hem": "home",
  "Om": "paw-outline",
  "Inlogg": "log-in",
  "Profil": "star",
};
const library = {
  "Hem": "foundation",
  "Om": "ionicons",
  "Inlogg": "ionicons",
  "Profil": "ionicons",
};

FlashMessage.setColorTheme({
  success: "#038310",
  info: "#1371C3",
  warning: "#C66200",
  danger: "#D23930",
});

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [artefact, setArtefact] = useState<Partial<Artefact>>({
    ownerName: "ägare",
    dogName: "hund",
  });


  useEffect(() => {
    (async function () {
      setIsLoggedIn(await authModel.loggedIn());
      const artefactObj = await artefactsModel.getArtefactByEmail();
      console.log(artefactObj)
      if (artefactObj) {
        setArtefact({ ...artefact, ownerName: artefactObj.ownerName, dogName:artefactObj.dogName });
      }
    })();
  }, []);

  return (
    <SafeAreaView style={Base.base}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = routeIcons[route.name] || "alert";
            let libraryName = library[route.name] || "ionicons";

            if (libraryName === "ionicons") {
              return <Ionicons name={iconName} size={size} color={color} />;
            }
            return <Foundation name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#313131',
          tabBarInactiveTintColor: '#8A8A8A',
          headerShown: false,

        })}
          barStyle={{
            backgroundColor: "white",
            height: 70,
            justifyContent: "center",
            border: 0,
            margin: 0,
            padding: 0,
          }}
        >
          <Tab.Screen name="Hem">
            {() => <Home artefact={artefact} isLoggedIn={isLoggedIn} />}
          </Tab.Screen>
          {isLoggedIn ?
            <Tab.Screen name="Profil">
              {() => <Profile
                artefact={artefact}
                setArtefact={setArtefact}
                setIsLoggedIn={setIsLoggedIn}
              />}
            </Tab.Screen>
            :
            <Tab.Screen name="Inlogg">
              {() => <Auth setIsLoggedIn={setIsLoggedIn} setArtefact={setArtefact}/>}
            </Tab.Screen>
          }
          <Tab.Screen name="Om" component={About} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
      <FlashMessage position="top" setColorTheme=""/>
    </SafeAreaView>
  );

}
