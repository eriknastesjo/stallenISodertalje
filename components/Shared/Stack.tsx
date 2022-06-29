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
    const { title, subtitle, urlEndJson, urlEndGeo, urlEndCompl, dataType } = route.params;
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


    // TODO:
    // ---- KLART ----
    // 1. FIXA CONFIG SÅ ATT DET ÄR https://catalog.sodertalje.se/
    // DÅ KAN MAN FYLLA I MED urlEND /rowstore/dataset/... om det är JSON eller /store/1/resource/... om det är GEOJSON. OBS!!! SAMTLIGA URLÄNDELSER BEHÖVER ÄNDRAS!!
    // 2. TA MED NEDAN I REFINEDDATA TYP "geoKoordinationer" OCH "geoNamn" (fyll eventuellt på med fler detaljer senare)
    // 3. FIXA I LIST SÅ ATT DEN KAN LÄSA AV GEONAMN OCH LISTA DEM (kanske inte behövs med ?? i ListorMap?)
    // 4. HITTA TVÅ YTTRE KOORDINATIONER SÅ ATT KARTAN KAN ANPASSA SIG I BÖRJAN (FITTOCOORDINATES)
    // 5. FIXA I MAPSINGLE SÅ ATT DEN KAN LÄSA AV GEONAMN OCH GEOKOORDINATIONER
    // 6. HA "COMPLEMENTARY JSON" SÅ ATT MAN KAN FÅ IN DET I VANDRINGSLEDER (startpunkter) OCH MOTIONSSPÅR (paring)

    // ---- BEHÖVER FIXAS ----
    // 7. (PROVA FÖRST NR 8) LÄGG TILL + SYMBOL FÖR ATT VISA/DÖLJA INFO I MAPVIEW (STATE I APP SOM SPARAS I TOKEN SÅ ATT MAN INTE MÅSTE STÄLLA IN VARJE GÅNG)
    // 8. FÖRSÖK FÅ MJUKARE ÖVERGÅNG MED OVERFLOW HIDDEN + TRANSITION ANIM ... (TVEKSAMT DOCK OM DET FAKTISKT GÅR)
    // 9. BILDER
    // 10. ORDNA MED CATEGORIES I APP.tsx


    let refinedData:Array<any> = [];

    if (urlEndJson) {
        refinedData = data
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

    console.log(refinedDataCompl);

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
