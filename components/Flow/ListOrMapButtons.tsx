import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image } from 'react-native';
import { Typography, Base, Buttons, Images } from '../../styles';
import RefineData from './RefineData';
import { useState, useEffect } from 'react';
import sodertaljeModel from '../../models/sodertalje';

export default function ListOrMapButtons({ route, navigation, title, urlEndJson, urlEndGeo, urlEndCompl }) {

    const [data, setData] = useState<any>("");
    let hasReloaded = false;

    // RefineData kommer hämta data från model och "förfina" den baserat på om API är baserat på Json eller GeoJson.
    // ==========================================
    if (route.params !== undefined && route.params.reload === true && hasReloaded == false) {
        hasReloaded = true;
        getAndRefineData();
    }

    useEffect(() => {
        getAndRefineData();
    }, []);

    // Först hämtas rätt data från model beroende på url-ändelser.
    // RefineData "förfinar" datan så att den följer samma format oberoende av kategori.
    // ==========================================
    async function getAndRefineData() {
        if (urlEndJson) {
            const dataRaw = await sodertaljeModel.getJsonData(urlEndJson);
            let dataRawCompl = undefined;
            if (urlEndCompl) {
                dataRawCompl = await sodertaljeModel.getJsonData(urlEndCompl);
            }
            setData(RefineData(dataRaw, dataRawCompl, urlEndJson, urlEndGeo, urlEndCompl));
        }
        if (urlEndGeo) {
            const dataRaw = await sodertaljeModel.getGeoJsonData(urlEndGeo);
            let dataRawCompl = undefined;
            if (urlEndCompl) {
                dataRawCompl = await sodertaljeModel.getJsonData(urlEndCompl);
            }
            setData(RefineData(dataRaw, dataRawCompl, urlEndJson, urlEndGeo, urlEndCompl));
        }
    }

    function reloadListOrMap() {
        navigation.navigate("ListOrMap", {
            reload: true
        });
    }

    function goToList() {
        navigation.navigate("Lista", {
            listItems: data.refinedData,
            // listItemsCompl: data.refinedDataCompl,
            title: title,
            urlEndJson: urlEndJson,
            urlEndGeo: urlEndGeo,
            // urlEndCompl: urlEndCompl,
            // fitCoordinates: data.fitCoordinates
        });
    }

    function goToMap() {
        navigation.navigate("Karta", {
            mapItems: data.refinedData,
            mapItemsCompl: data.refinedDataCompl,
            title: title,
            urlEndJson: urlEndJson,
            urlEndGeo: urlEndGeo,
            urlEndCompl: urlEndCompl,
            fitCoordinates: data.fitCoordinates
        });
    }

    return (
        <View style={Base.centerContainer}>
            {
                data === "not found" ?
                    <View style={Base.content}>
                        <Text style={Typography.boldCenter2}>Något gick fel!</Text>
                        <Text style={Typography.normalCenter}>Tyvärr kunde inte informationen hämtas. Kontrollera att du är uppkopplad till internet. Tryck sedan på knappen nedan för att uppdatera.</Text>
                        <Text></Text>

                        <TouchableOpacity onPress={reloadListOrMap}>
                            <Image source={require("../../assets/reloadButton.png")} style={Images.buttonImageReload} />
                        </TouchableOpacity>
                    </View>
                    :
                    <View>
                        <Text style={Typography.boldCenter2}>
                            Välj vy
                        </Text>
                    <View style={Base.rowContainer}>
                        <View style={Buttons.buttonContainer}>
                            <TouchableOpacity onPress={goToList} style={Buttons.button}>
                                <Image source={require("../../assets/lista.png")} style={Images.buttonImageSmall} />
                                <Text style={Typography.boldCenterButton}>Lista</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={Buttons.buttonContainer}>
                            <TouchableOpacity onPress={goToMap} style={Buttons.button}>
                                <Image source={require("../../assets/karta.png")} style={Images.buttonImageSmall} />
                                <Text style={Typography.boldCenterButton}>Karta</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </View>

            }
        </View>
    );
};