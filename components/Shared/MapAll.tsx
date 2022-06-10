import { useState, useEffect } from "react";
import { Text, View, ScrollView, StyleSheet, Image } from "react-native";
import { Base, Typography, Images } from "../../styles";
import MapView, { Marker } from 'react-native-maps';
// import getCoordinates from '../../models/nominatim';
import * as Location from 'expo-location';
// import parkModel from "../../models/park";
import { useRef } from "react";

export default function MapAll(props) {

    const mapItems = props.mapItems;
    const markerImgURL = props.markerImgURL;    // är tänkt för att kunna skapa custom markers i framtiden
    let listOfMarks;

    const mapRef = useRef<MapView>(null);

    // const [markers, setAllMarkers] = useState(null); // hinner inte uppdateras innan kartan renderar markörer
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [initRegion, setInitRegion] = useState(null);

    let listOfMarkId: Array<string> = [];

    listOfMarks = mapItems
        .map((mapItem, index) => {
            listOfMarkId.push('m' + index.toString());
            return <Marker
                coordinate={{ latitude: parseFloat(mapItem["latitude"]), longitude: parseFloat(mapItem["longitude"]) }}
                title={mapItem["namn"]}
                identifier={'m' + index.toString()}
                key={index}
            />
        });

    // console.log(listOfMarkId);

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
                title="Här är du"
                identifier="here"
                pinColor="blue"
            />);
        })();
    }, []);

    // console.log(listOfMarks);

    return (
        <View style={Base.container}>
            {/* <Text style={Typography.header2}>{props.title}</Text> */}
            {props.subtitle !== undefined ?
                <View>
                    <Text style={Typography.header2NoMargin}>{props.title}</Text>
                    <Text style={Typography.header3LessMargin}>{props.subtitle}</Text>
                </View>
                :
                <View>
                    <Text style={Typography.header2}>{props.title}</Text>
                </View>
            }
            <View style={Base.mapContainer}>
                <MapView
                    ref={mapRef}
                    loadingEnabled={true}
                    loadingIndicatorColor='#63AF69'
                    style={styles.map}
                    initialRegion={initRegion}
                    onMapLoaded={() => {
                        mapRef?.current?.fitToSuppliedMarkers(listOfMarkId), {
                            animated: true
                        }
                    }}
                >
                    {listOfMarks}
                    {locationMarker}
                </MapView>
            </View>
        </View>
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