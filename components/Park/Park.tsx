import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { getStateFromPath } from '@react-navigation/native';

import ParkMenu from './ParkMenu';
import ParkList from './ParkList';
import ParkMap from './ParkMap';
import ParkDetails from './Details';



const Stack = createNativeStackNavigator();

export default function Home(props) {
    return (
        <Stack.Navigator initialRouteName="Meny" >
            <Stack.Screen name="ParkMeny" component={ParkMenu} options={{ title:"Park" }}/>
            <Stack.Screen name="Detaljer" component={ParkDetails} />
            <Stack.Screen name="Lista" component={ParkList} />
            <Stack.Screen name="Karta" component={ParkMap} />
        </Stack.Navigator>
    );
};