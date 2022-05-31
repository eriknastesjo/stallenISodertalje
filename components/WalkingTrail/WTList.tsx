import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import sodertaljeModel from '../../models/sodertalje';
import { Typography, Base, Buttons } from '../../styles';
import OrderedButtonsList from '../Shared/OrderedButtonsList';

export default function ParkList({navigation}) {

    const [parks, setParks] = useState([]);


    useEffect(() => {
        (async function () {
            setParks(await sodertaljeModel.getData("f6b33e8d-19bd-4d2d-a59b-35c4df352a2c"));
        })();
    }, []);

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
            <Text style={Typography.header1NoMargin}>Vandringsleder</Text>
            <Text style={Typography.header3}>(Startpunkter)</Text>
            <OrderedButtonsList navigation={navigation} listOfItems={listToSort} />
        </ScrollView>
    );
};
