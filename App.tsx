import { Ionicons, Foundation, FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, Base } from './styles';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react';

// Här sparas val av profildetaljer.
// ========================================================
import storage from './models/storage';

// Här kan du som programmerare ändra vilka kategorier som ska visas.
// ========================================================
import categories from './components/RootMenu/Categories';

// Bildlänkar till samtliga möjliga profilbilder.
// ========================================================
import profilepicList from './components/Personalize/PicList';

import RootStack from './components/RootMenu/RootStack';
import About from './components/About/About';


const Tab = createBottomTabNavigator();
// https://icons.expo.fyi/
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
            {() => <RootStack
              categories={categories}
              name={name}
              setName={setName}
              profilepicList={profilepicList}
              picNum={picNum}
              setPicNum={setPicNum}
            />}
          </Tab.Screen>
          <Tab.Screen name="Om" component={About} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );

}
