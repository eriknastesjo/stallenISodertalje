import { Ionicons, Foundation } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, Base } from './styles';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react';

import Home from './components/Home/Home';
import About from './components/About/About';
import Auth from './components/Auth/Auth';
import Logout from './components/Auth/Logout';
import Profile from './components/Auth/Profile';



const Tab = createBottomTabNavigator();
// https://icons.expo.fyi/ sortera på ionicons eller importera bibliotek
const routeIcons = {
  "Hem": "home",
  "Om": "paw-outline",
  "Logga in": "log-in",
  "Logga ut": "log-out",
  "Profil": "star",
};
const library = {
  "Hem": "foundation",
  "Om": "ionicons",
  "Logga in": "ionicons",
  "Logga ut": "ionicons",
  "Profil": "ionicons",
};

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [profileName, setProfileName] = useState<String>("ägare");

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
          tabBarInactiveTintColor: '#646464',
          headerShown: false,
        })}
        >
          <Tab.Screen name="Hem" component={Home} />
          <Tab.Screen name="Om" component={About} />
          {isLoggedIn ?
            <Tab.Screen name="Profil">
              {() => <Profile
                profileName={profileName}
                setProfileame={setProfileName}
                setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
            :
            <Tab.Screen name="Logga in">
              {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
          }
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
