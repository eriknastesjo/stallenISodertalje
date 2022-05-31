import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import sodertaljeModel from '../../models/sodertalje';
import { Typography, Base, Buttons } from '../../styles';
import OrderedButtonsList from '../Shared/OrderedButtonsList';

export default function ParkList({navigation}) {

    const [parks, setParks] = useState([]);


    useEffect(() => {
        (async function () {
            setParks(await sodertaljeModel.getData("57743863-81ce-461a-9887-791b492f4522"));
        })();
    }, []);

    const listToSort = parks
        .map((park) => {
            return {
                "beskrivning": park["beskrivning"],
                "information": park["information"],
                "latitude": park["nord-koordinat (wgs84)"],
                "longitude": park["ost-koordinat (wgs84)"],
                "webbsida": park["webbsida"],
                "namn": park["﻿namn"],
            }
        });

    return (
        <ScrollView style={Base.backgroundCol}>
            <Text style={Typography.header1}>Naturreservat</Text>
            <OrderedButtonsList navigation={navigation} listOfItems={listToSort} />
        </ScrollView>
    );
};
