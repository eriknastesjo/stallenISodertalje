import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { getStateFromPath } from '@react-navigation/native';

import DogParkMenu from './DogParkMenu';
import DogParkList from './DogParkList';
import DogParkMap from './DogParkMap';

import Details from '../Shared/Details';

const Stack = createNativeStackNavigator();

export default function DogPark() {
    return (
        <Stack.Navigator initialRouteName="Hundrastgård Meny">
            <Stack.Screen name="Hundrastgård Meny" component={DogParkMenu} options={{ title: "Hundrastgård" }} />
            <Stack.Screen name="Detaljer" component={Details} />
            <Stack.Screen name="Lista" component={DogParkList} />
            <Stack.Screen name="Karta" component={DogParkMap} />
        </Stack.Navigator>
    );
};