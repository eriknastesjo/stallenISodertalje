import { Ionicons, Foundation, AntDesign, SimpleLineIcons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useState, useEffect, useRef } from "react";
import { Text, View, Platform, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Base, Typography, Images, Buttons } from "../../styles";
import MapView, { Marker, Geojson, Callout } from 'react-native-maps';
import * as Linking from 'expo-linking';
// import getCoordinates from '../../models/nominatim';
import * as Location from 'expo-location';
// import parkModel from "../../models/park";

export default function MapAll(props) {

    const { title, mapItems, mapItemsCompl, urlEndJson, urlEndGeo, urlEndCompl, fitCoordinates } = props;
    let listOfMapItems;
    let listOfMapItemsCompl;

    const [hoveringTitle, setHoveringTitle] = useState(null);
    // const [title, setTitle] = useState(props.title);
    // const [description, setDescription] = useState("Tryck på en markör eller slinga för att se detaljer.");
    const [hoveringGeoDescription, setHoveringGeoDescription] = useState(null);
    const [webpage, setWebpage] = useState(null);

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
    const markerRef = useRef<Array<Marker>>([]);
    const markerComplRef = useRef<Array<Marker>>([]);

    const [locationMarker, setLocationMarker] = useState(null);
    const [initRegion, setInitRegion] = useState(null);

    let listOfMarkId: Array<string> = [];


    // console.log(fitCoordinates);

    if (urlEndJson) {

        // CREATE COLOR MARKER STATE
        // useEffect(() => {
        //     let colorArray = []
        //     const mapItemsLength = mapItems.length;
        //     for (let i = 0; i < mapItemsLength; i++) {
        //         colorArray.push("red");
        //     }
        //     setAllIndiviualColors(colorArray);
        //     setAllIndiviualColorsOriginal([...colorArray]);
        // }, []);

        listOfMapItems = mapItems
            .map((mapItem, index) => {
                listOfMarkId.push('m' + index.toString());

                return <Marker
                    coordinate={{ latitude: parseFloat(mapItem["latitude"]), longitude: parseFloat(mapItem["longitude"]) }}
                    title={mapItem['namn']}
                    identifier={'m' + index.toString()}
                    key={index}
                    ref={element => markerRef[index] = element}
                    onCalloutPress={() => {
                        markerRef[index].hideCallout();
                    }}
                    onPress={() => {
                        // updateDetails(mapItem['namn'], mapItem['beskrivning'], mapItem['webbsida']);
                        updateHoveringTitle(null);
                        resetGeoDescription();
                        updateWebpage(mapItem['webbsida']);
                        // console.log(mapItem['beskrivning']);
                        // updateMarkerStyle(index);
                    }}>
                    <Callout>
                        <View style={Base.callout}>
                            {/* <AntDesign style={Base.calloutExit} name="rightcircle" size={20} color="#9AE9A1" /> */}
                            <Text style={Typography.calloutTitle}>{mapItem['namn']}</Text>
                            {
                                mapItem['beskrivning'] !== undefined && mapItem['beskrivning'] !== "" &&
                                <Text style={Typography.calloutDescription}>{mapItem['beskrivning']}</Text>
                            }
                            {
                                mapItem['beskrivning'] !== undefined && mapItem['beskrivning'] !== "" &&
                                <Entypo style={Base.calloutExit} name="circle-with-cross" size={12} color="#7B7B7B" />
                            }
                        </View>
                    </Callout>
                </Marker>
            });
    }

    // function updateMarkerStyle(index: number) {
    //     listOfMapItems[index] = <Marker
    //         coordinate={{ latitude: parseFloat(mapItems[index]["latitude"]), longitude: parseFloat(mapItems[index]["longitude"]) }}
    //         // title={mapItem["namn"]}
    //         identifier={'m' + index.toString()}
    //         pinColor="green"
    //         key={index}
    //         onPress={() => {
    //             // updateDetails(mapItem['namn'], mapItem['beskrivning'], mapItem['webbsida']);
    //             updateHoveringTitle(mapItems[index]['namn']);
    //             updateMarkerStyle(index);
    //         }} />
    // }

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
                        // console.log(data);
                        // updateDetails(mapItem['namn'], mapItem['beskrivning'], mapItem['webbsida']);
                        updateHoveringTitle(mapItem['namn']);
                        updateGeoStyle(index);
                        updateGeoDescription(mapItem);
                    }}
                />
            });
    }

    // console.log(mapItemsCompl);

    if (urlEndCompl) {
        listOfMapItemsCompl = mapItemsCompl
            .map((mapItem, index) => {
                // listOfMarkId.push('m' + index.toString());
                return <Marker
                    coordinate={{ latitude: parseFloat(mapItem["latitude"]), longitude: parseFloat(mapItem["longitude"]) }}
                    // title={mapItem["namn"]}
                    identifier={'m' + index.toString()}
                    key={index}
                    title={mapItem['namn']}
                    ref={element => markerComplRef[index] = element}
                    onCalloutPress={() => {
                        markerComplRef[index].hideCallout();
                    }}
                    onPress={() => {
                        // updateDetails(mapItem['namn'], mapItem['beskrivning'], mapItem['webbsida']);
                        // updateHoveringTitle(mapItem['namn']);
                        updateHoveringTitle(null);
                        resetGeoStyle();
                        resetGeoDescription();
                    }}>
                        <Callout>
                            <View style={Base.callout}>
                                <Text style={Typography.calloutTitle}>{mapItem['namn']}</Text>
                                {
                                    mapItem['beskrivning'] !== undefined && mapItem['beskrivning'] !== "" &&
                                    <Text>{mapItem['beskrivning']}</Text>
                                }
                                {
                                    mapItem['beskrivning'] !== undefined && mapItem['beskrivning'] !== "" &&
                                    <Entypo style={Base.calloutExit} name="circle-with-cross" size={12} color="#7B7B7B" />
                                }
                            </View>
                        </Callout>
                    </Marker>
            });
    }

    // console.log(listOfMarkId);

    // console.log(listOfMapItems[0]);

    // function updateMarkerStyle(index: number) {
    //     let newColArray = [... allIndiviualColorsOriginal];
    //     newColArray[index] = 'blue';
    //     setAllIndiviualColors(newColArray);
    // }

    function updateWebpage(urlPage: string) {
        {
            urlPage !== undefined && urlPage !== "" ?
                setWebpage(<View>
                        <TouchableOpacity
                            style={Buttons.buttonInRightCorner}
                            onPress={() => {
                                Linking.openURL(urlPage)
                            }}
                        >
                        <Text style={Typography.smallestButton}>   Webbsida</Text>
                        <View style={Buttons.buttonArrow3}><MaterialIcons name="arrow-right" size={20} color="white" /></View>
                        </TouchableOpacity>
                    </View>
                )
                :
                setWebpage(null);
        }
    }

    function updateGeoStyle(index: number) {
        // let newColArray = [... allIndiviualColorsOriginal];
        // newColArray[index] = 'blue';
        // setAllIndiviualColors(newColArray);
        // console.log("eeh");
        let newWidthArray = [...allIndiviualWidthsOriginal];
        newWidthArray[index] = 4;
        setAllIndiviualWidths(newWidthArray);
    }

    function resetGeoStyle() {
        let newWidthArray = [...allIndiviualWidthsOriginal];
        setAllIndiviualWidths(newWidthArray);
    }

    function updateTextMarker(lat: number, lng: number, name: string) {
        // console.log("updating");
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

    // function updateDetails (title: string, description: string, webpage: string) {
    //     // console.log("PRESSED");
    //     // console.log(title);
    //     setTitle(title);
    //     setDescription(description);
    //     // console.log(webbpage);
    //     setWebpage(webpage);
    // };

    function updateHoveringTitle(title: string | null) {
        // console.log("eh");
        // console.log(title);
        if (title === null) {
            setHoveringTitle(null);
        } else {
            setHoveringTitle(
                <TouchableOpacity
                    style={Base.titleOverMapHolder}
                    onPress={() => {
                        setHoveringTitle(null);
                    }}
                >
                    {/* <View >
                    </View> */}
                        <Text style={Base.titleOverMapText}>{title}</Text>
                        <View style={Base.arrowLeft}></View>
                        <View style={Base.arrowRight}></View>
                </TouchableOpacity>
            );
        }
    }

    function resetGeoDescription() {
        setHoveringGeoDescription(null);
    }


    function updateGeoDescription(geoData: any) {
        if (geoData['längd'] !== undefined ||
            geoData['underlag'] !== undefined ||
            geoData['svårighetsgrad'] !== undefined ||
            geoData['belysning'] !== undefined) {
            setHoveringGeoDescription(
                <TouchableOpacity
                    onPress={() => {
                        resetGeoDescription(null);
                    }}
                    style={Base.descriptionOverMapHolder}>
                    {
                        geoData['längd'] !== "" && geoData['längd'] !== undefined &&
                        <Text style={Base.descriptionOverMapText}>Längd: {geoData['längd']}</Text>
                    }
                    {
                        geoData['underlag'] !== "" && geoData['underlag'] !== undefined &&
                        <Text style={Base.descriptionOverMapText}>Underlag: {geoData['underlag']}</Text>
                    }
                    {
                        geoData['svårighetsgrad'] !== "" && geoData['svårighetsgrad'] !== undefined &&
                        <Text style={Base.descriptionOverMapText}>Svårighetsgrad: {geoData['svårighetsgrad']}</Text>
                    }
                    {
                        geoData['belysning'] !== "" && geoData['belysning'] !== undefined &&
                        <Text style={Base.descriptionOverMapText}>Belysning: {geoData['belysning']}</Text>
                    }
                    <Entypo style={Base.calloutExit2} name="circle-with-cross" size={12} color="#7B7B7B" />
                </TouchableOpacity>
            );
            }
    }

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
                <Text style={Typography.header2NoMargin}>{title}</Text>
                {
                    urlEndJson &&
                    <Text style={Typography.instructionUnderHeader}>Tryck på en markör för att se detaljer.</Text>
                }
                {
                    urlEndGeo && !urlEndCompl &&
                    <Text style={Typography.instructionUnderHeader}>Tryck på en slinga för att se detaljer.</Text>
                }
                {
                    urlEndGeo && urlEndCompl &&
                    <Text style={Typography.instructionUnderHeader}>Tryck på en slinga eller markör för att se detaljer.</Text>
                }
                {/* {
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
                } */}
            </View>
            <View style={Base.mapContainer}>
                <MapView
                    ref={mapRef}
                    loadingEnabled={true}
                    loadingIndicatorColor='#63AF69'
                    style={styles.map}
                    initialRegion={initRegion}
                    onPress={() => {
                        updateWebpage("");
                        updateHoveringTitle(null);
                        resetGeoStyle();
                        resetGeoDescription();
                    }}
                    onMapLoaded={() => {
                        if (Platform.OS === 'ios') {
                            mapRef?.current?.fitToElements(true);
                        } else {
                            if (fitCoordinates) {
                                mapRef?.current?.fitToCoordinates(fitCoordinates), {
                                    animated: true
                                }
                            } else {
                                mapRef?.current?.fitToSuppliedMarkers(listOfMarkId), {
                                    animated: true
                                }
                            }
                        }
                    }}
                >

                    {listOfMapItems}
                    {listOfMapItemsCompl}
                    {/* {textMarker} */}

                    {locationMarker}

                </MapView>
                {hoveringTitle}
                {hoveringGeoDescription}
            </View>
            {webpage}
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