import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { getStateFromPath } from '@react-navigation/native';
import { useState, useEffect } from 'react';

import sodertaljeModel from '../../models/sodertalje';

import ListOrMap from './ListOrMap';
import List from './List';
import MapAll from './MapAll';
import Details from '../Shared/Details';


// hämta från model (URL-ändelse hämtas från CategoryButtons)

const Stack = createNativeStackNavigator();

export default function Stacking({ route }) {
    const { title, subtitle, urlEndJson, urlEndGeo, urlEndCompl } = route.params;
    const [data, setData] = useState([]);
    const [dataComl, setdataComl] = useState([]);

    let fitCoordinates:any;

    // console.log(route.params);

    useEffect(() => {

        if (urlEndJson) {
            (async function () {
                setData(await sodertaljeModel.getJsonData(urlEndJson));
            })();
        }

        if (urlEndGeo) {
            (async function () {
                const result = await sodertaljeModel.getGeoJsonData(urlEndGeo)
                setData(result);
            })();
        }

        if (urlEndCompl) {
            (async function () {
                setdataComl(await sodertaljeModel.getJsonData(urlEndCompl));
            })();
        }

    }, []);


    let refinedData:Array<any> = [];

    if (urlEndJson) {
        // console.log(data[0]);
        refinedData = data
            .filter(dataItem => dataItem["name"] !== "")
            .map((dataItem) => {
                if (dataItem["name"] === "") {
                    return
                }
                if (dataItem["nord-koordinat (wgs84)"]) {
                    const refinedLat = dataItem["nord-koordinat (wgs84)"].replace(",", ".");
                    const refinedLong = dataItem["ost-koordinat (wgs84)"].replace(",", ".");
                    dataItem["nord-koordinat (wgs84)"] = refinedLat;
                    dataItem["ost-koordinat (wgs84)"] = refinedLong;
                }
                if (dataItem["latitude"]) {

                    const refinedLat = dataItem["latitude"].replace(",", ".");
                    const refinedLong = dataItem["longitude"].replace(",", ".");
                    dataItem["latitude"] = refinedLat;
                    dataItem["longitude"] = refinedLong;
                }
                console.log(dataItem);
                return {
                    "beskrivning": dataItem["beskrivning"]
                        ?? dataItem["information"]
                        ?? dataItem["informatiom"]
                        ?? dataItem["description"]
                        ?? dataItem["vägbeskrivning"],

                    "latitude": dataItem["nord-koordinat (wgs84)"]
                        ?? dataItem["latitude"],

                    "longitude": dataItem["ost-koordinat (wgs84)"]
                        ?? dataItem["longitude"],

                    "webbsida": dataItem["webbsida"]
                        ?? dataItem["visit_url"],

                    "namn": dataItem["﻿namn"]
                        ?? dataItem["name"]
                }
            });
    }

    // console.log(refinedData);

    if (urlEndGeo) {
        fitCoordinates = calculateFitCoordinatesGeoJson(data);
        refinedData = data
        .map((dataItem) => {
            // console.log(dataItem.features[0].properties.Namn);
            return {
                // "beskrivning": dataItem["beskrivning"]
                //     ?? dataItem["information"]
                //     ?? dataItem["informatiom"]
                //     ?? dataItem["vägbeskrivning"],

                // "webbsida": dataItem["webbsida"],
                "namn": dataItem.features[0].properties.Namn,
                "geoJson": dataItem
            }
        });
    }

    let refinedDataCompl: Array<any> = [];

    if (urlEndCompl) {
        console.log("REFINING COMPL DATA!!");
        refinedDataCompl = dataComl
            .map((dataItem) => {
                return {
                    "beskrivning": dataItem["beskrivning"]
                        ?? dataItem["information"]
                        ?? dataItem["informatiom"]
                        ?? dataItem["vägbeskrivning"],

                    "latitude": dataItem["nord-koordinat (wgs84)"],
                    "longitude": dataItem["ost-koordinat (wgs84)"],
                    "webbsida": dataItem["webbsida"],
                    "namn": dataItem["﻿namn"]
                }
            });
    }

    // console.log(refinedDataCompl);

    return (
        <Stack.Navigator initialRouteName="ListOrMap" >
            <Stack.Screen name="ListOrMap" component={ListOrMap} options={{ title: title }} />
            <Stack.Screen name="Detaljer" component={Details} />
            <Stack.Screen name="Lista">{(props) => <List {...props}
                listItems={refinedData}
                listItemsCompl={refinedDataCompl}
                title={title}
                subtitle={subtitle}
                urlEndJson={urlEndJson}
                urlEndGeo={urlEndGeo}
                urlEndCompl={urlEndCompl}
                fitCoordinates={fitCoordinates}
                />}
            </Stack.Screen>
            <Stack.Screen name="Karta">{(props) => <MapAll {...props}
                mapItems={refinedData}
                mapItemsCompl={refinedDataCompl}
                title={title}
                subtitle={subtitle}
                urlEndJson={urlEndJson}
                urlEndGeo={urlEndGeo}
                urlEndCompl={urlEndCompl}
                fitCoordinates={fitCoordinates}
            />}
            </Stack.Screen>
        </Stack.Navigator>
    );

    function calculateFitCoordinatesGeoJson(geoJsonHolder: any) {

        if (geoJsonHolder.length != 0) {
            let allCoordinates: Array<Array<number>> = [];

            const geoJsonHolderLength = geoJsonHolder.length;

            for (let i = 0; i < geoJsonHolderLength; i++) {

                const geoJsonLength = geoJsonHolder[i].features.length;
                for (let j = 0; j < geoJsonLength; j++) {
                    allCoordinates.push(...geoJsonHolder[i].features[j].geometry.coordinates);
                }
            }

            const lowestLat = allCoordinates.reduce((a, b) => a[1] < b[1] ? a : b)[1];
            const highestLat = allCoordinates.reduce((a, b) => a[1] > b[1] ? a : b)[1];

            const lowestLng = allCoordinates.reduce((a, b) => a[0] < b[0] ? a : b)[0];
            const highestLng = allCoordinates.reduce((a, b) => a[0] > b[0] ? a : b)[0];

            return [{ latitude: lowestLat, longitude: lowestLng }, { latitude: highestLat, longitude: highestLng }]

            }

    }
};
