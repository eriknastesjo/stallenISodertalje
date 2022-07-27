import { useState, useEffect, useRef } from "react";
import { Text, View, Button, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Base, Typography, Buttons } from "../../../styles";
import * as Linking from 'expo-linking';
import MapSingle from "../Map/MapSingle";


export default function Details({ route }) {
    const { mapItemFocused, urlEndJson, urlEndGeo, urlEndCompl } = route.params;

    return (
        <View style={Base.container}>
            <Text style={Typography.header2}>{mapItemFocused.namn}</Text>
            <View style={Base.contentMaxHeight}>
                {
                    // MaxHeight har införts så att detaljinfo inte täcker mer än 40 % av skärmutrymmet. Om detaljinfo överstiger detta så får användaren scrolla för att se all info.
                    // =======================================================
                }
                <ScrollView>
                {
                    mapItemFocused.beskrivning !== undefined && mapItemFocused.beskrivning !== "" &&
                    <Text style={Typography.normalCenter}>{mapItemFocused.beskrivning}</Text>
                }
                {
                    mapItemFocused.webbsida !== undefined && mapItemFocused.webbsida !== "" &&
                    <View style={Buttons.buttonContainer}>
                        <TouchableOpacity
                            style={Buttons.buttonCenter}
                            onPress={() => {
                                Linking.openURL(mapItemFocused.webbsida)
                            }}
                            >
                            <Text style={Typography.smallButton}>Webbsida</Text>
                        </TouchableOpacity>
                    </View>
                }
                {
                    // todo: just nu visas inga detaljer om längd, underlag osv om inte ALLA finns med. Kan behöva ändras senare om vissa platser saknar några av detaljerna.
                    (mapItemFocused['längd'] !== undefined ||
                    mapItemFocused['underlag'] !== undefined ||
                    mapItemFocused['svårighetsgrad'] !== undefined ||
                    mapItemFocused['belysning'] !== undefined) &&
                    <Text style={Typography.normalCenter}>
                        {
                            mapItemFocused['längd'] !== "" && mapItemFocused['längd'] !== undefined &&
                            <Text>Längd: {mapItemFocused['längd']}.</Text>
                        }
                        {
                            mapItemFocused['underlag'] !== "" && mapItemFocused['underlag'] !== undefined &&
                            <Text> Underlag: {mapItemFocused['underlag']}.</Text>
                        }
                        {
                            mapItemFocused['svårighetsgrad'] !== "" && mapItemFocused['svårighetsgrad'] !== undefined &&
                            <Text> Svårighetsgrad: {mapItemFocused['svårighetsgrad']}.</Text>
                        }
                        {
                            mapItemFocused['belysning'] !== "" && mapItemFocused['belysning'] !== undefined &&
                            <Text> Belysning: {mapItemFocused['belysning']}.</Text>
                        }
                    </Text>
                }

            </ScrollView>
            </View>

            <View style={Base.mapContainer}>
                <MapSingle mapItem={mapItemFocused}
                    urlEndJson={urlEndJson}
                    urlEndGeo={urlEndGeo}
                    // urlEndCompl={urlEndCompl}
                />
            </View>

        </View>
    );

};