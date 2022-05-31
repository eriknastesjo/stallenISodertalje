import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import { Base, Typography } from '../../styles';
import sodertaljeModel from '../../models/sodertalje';
import MapAll from '../Shared/MapAll';

export default function ParkMap() {
    const [parks, setParks] = useState([]);


    useEffect(() => {
        (async function () {
            setParks(await sodertaljeModel.getData("57743863-81ce-461a-9887-791b492f4522"));
        })();
    }, []);

    // för att bli av med ﻿:et framför namn
    const listOfParks = parks
        .map((park) => {
            return {
                "beskrivning": park["beskrivning"],
                "latitude": park["nord-koordinat (wgs84)"],
                "longitude": park["ost-koordinat (wgs84)"],
                "webbsida": park["webbsida"],
                "namn": park["﻿namn"],
            }
        });

    return (
        <View style={Base.container}>
            <Text style={Typography.header2}>Naturreservat</Text>
            <View style={Base.mapContainer}>
                <MapAll parks={listOfParks}/>
            </View>

        </View>
    );
};