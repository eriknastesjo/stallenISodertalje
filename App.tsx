import { Ionicons, Foundation, FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, Base } from './styles';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react';
import FlashMessage from "react-native-flash-message";


// import authModel from './models/auth';
// import artefactsModel from './models/artefacts';
import storage from './models/storage';

// import Artefact from './interfaces/artefact';
import Category from './interfaces/category';

import Root from './components/Root/Root';
import About from './components/About/About';
import Auth from './components/Auth/Auth';
// import Profile from './components/Profile/Profile';
// import Personalize from './components/Personalize/Personalize';


const categories: Array<Partial<Category>> = [
  {
    stackName: "Park",
    title: "Parker",
    imgUrl: require("./assets/park.png"),
    urlEnd: '/rowstore/dataset/2cc90eb1-2c6a-444b-ab52-e4bcd22c7130',
    dataType: 'json'
  },
  {
    stackName: "Lekplats",
    title: "Lekplatser",
    imgUrl: require("./assets/lekplats.png"),
    urlEnd: '/rowstore/dataset/8861938c-e603-422f-b5b9-b49c09c15b9f'
  },
  {
    stackName: "Naturreservat",
    title: "Naturreservat",
    imgUrl: require("./assets/naturreservat.png"),
    urlEnd: '/rowstore/dataset/57743863-81ce-461a-9887-791b492f4522',
    dataType: 'json'
  },
  {
    stackName: "Vandringsled",
    title: "Vandringsleder",
    subtitle: '(Startpunkter)',
    imgUrl: require("./assets/vandringsled.png"),
    urlEnd: '/rowstore/dataset/f6b33e8d-19bd-4d2d-a59b-35c4df352a2c',
    dataType: 'json'
  },
  {
    stackName: "Hundrastgård",
    title: "Hundrastgårdar",
    imgUrl: require("./assets/hundrastgård.png"),
    urlEnd: '/rowstore/dataset/1d83a1df-16ca-4bfd-8bc7-242747231b60',
    dataType: 'json'
  },
  {
    stackName: "Fågeltorn",
    title: "Fågeltorn",
    imgUrl: require("./assets/fågeltorn.png"),
    urlEnd: '/rowstore/dataset/adf0ed85-2614-4f0e-a1d1-531900361a9c',
    dataType: 'json'
  },
  {
    stackName: "Turistattraktion",
    title: "Turistattraktioner",
    imgUrl: require("./assets/turistattraktion.png"),
    urlEnd: '/rowstore/dataset/33f5afd7-9a53-46cb-9842-adadc9769c34',
    dataType: 'json'
  },
  {
    stackName: "Träningsområde",
    title: "Träningsområden",
    imgUrl: require("./assets/träningsområden.png"),
    urlEnd: '/rowstore/dataset/1e7197b0-93d6-49ea-878f-489eff759ba7',
    dataType: 'json'
  },
  {
    stackName: "Vandringsled2",
    title: "Vandringsleder2",
    imgUrl: require("./assets/noIcon.png"),
    urlEnd: '/store/1/resource/486',
    dataType: "geoJson"
  },
  {
    stackName: "Parkeringar",
    title: "Parkeringar",
    imgUrl: require("./assets/noIcon.png"),
    urlEnd: '/rowstore/dataset/2f4c70e4-3932-4473-b94e-9858543efa8c',
    dataType: "json"
  },
  {
    stackName: "Excercice",
    title: "Escercice",
    imgUrl: require("./assets/noIcon.png"),
    urlEnd: '/store/1/resource/659',
    dataType: "geoJson"
  },

];


const profilepics: Array<NodeRequire> = [
  require("./assets/defaultIcon.png"),
  require("./assets/dogIcon.png"),
  require("./assets/catIcon.png"),
  require("./assets/chickenIcon.png"),
  require("./assets/pigIcon.png"),
  require("./assets/hourseIcon.png"),
  require("./assets/sheepIcon.png"),
  require("./assets/balloonIcon.png"),
  require("./assets/flowerIcon.png"),
];

const Tab = createBottomTabNavigator();
// https://icons.expo.fyi/ sortera på ionicons eller importera bibliotek
const routeIcons = {
  "Hem": "home",
  "Om": "paw-outline",
  "Inlogg": "log-in",
  "Profil": "star",
};
const library = {
  "Hem": "FontAwesome5",
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

  const [name, setName] = useState<string>("");
  const [picNum, setPicNum] = useState<number>(0);

  useEffect(() => {
    (async function () {
      const name = await storage.getName();
      const pic = await storage.getPicNum();
      if (name) { setName(name); }
      if (pic) { setPicNum(pic); }
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
              return <Ionicons name={iconName} size={22} color={color} />;
            }
            if (libraryName === "FontAwesome5") {
              return <FontAwesome5 name={iconName} size={22} color={color} />;
            }
            return <Foundation name={iconName} size={22} color={color} />;
          },
          tabBarActiveTintColor: '#313131',
          tabBarInactiveTintColor: '#8A8A8A',
          headerShown: false,
          tabBarItemStyle: {
            marginTop: 8,
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
            {() => <Root
              categories={categories}
              name={name}
              setName={setName}
              profilepics={profilepics}
              picNum={picNum}
              setPicNum={setPicNum}
            />}
          </Tab.Screen>
          <Tab.Screen name="Om" component={About} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
      <FlashMessage position="top" setColorTheme=""/>
    </SafeAreaView>
  );

}
