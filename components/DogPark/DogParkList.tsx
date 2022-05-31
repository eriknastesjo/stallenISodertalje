import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import dogParkModel from '../../models/dogPark';
import { Typography, Base, Buttons } from '../../styles';
import OrderedButtonsList from '../Shared/OrderedButtonsList';


export default function DogParkList({ navigation }) {

    const [dogparks, setDogParks] = useState([]);


    useEffect(() => {
        (async function () {
            setDogParks(await dogParkModel.getData());
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