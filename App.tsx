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

import Root from './components/Root/Root';
import About from './components/About/About';
import Auth from './components/Auth/Auth';
import Profile from './components/Profile/Profile';


const categories = [
  {
    stackName: "Park",
    title: "Parker",
    imgUrl: require("./assets/park.png"),
    urlEnd: '2cc90eb1-2c6a-444b-ab52-e4bcd22c7130'
  },
  {
    stackName: "DogPark",
    title: "Hundrastgårdar",
    imgUrl: require("./assets/hundrastgård.png"),
    urlEnd: '1d83a1df-16ca-4bfd-8bc7-242747231b60'
  },
  {
    stackName: "WalkingTrail",
    title: "Vandringsled",
    subtitle: '(Startpunkter)',
    imgUrl: require("./assets/vandringsled.png"),
    urlEnd: 'f6b33e8d-19bd-4d2d-a59b-35c4df352a2c'
  },
  {
    stackName: "NatureReserve",
    title: "Naturreservat",
    imgUrl: require("./assets/naturreservat.png"),
    urlEnd: '57743863-81ce-461a-9887-791b492f4522'
  },
  {
    stackName: "BirdTower",
    title: "Fågeltorn",
    imgUrl: require("./assets/naturreservat.png"),
    urlEnd: 'adf0ed85-2614-4f0e-a1d1-531900361a9c'
  },
  {
    stackName: "TouristAttraction",
    title: "Turistattraktion",
    imgUrl: require("./assets/naturreservat.png"),
    urlEnd: '33f5afd7-9a53-46cb-9842-adadc9769c34'
  },
  {
    stackName: "ExerciseAreas",
    title: "Träningsområden",
    imgUrl: require("./assets/naturreservat.png"),
    urlEnd: '1e7197b0-93d6-49ea-878f-489eff759ba7'
  },
  {
    stackName: "Playground",
    title: "Lekplatser",
    imgUrl: require("./assets/naturreservat.png"),
    urlEnd: '8861938c-e603-422f-b5b9-b49c09c15b9f'
  }
]

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
          tabBarItemStyle: {
            marginTop: 5,
          },
          tabBarStyle: {
            height: 57,
          },
          tabBarLabelStyle: {
            fontSize: 13,
            marginBottom: 7,
          },
        })}>
          <Tab.Screen name="Hem">
            {() => <Root categories={categories} artefact={artefact} isLoggedIn={isLoggedIn} />}
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
              {() => <Auth
                setIsLoggedIn={setIsLoggedIn}
                artefact={artefact}
                setArtefact={setArtefact}
              />}
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
