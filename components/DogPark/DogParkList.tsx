import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import dogParkModel from '../../models/dogPark';
import { Typography, Base } from '../../styles';


export default function DogParkList({ navigation }) {

    const [dogparks, setDogParks] = useState([]);


    useEffect(() => {
        (async function () {
            setDogParks(await dogParkModel.getData());
        })();
    }, []);


    // listToSort behövs här för att bli av med '﻿'
    // framför namn key så att det går att sortera!

    // const listToSort: Array = [];

    // for (let i = 0; i < dogparks.length; i++) {
    //     listToSort.push({
    //         "nord-koordinat (wgs84)": dogparks[i]["nord-koordinat (wgs84)"],
    //         "ost-koordinat (wgs84)": dogparks[i]["ost-koordinat (wgs84)"],
    //         "webbsida": dogparks[i]["webbsida"],
    //         "namn": dogparks[i]["﻿namn"],

    //     });
    // }

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
            return <Button
                color='#313131'
                title={dogPark["namn"]}
                key={index}
                onPress={() => {
                    navigation.navigate('Detaljer', {
                        dogPark: dogPark
                    });
                }}
            />
        });

    return (
        <ScrollView>
            <Text style={Typography.boldCenter}>Hundrastgårdar</Text>
            {listOfDogParks}
        </ScrollView>
    );
};