import { Ionicons, Foundation, AntDesign, SimpleLineIcons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useState, useEffect, useRef } from "react";
import { Text, View, Platform, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Base, Typography, Images, Buttons } from "../../../styles";
import MapView, { Marker, Geojson, Callout } from 'react-native-maps';
import * as Linking from 'expo-linking';
import * as Location from 'expo-location';

export default function MapAll({route}) {

    // const { title, mapItems, mapItemsCompl, urlEndJson, urlEndGeo, urlEndCompl, fitCoordinates } = props;
    const { title, mapItems, mapItemsCompl, urlEndJson, urlEndGeo, urlEndCompl, fitCoordinates } = route.params;

    let listOfMapItems;
    let listOfMapItemsCompl;

    // Flytande information som lägger sig ovanpå kartan.
    // =============================
    const [hoveringGeoTitle, setHoveringGeoTitle] = useState(null);
    const [hoveringGeoDescription, setHoveringGeoDescription] = useState(null);
    const [webpage, setWebpage] = useState(null);

    // Färgpalett för rutter i geoJson-objekt.
    // =============================
    const colorPalette = ["#0000FF", "#FF0000", "#E500FF", "#00955F", "#000000", "#6400A1", "#1EB81C"];
    const colorPaletteLength = colorPalette.length;

    // State för linjebreddar för geoJson-objekt.
    // =============================
    const [allIndiviualWidths, setAllIndiviualWidths] = useState([2]);
    const [allIndiviualWidthsOriginal, setAllIndiviualWidthsOriginal] = useState([2]);

    const mapRef = useRef<MapView>(null);
    const markerRef = useRef<Array<Marker>>([]);
    const markerComplRef = useRef<Array<Marker>>([]);

    // LocationMarker visar markör över användarens position.
    // =============================
    const [locationMarker, setLocationMarker] = useState(null);
    const [initRegion, setInitRegion] = useState(null);

    // listOfMarkId används vid JsonObjekt vid fitToSuppliedMarkers.
    let listOfMarkId: Array<string> = [];


    if (urlEndJson) {

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
                        updateHoveringGeoTitle(null);
                        resetGeoDescription();
                        updateWebpage(mapItem['webbsida']);
                    }}>
                    <Callout>
                        <View style={Base.callout}>
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

    if (urlEndGeo) {

        // Skapar färg för varje enskild rutt.
        // ==========================
        let colorArray: Array<string> = []
        const mapItemsLength = mapItems.length;
        for (let i = 0; i < mapItemsLength; i++) {
            colorArray.push(colorPalette[i % colorPaletteLength]);
        }

        // Skapar linjebredd för varje rutt (sparas i state så att det ändras när användaren trycker på en rutt).
        // =========================
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
                return <Geojson
                    geojson={mapItem.geoJson}
                    strokeWidth={allIndiviualWidths[index]}
                    strokeColor={colorArray[index]}
                    // lineDashPattern={[1, 4]}
                    tappable={true}
                    key={index}
                    onPress={() => {
                        updateHoveringGeoTitle(mapItem['namn']);
                        updateGeoStyle(index);
                        updateGeoDescription(mapItem);
                    }}
                />
            });
    }

    if (urlEndCompl) {
        listOfMapItemsCompl = mapItemsCompl
            .map((mapItem, index) => {
                return <Marker
                    coordinate={{ latitude: parseFloat(mapItem["latitude"]), longitude: parseFloat(mapItem["longitude"]) }}
                    identifier={'m' + index.toString()}
                    key={index}
                    title={mapItem['namn']}
                    ref={element => markerComplRef[index] = element}
                    onCalloutPress={() => {
                        markerComplRef[index].hideCallout();
                    }}
                    onPress={() => {
                        updateHoveringGeoTitle(null);
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

    // Om användaren trycker på markör eller rutt så uppdateras denna information (blir tom om webbplats saknas).
    // =================================================
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
        let newWidthArray = [...allIndiviualWidthsOriginal];
        newWidthArray[index] = 4;
        setAllIndiviualWidths(newWidthArray);
    }

    function resetGeoStyle() {
        let newWidthArray = [...allIndiviualWidthsOriginal];
        setAllIndiviualWidths(newWidthArray);
    }

    function updateHoveringGeoTitle(title: string | null) {
        if (title === null) {
            setHoveringGeoTitle(null);
        } else {
            setHoveringGeoTitle(
                <TouchableOpacity
                    style={Base.titleOverMapHolder}
                    onPress={() => {
                        setHoveringGeoTitle(null);
                    }}
                >
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
        // todo: just nu visas inga detaljer om längd, underlag osv om inte ALLA finns med. Kan behöva ändras senare om vissa platser saknar några av detaljerna.
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

    // Initial region sätts över Södertälje stad.
    // =============================
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

    return (
        <View style={Base.container}>
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
                        updateHoveringGeoTitle(null);
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

                    {locationMarker}

                </MapView>
                {hoveringGeoTitle}
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