import { Ionicons, Foundation } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, Base } from './styles';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react';

import authModel from './models/auth';

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

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [profileName, setProfileName] = useState<String>("ägare");
  const [dogName, setDogName] = useState<String>("hund");

  useEffect(() => {
    (async function () {
      setIsLoggedIn(await authModel.loggedIn());
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
            {() => <Home profileName={profileName} dogName={dogName} isLoggedIn={isLoggedIn} />}
          </Tab.Screen>
          {isLoggedIn ?
            <Tab.Screen name="Profil">
              {() => <Profile
                profileName={profileName}
                setProfilename={setProfileName}
                dogName={dogName}
                setDogName={setDogName}
                setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
            :
            <Tab.Screen name="Inlogg">
              {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
          }
          <Tab.Screen name="Om" component={About} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
