import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import sodertaljeModel from '../../models/sodertalje';
import { Typography, Base, Buttons } from '../../styles';
import OrderedButtonsList from '../Shared/OrderedButtonsList';

export default function ParkList({navigation}) {

    const [parks, setParks] = useState([]);


    useEffect(() => {
        (async function () {
            setParks(await sodertaljeModel.getData("2cc90eb1-2c6a-444b-ab52-e4bcd22c7130"));
        })();
    }, []);


    // listToSort behövs här för att bli av med '﻿'
    // framför namn key så att det går att sortera!

    // const listToSort: Array= [];

    // for (let i = 0; i < parks.length; i++) {
    //     listToSort.push({
    //         "beskrivning": parks[i]["beskrivning"],
    //         "latitude": parks[i]["nord-koordinat (wgs84)"],
    //         "longitude": parks[i]["ost-koordinat (wgs84)"],
    //         "webbsida": parks[i]["webbsida"],
    //         "namn": parks[i]["﻿namn"],

    //     });
    // }

    // Obs! map är snyggare att använda än for loop (jämför ovan med nedan)!

    const listToSort = parks
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
        <ScrollView style={Base.backgroundCol}>
            <Text style={Typography.header1}>Parker</Text>
            <OrderedButtonsList navigation={navigation} listItems={listToSort} />
        </ScrollView>
    );
};
