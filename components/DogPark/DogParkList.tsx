import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import dogParkModel from '../../models/park';
import { Typography, Base, Buttons } from '../../styles';


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


    listToSort.sort((a, b) => {
        let fa = a.namn.toLowerCase(),
            fb = b.namn.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }

        return 0;
    });


    const listOfDogParks = listToSort
        .map((dogPark, index) => {
            return <View style={Buttons.buttonContainer} key={index}>
                <TouchableOpacity
                    style={Buttons.button2}
                    onPress={() => {
                        navigation.navigate('Detaljer', {
                            detailObj: dogPark
                        });
                    }}
                >
                    <Text style={Typography.normalButton}>{dogPark.namn}</Text>
                </TouchableOpacity>
            </View>
        });

    return (
        <ScrollView>
            <Text style={Typography.header1}>Hundrastgårdar</Text>
            {listOfDogParks}
        </ScrollView>
    );
};