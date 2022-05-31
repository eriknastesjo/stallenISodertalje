import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { getStateFromPath } from '@react-navigation/native';

import NRMenu from './NRMenu';
import NRList from './NRList';
import NRMap from './NRMap';

import Details from '../Shared/Details';


const Stack = createNativeStackNavigator();

export default function NatureReserve() {
    return (
        <Stack.Navigator initialRouteName="Meny" >
            <Stack.Screen name="NaturreservatMeny" component={NRMenu} options={{ title:"Naturreservat" }}/>
            <Stack.Screen name="Detaljer" component={Details} />
            <Stack.Screen name="Lista" component={NRList} />
            <Stack.Screen name="Karta" component={NRMap} />
        </Stack.Navigator>
    );
};