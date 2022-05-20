import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { getStateFromPath } from '@react-navigation/native';

import DogParkMenu from './DogParkMenu';
import DogParkList from './DogParkList';
import DogParkMap from './DogParkMap';



const Stack = createNativeStackNavigator();

export default function Home(props) {

    // console.log(props);
    // console.log(props.setIsLoggedIn);
    return (
        <Stack.Navigator initialRouteName="Meny">
            <Stack.Screen name="Hundrastgård Meny" component={DogParkMenu} />
            <Stack.Screen name="Lista" component={DogParkList} />
            <Stack.Screen name="Karta" component={DogParkMap} />
        </Stack.Navigator>
    );
};