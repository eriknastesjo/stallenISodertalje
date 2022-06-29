import { useState, useEffect, useRef } from "react";
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Geojson, Callout, Overlay, LatLng } from 'react-native-maps';
// import getCoordinates from '../../models/nominatim';
import * as Location from 'expo-location';
import { Base, Typography, Images } from "../../styles";
import geoData from "./testGeoData.json";

export default function Map(props) {

    const park = props.park;


    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [initRegion, setInitRegion] = useState(null);

    const [strokeColor, setStrokeColor] = useState("red");

    const [textMarker, settextMarker] = useState(null);

    const mapRef = useRef<MapView>(null);

    let listOfMarkId: Array<string> = [];


    // let listOfLatLng:any;    // FIXA SEN FÖR ATT FÅ TILL FIT TO COORD
    // const testPathLength = testPath.features.length;
    // for (let i = 0; i < testPathLength; i++) {
    //     console.log(i);
    //     listOfLatLng = testPath.features[i].geometry.coordinates.map((mapItem) => {
    //         console.log("a");
    //         return {
    //             // latitude: mapItem[1],
    //             // longitude: mapItem[0]
    //         }
    //     })
    // }

    // console.log(listOfLatLng);


    // let listOfLatLng = testPath.features.map((mapItem) => {
    //     console.log(mapItem.geometry.coordinates)
    //     return {
    //         mapItem.geometry.coordinates.map((mapItemm) => {

    //         })

    //             latitude: mapItem.[1],
    //             longitude: mapItem[0]
    //         }
    //     });

    // let listOfLatLng = mapItemsTest.map((mapItem) => {
    //     console.log(mapItem)
    //     return {
    //             latitude: mapItem[1],
    //             longitude: mapItem[0]
    //         }
    //     });

    useEffect(() => {
        (async () => {

            setMarker(<Marker
                coordinate={{ latitude: parseFloat(park.latitude), longitude: parseFloat(park.longitude) }}
                title={park.namn}
                identifier="there"
            />
            );

            // todo: set textMarker instead if geoJson!!

            setInitRegion({
                latitude: parseFloat(park.latitude),
                longitude: parseFloat(park.longitude),
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
            })
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
                identifier="here"
            />);
        })();
    }, []);

    // console.log(mapRef);

    return (
        <MapView
            ref={mapRef}
            loadingEnabled={true}
            loadingIndicatorColor='#63AF69'
            style={styles.map}
            initialRegion={initRegion}
            // onMapLoaded={() => {
            //     // mapRef?.current?.fitToSuppliedMarkers(listOfMarkId), {
            //     //     animated: true
            //     // }
            //     mapRef?.current?.fitToCoordinates(listOfLatLng), {   // todo: vänta med detta. Kanske komma på ett generellt sätt att räkna ut passande referenskoordinatorer för både markörer och slingor i sodertalje modell?
            //         animated: true
            //     }
            // }}
            onPress={e => console.log(e.nativeEvent)}   // todo: kanske kan denna användas snarare för att ta bort textMarkören? (även i MapAll)
        >
            {marker}
            {locationMarker}
            {textMarker}

            {/* <Geojson
                geojson={testPath}  // todo: istället för denna - ersätt med referens till riktigt geoJsonobjekt!
                strokeWidth={4}
                strokeColor={strokeColor}
                tappable={true}
                // onPress={(data: any) => {    // Tror inte att onPress behövs i MapSingle!
                //     // console.log(data.feature.properties.Namn);
                //     // console.log(data.coordinates[0].latitude);
                //     // console.log(data.coordinates[0].longitude);
                //     console.log(data);
                //     updateTextMarker(data.coordinates[0].latitude, data.coordinates[0].longitude, data.feature.properties.Namn);
                //     updateStrokeColor();
                // }}
            /> */}
        </MapView>
    );
};


const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});