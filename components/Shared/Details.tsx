import { useState, useEffect, useRef } from "react";
import { Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Base, Typography, Buttons } from "../../styles";
import * as Linking from 'expo-linking';
import Map from "./MapSingle";


export default function Details({ route }) {
    const { mapItemFocused, urlEndJson, urlEndGeo, urlEndCompl } = route.params; // se i ParkList funktionen listOfParks och vid 'Onpress'

    // console.log(mapItemFocused);

    return (
        <View style={Base.container}>

            <View style={Base.content}>
                <Text style={Typography.header2}>{mapItemFocused.namn}</Text>
                {
                    mapItemFocused.beskrivning !== undefined && mapItemFocused.beskrivning !== "" &&
                    <Text style={Typography.normalCenter}>{mapItemFocused.beskrivning}</Text>
                }
                {
                    mapItemFocused.webbsida !== undefined && mapItemFocused.webbsida !== "" &&
                    <View style={Buttons.buttonContainer}>
                        <TouchableOpacity
                            style={Buttons.buttonCenter}
                            onPress={() => {
                                Linking.openURL(mapItemFocused.webbsida)
                            }}
                        >
                            <Text style={Typography.smallButton}>Webbsida</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>

            <View style={Base.mapContainer}>
                <Map mapItem={mapItemFocused}
                    urlEndJson={urlEndJson}
                    urlEndGeo={urlEndGeo}
                    urlEndCompl={urlEndCompl}
                />
            </View>

        </View>
    );

};