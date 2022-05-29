import { useState, useEffect } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Base, Typography } from "../styles";
import MapView, { Marker } from 'react-native-maps';
// import getCoordinates from '../../models/nominatim';
import * as Location from 'expo-location';

export default function Map(props) {

    const park = props.park;

    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [initRegion, setInitRegion] = useState(null);

    useEffect(() => {
        (async () => {

            setMarker(<Marker
                coordinate={{ latitude: parseFloat(park.latitude), longitude: parseFloat(park.longitude) }}
                title={park.namn}
                identifier="there"
            />);

            console.log(park.namn);

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



    return (
            <MapView
                loadingEnabled={true}
                loadingIndicatorColor='#63AF69'
                style={styles.map}
                initialRegion={initRegion}
            // fitToSuppliedMarkers={["there", "here"]}
            >
                {/* {marker.forEach(element => {     // ANVÄND DETTA FÖR ATT LÄGGA IN FLERA MARKÖRER!!!
                    {element}
                })} */}

                {marker}
                {locationMarker}

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