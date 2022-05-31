import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { getStateFromPath } from '@react-navigation/native';

import WTMenu from './WTMenu';
import WTList from './WTList';
import WTMap from './WTMap';

import Details from '../Shared/Details';


const Stack = createNativeStackNavigator();

export default function WalkingTrail() {
    return (
        <Stack.Navigator initialRouteName="Meny" >
            <Stack.Screen name="VandringsledMeny" component={WTMenu} options={{ title:"Vandringsled" }}/>
            <Stack.Screen name="Detaljer" component={Details} />
            <Stack.Screen name="Lista" component={WTList} />
            <Stack.Screen name="Karta" component={WTMap} />
        </Stack.Navigator>
    );
};