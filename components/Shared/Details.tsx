import { useState, useEffect, useRef } from "react";
import { Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Base, Typography, Buttons } from "../../styles";
import * as Linking from 'expo-linking';
import Map from "./MapSingle";


export default function Details({ route }) {
    const { detailObj, dataType } = route.params; // se i ParkList funktionen listOfParks och vid 'Onpress'

    // console.log(detailObj);

    return (
        <View style={Base.container}>

            <View style={Base.content}>
                <Text style={Typography.header2}>{detailObj.namn}</Text>
                {
                    detailObj.beskrivning !== undefined && detailObj.beskrivning !== "" &&
                    <Text style={Typography.normalCenter}>{detailObj.beskrivning}</Text>
                }
                {
                    detailObj.information !== undefined && detailObj.information !== "" &&
                    <Text style={Typography.normalCenter}>{detailObj.information}</Text>
                }
                {
                    detailObj.informatiom !== undefined && detailObj.informatiom !== "" &&
                    <Text style={Typography.normalCenter}>{detailObj.informatiom}</Text>
                }
                {
                    detailObj.vägbeskrivning !== undefined && detailObj.vägbeskrivning !== "" &&
                    <Text style={Typography.normalCenter}>{detailObj.vägbeskrivning}</Text>
                }
                {
                    detailObj.webbsida !== undefined && detailObj.webbsida !== "" &&
                    <View style={Buttons.buttonContainer}>
                        <TouchableOpacity
                            style={Buttons.buttonCenter}
                            onPress={() => {
                                Linking.openURL(detailObj.webbsida)
                            }}
                        >
                            <Text style={Typography.smallButton}>Webbsida</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>

            <View style={Base.mapContainer}>
                <Map park={detailObj} />
            </View>

        </View>
    );
};