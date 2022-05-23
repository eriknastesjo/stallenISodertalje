import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import { Base, Typography } from '../../styles';
import parkModel from '../../models/park';
import Map from '../MapAll';

export default function ParkMap() {
    const [parks, setParks] = useState([]);


    useEffect(() => {
        (async function () {
            setParks(await parkModel.getData());
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
            <Text style={Typography.header2}>Parker</Text>
            <View style={Base.mapContainer}>
                <Map parks={listOfParks}/>
            </View>

        </View>
    );
};