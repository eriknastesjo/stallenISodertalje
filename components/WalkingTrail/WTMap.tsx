import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import { Base, Typography } from '../../styles';
import sodertaljeModel from '../../models/sodertalje';
import MapAll from '../Shared/MapAll';

export default function ParkMap() {
    const [parks, setParks] = useState([]);


    useEffect(() => {
        (async function () {
            setParks(await sodertaljeModel.getData("f6b33e8d-19bd-4d2d-a59b-35c4df352a2c"));
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
            <Text style={Typography.header2}>Vandringsleder</Text>
            <View style={Base.mapContainer}>
                <MapAll parks={listOfParks}/>
            </View>

        </View>
    );
};