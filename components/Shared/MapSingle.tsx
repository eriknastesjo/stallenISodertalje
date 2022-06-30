import { useState, useEffect, useRef } from "react";
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Geojson, Callout, Overlay, LatLng } from 'react-native-maps';
// import getCoordinates from '../../models/nominatim';
import * as Location from 'expo-location';
import { Base, Typography, Images } from "../../styles";
import geoData from "./testGeoData.json";

export default function Map(props) {

    const { mapItem, urlEndJson, urlEndGeo } = props;

    let mapItemRender;
    let textMarker;
    let fitCoordinates: any;

    // const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [initRegion, setInitRegion] = useState(null);

    const [strokeColor, setStrokeColor] = useState("red");

    const mapRef = useRef<MapView>(null);



    if (urlEndJson) {
        mapItemRender = <Marker
            coordinate={{ latitude: parseFloat(mapItem.latitude), longitude: parseFloat(mapItem.longitude) }}
            // title={mapItem.namn}
            title={"❤️️"}
            identifier="there"
        />;

        useEffect(() => {
            (async () => {
                setInitRegion({
                    latitude: parseFloat(mapItem.latitude),
                    longitude: parseFloat(mapItem.longitude),
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                })
            })();
        }, []);

    }

    if (urlEndGeo) {
        // todo: sätt textMarker också!!!
        fitCoordinates = calculateFitCoordinatesGeoJson(mapItem)
        // console.log(mapItem);
        mapItemRender = <Geojson
            geojson={mapItem.geoJson}
            strokeWidth={4}
            strokeColor={"red"}
            tappable={true}
        />

        textMarker= <Marker
            coordinate={{
                latitude: mapItem.geoJson.features[0].geometry.coordinates[0][1],
                longitude: mapItem.geoJson.features[0].geometry.coordinates[0][0]
            }}
            title={"Endast en ungefärlig startpunkt!"}
            identifier="textMarker"
        >
            {/* <Text style={Typography.mapLabel}>
                {name}
            </Text> */}
        </Marker>

        useEffect(() => {
            (async () => {
                setInitRegion({
                    latitude: 59.19554,
                    longitude: 17.62525,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                })
            })();
        }, []);
    }

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
            onMapLoaded={() => {
                // mapRef?.current?.fitToSuppliedMarkers(listOfMarkId), {
                //     animated: true
                // }
                mapRef?.current?.fitToCoordinates(fitCoordinates), {
                    animated: true
                }
            }}
            // onPress={e => console.log(e.nativeEvent)}
            // onPress={(e) => {
            //     console.log("onPress...");
            // }}
            // onPoiClick={(e) => {
            //     console.log("on Point Of Interest..."); // <------ add this
            // }}
        >
            {mapItemRender}
            {locationMarker}
            {textMarker}

        </MapView>
    );

    function calculateFitCoordinatesGeoJson(geoJsonHolder: any) {

        if (geoJsonHolder.length != 0) {

            let allCoordinates: Array<Array<number>> = [];

            const geoJsonLength = geoJsonHolder.geoJson.features.length;
            for (let j = 0; j < geoJsonLength; j++) {
                allCoordinates.push(...geoJsonHolder.geoJson.features[j].geometry.coordinates);
            }

            const lowestLat = allCoordinates.reduce((a, b) => a[1] < b[1] ? a : b)[1];
            const highestLat = allCoordinates.reduce((a, b) => a[1] > b[1] ? a : b)[1];

            const lowestLng = allCoordinates.reduce((a, b) => a[0] < b[0] ? a : b)[0];
            const highestLng = allCoordinates.reduce((a, b) => a[0] > b[0] ? a : b)[0];

            return [{ latitude: lowestLat, longitude: lowestLng }, { latitude: highestLat, longitude: highestLng }]

        }

    }

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