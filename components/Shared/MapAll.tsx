import { useState, useEffect, useRef } from "react";
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Base, Typography, Images, Buttons } from "../../styles";
import MapView, { Marker, Geojson } from 'react-native-maps';
import * as Linking from 'expo-linking';
// import getCoordinates from '../../models/nominatim';
import * as Location from 'expo-location';
// import parkModel from "../../models/park";

export default function MapAll(props) {

    const { mapItems, mapItemsCompl, urlEndJson, urlEndGeo, urlEndCompl, fitCoordinates } = props;
    let listOfMapItems;
    let listOfMapItemsCompl;

    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState("Tryck på en markör eller slinga för att se detaljer.");
    const [webbpage, setWebpage] = useState("");

    const [allIndiviualColors, setAllIndiviualColors] = useState(["black"]);
    const [allIndiviualColorsOriginal, setAllIndiviualColorsOriginal] = useState(["black"]);
    const colorPalette = ["#0000FF", "#FF0000", "#E500FF", "#00955F", "#000000", "#6400A1", "#1EB81C"];
    // const colorPaletteOriginal = colorPalette;

    const colorPaletteLength = colorPalette.length;
    // let colorIndex = -1;

    const [allIndiviualWidths, setAllIndiviualWidths] = useState([2]);
    const [allIndiviualWidthsOriginal, setAllIndiviualWidthsOriginal] = useState([2]);

    const [textMarker, settextMarker] = useState(null);

    const mapRef = useRef<MapView>(null);

    const [locationMarker, setLocationMarker] = useState(null);
    const [initRegion, setInitRegion] = useState(null);

    let listOfMarkId: Array<string> = [];


    console.log(fitCoordinates);

    if (urlEndJson) {
        listOfMapItems = mapItems
            .map((mapItem, index) => {
                listOfMarkId.push('m' + index.toString());
                return <Marker
                    coordinate={{ latitude: parseFloat(mapItem["latitude"]), longitude: parseFloat(mapItem["longitude"]) }}
                    title={mapItem["namn"]}
                    identifier={'m' + index.toString()}
                    key={index}
                    onPress={() => {
                        updateDetails(mapItem['namn'], mapItem['beskrivning'], mapItem['webbsida']);
                    }}/>
            });
    }

    if (urlEndGeo) {
        console.log("DOING GEOJSON");

        // CREATE COLOR STATE
        useEffect(() => {
            let colorArray = []
            const mapItemsLength = mapItems.length;
            for (let i = 0; i < mapItemsLength; i++) {
                colorArray.push(colorPalette[i % colorPaletteLength]);
            }
            setAllIndiviualColors(colorArray);
            setAllIndiviualColorsOriginal([...colorArray]);
        }, []);

        // CREATE STROKE WIDTH STATE
        useEffect(() => {
            let widthArray = []
            const mapItemsLength = mapItems.length;
            for (let i = 0; i < mapItemsLength; i++) {
                widthArray.push(2);
            }
            setAllIndiviualWidths(widthArray);
            setAllIndiviualWidthsOriginal([...widthArray]);
        }, []);

        listOfMapItems = mapItems
            .map((mapItem, index) => {
                // console.log(mapItem.geoJson.features[0].geometry.coordinates[0]);
                // console.log(mapItem['namn']);
                return <Geojson
                    geojson={mapItem.geoJson}
                    strokeWidth={allIndiviualWidths[index]}
                    // strokeWidth={5}
                    strokeColor={allIndiviualColors[index]}
                    // lineDashPattern={[1, 4]}
                    tappable={true}
                    key={index}
                    onPress={(data: any) => {
                        // updateTextMarker(
                        //     mapItem.geoJson.features[0].geometry.coordinates[0][1],
                        //     mapItem.geoJson.features[0].geometry.coordinates[0][0],
                        //     mapItem['namn']
                        // );
                        // console.log("helluuu?");
                        console.log(data);
                        updateDetails(mapItem['namn'], mapItem['beskrivning'], mapItem['webbsida']);
                        updateGeoStyle(index);
                    }}
                />
            });
    }

    console.log(mapItemsCompl);

    if (urlEndCompl) {
        listOfMapItemsCompl = mapItemsCompl
            .map((mapItem, index) => {
                // listOfMarkId.push('m' + index.toString());
                return <Marker
                    coordinate={{ latitude: parseFloat(mapItem["latitude"]), longitude: parseFloat(mapItem["longitude"]) }}
                    title={mapItem["namn"]}
                    identifier={'m' + index.toString()}
                    key={index}
                    onPress={() => {
                        updateDetails(mapItem['namn'], mapItem['beskrivning'], mapItem['webbsida']);
                    }} />
            });
    }

    // console.log(listOfMarkId);

    // console.log(listOfMapItems[0]);

    function updateGeoStyle(index: number) {
        // let newColArray = [... allIndiviualColorsOriginal];
        // newColArray[index] = 'blue';
        // setAllIndiviualColors(newColArray);
        // console.log("eeh");
        let newWidthArray = [... allIndiviualWidthsOriginal];
        newWidthArray[index] = 4;
        setAllIndiviualWidths(newWidthArray);
    }

    function updateTextMarker(lat: number, lng: number, name: string) {
        console.log("updating");
        settextMarker(<Marker
            coordinate={{ latitude: parseFloat(lat), longitude: parseFloat(lng) }}
            identifier="textMarker"
        >
            {/* <Text style={Typography.mapLabel}>
                {name}
            </Text> */}
        </Marker>
        );
    };

    function updateDetails (title: string, description: string, webpage: string) {
        // console.log("PRESSED");
        // console.log(title);
        setTitle(title);
        setDescription(description);
        // console.log(webbpage);
        setWebpage(webpage);
    };


    // console.log(listOfMarkId);
    // console.log(listOfMapItems);

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

    // console.log(listOfMapItems[4]);
    return (
        <View style={Base.container}>
            {/* <Text style={Typography.header2}>{props.title}</Text> */}
            <View style={Base.content}>
                <Text style={Typography.header2}>{title}</Text>
                {
                    description !== "" && description !== undefined &&
                    <Text style={Typography.normalCenter}>{description}</Text>
                }
                {
                    webbpage !== "" && webbpage !== undefined &&
                    <View style={Buttons.buttonContainer}>
                        <TouchableOpacity
                            style={Buttons.buttonCenter}
                            onPress={() => {
                                Linking.openURL(webbpage)
                            }}
                        >
                            <Text style={Typography.smallButton}>Webbsida</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
            <View style={Base.mapContainer}>
                <MapView
                    ref={mapRef}
                    loadingEnabled={true}
                    loadingIndicatorColor='#63AF69'
                    style={styles.map}
                    initialRegion={initRegion}
                    onMapLoaded={() => {
                        if (fitCoordinates) {
                            mapRef?.current?.fitToCoordinates(fitCoordinates), {
                                animated: true
                            }
                        } else {
                            mapRef?.current?.fitToSuppliedMarkers(listOfMarkId), {
                                animated: true
                            }
                        }

                    }}
                >
                    {listOfMapItems}
                    {listOfMapItemsCompl}
                    {/* {textMarker} */}

                    {locationMarker}

                </MapView>

                <View style={Base.titleOverMapHolder}>
                    <View style={Base.arrowLeft}></View>
                    <Text style={Base.titleOverMapText}>Måsnareleden</Text>
                    <View style={Base.arrowRight}></View>
                </View>

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