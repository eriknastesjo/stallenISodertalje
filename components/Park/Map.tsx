import { useState, useEffect } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Base, Typography } from "../../styles";
import MapView, { Marker } from 'react-native-maps';
// import getCoordinates from '../../models/nominatim';
import * as Location from 'expo-location';

export default function Map(props) {

    const park = props.park;
    // console.log(park);

    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [initRegion, setInitRegion] = useState(null);

    useEffect(() => {
        (async () => {
            // const results = await getCoordinates(`${order.address}, ${order.city}`);
            // parks.forEach((function () {

            //     setMarker(<Marker       // ändra senare till att LÄGGA TILL så att det blir en array...
            //         coordinate={{ latitude: park["latitude"], longitude: park["longitude"] }}
            //         title={results[0].display_name}
            //         identifier="there"
            //     />);

            //     setInitRegion({
            //         latitude: park["latitude"],
            //         longitude: park["longitude"],
            //         latitudeDelta: 0.1,
            //         longitudeDelta: 0.1,
            //     })

            // }));

            // console.log("eeh?");

            setMarker(<Marker       // ändra senare till att LÄGGA TILL så att det blir en array...
                coordinate={{ latitude: parseFloat(park.latitude), longitude: parseFloat(park.longitude) }}
                title={park.namn}
                identifier="there"
            />);

            console.log(park.namn);

            setInitRegion({
                latitude: parseFloat(park.latitude),
                longitude: parseFloat(park.longitude),
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
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