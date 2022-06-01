import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { getStateFromPath } from '@react-navigation/native';
import { useState, useEffect } from 'react';

import sodertaljeModel from '../../models/sodertalje';

import ListOrMap from './ListOrMap';
import List from './List';
import MapAll2 from './MapAll2';
import Details from '../Shared/Details';



// hämta från model (URL-ändelse hämtas från CategoryButtons)

const Stack = createNativeStackNavigator();

export default function Stacking({ route }) {
    const { title, urlEnd } = route.params;
    const [data, setData] = useState([]);

    useEffect(() => {
        (async function () {
            setData(await sodertaljeModel.getData(urlEnd));
        })();
    }, []);

    // för att bli av med ﻿:et framför namn
    const refinedData = data
        .map((dataItem) => {
            return {
                "beskrivning": dataItem["beskrivning"],
                "information": dataItem["information"],
                "latitude": dataItem["nord-koordinat (wgs84)"],
                "longitude": dataItem["ost-koordinat (wgs84)"],
                "webbsida": dataItem["webbsida"],
                "namn": dataItem["﻿namn"],
            }
        });

    // console.log(data);

    return (
        <Stack.Navigator initialRouteName="ListOrMap" >
            <Stack.Screen name="ListOrMap" component={ListOrMap} options={{ title: title }} />
            <Stack.Screen name="Detaljer" component={Details} />
            <Stack.Screen name="Lista">{(props) => <List {...props}
                listItems={refinedData}
                title={title}
            />}
            </Stack.Screen>
            <Stack.Screen name="Karta">{(props) => <MapAll2 {...props}
                mapItems={refinedData}
                title={title}
            />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
