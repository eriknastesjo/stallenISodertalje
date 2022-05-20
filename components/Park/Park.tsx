import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { getStateFromPath } from '@react-navigation/native';

import ParkMenu from './ParkMenu';
import ParkList from './ParkList';
import ParkMap from './ParkMap';



const Stack = createNativeStackNavigator();

export default function Home(props) {

    // console.log(props);
    // console.log(props.setIsLoggedIn);
    return (
        <Stack.Navigator initialRouteName="Meny">
            <Stack.Screen name="ParkMeny" component={ParkMenu} />
            <Stack.Screen name="Lista" component={ParkList} />
            <Stack.Screen name="Karta" component={ParkMap} />
        </Stack.Navigator>
    );
};