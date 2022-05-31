import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import sodertaljeModel from '../../models/sodertalje';
import { Typography, Base, Buttons } from '../../styles';
import OrderedButtonsList from '../Shared/OrderedButtonsList';


export default function DogParkList({ navigation }) {

    const [dogparks, setDogParks] = useState([]);


    useEffect(() => {
        (async function () {
            setDogParks(await sodertaljeModel.getData("1d83a1df-16ca-4bfd-8bc7-242747231b60"));
        })();
    }, []);

    const listToSort = dogparks
        .map((dogpark) => {
            return {
                "latitude": dogpark["nord-koordinat (wgs84)"],
                "longitude": dogpark["ost-koordinat (wgs84)"],
                "webbsida": dogpark["webbsida"],
                "namn": dogpark["﻿namn"],
            }
        });


    return (
        <ScrollView>
            <Text style={Typography.header1}>Hundrastgårdar</Text>
            <OrderedButtonsList navigation={navigation} listOfItems={listToSort}/>
        </ScrollView>
    );
};