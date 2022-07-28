import { Ionicons, Foundation, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView, TouchableOpacity } from 'react-native';

import { Typography, Base, Buttons } from '../../../styles';


export default function List(props) {

    const { listItems, title, subtitle, urlEndJson, urlEndGeo, navigation } = props;

    // Funktion för att få listnamn i alfabetisk ordning.
    // ====================================
    listItems.sort((a, b) => {
        let fa = a.namn.toLowerCase(),
            fb = b.namn.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }

        return 0;
    });

    // Skapar knappar med i lista med platsnamn.
    // ====================================
    const listReturn = listItems
        .map((listItem, index) => {
            return <View style={Buttons.buttonContainer} key={index}>
                <TouchableOpacity
                    style={Buttons.button2}
                    onPress={() => {
                        navigation.navigate('Detaljer', {
                            // todo: Idé om att ha alla markörer/rutter med i Detaljer men centrerat på rätt markör/rutt
                            // Lägg till senare om vi utvecklar till att se alla positioner även i MapSingle mode.
                            // Dock just nu blir kanske lite knökigt med massa markörer överallt även om man centrerar på en av dem
                            // Behöver få upp Callout för rätt markör/rutt vid start

                            // mapItems: listItems,
                            mapItemFocused: listItem,
                            // mapItemsCompl: listItemsCompl,
                            // fitCoordinates: fitCoordinates,

                            urlEndJson: urlEndJson,
                            urlEndGeo: urlEndGeo,
                            // urlEndCompl: urlEndCompl
                        });
                    }}
                >
                    <Text style={Typography.normalButton}>   {listItem.namn}</Text>
                    <View style={Buttons.buttonArrow2}><AntDesign name="rightcircle" size={20} color="#9AE9A1" /></View>
                </TouchableOpacity>
            </View>
        });

    return (
        <ScrollView style={Base.backgroundCol}>
            <View>
                <Text style={Typography.header1}>{title}</Text>
            </View>
            {listReturn}
        </ScrollView>
    );
};