import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import parkModel from '../../models/park';
import { Typography, Base, Buttons } from '../../styles';


export default function ParkList({navigation}) {

    const [parks, setParks] = useState([]);


    useEffect(() => {
        (async function () {
            setParks(await parkModel.getData());
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

    sortList(listToSort);

    const listOfParks = listToSort
        .map((park, index) => {
            return <View style={Buttons.buttonContainer} key={index}>
                    <TouchableOpacity
                    style={Buttons.button2}
                    onPress={() => {
                        navigation.navigate('Detaljer', {
                            park: park
                        });
                    }}
                >
                        <Text style={Typography.normalButton}>{park.namn}</Text>
                    </TouchableOpacity>
                </View>
        });

    return (
        <ScrollView style={Base.backgroundCol}>
            <View style={Base.centerContainer}></View>
            <Text style={Typography.header1}>Parker</Text>
            {listOfParks}
        </ScrollView>
    );
};


function sortList(listToSort: Array<any>) {
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
}