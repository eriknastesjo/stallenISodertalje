import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image } from 'react-native';
import { Typography, Base, Buttons, Images } from '../../styles';
import GetData from './RefineData';
import { useState, useEffect } from 'react';
import sodertaljeModel from '../../models/sodertalje';

export default function ListOrMapButtons({ route, navigation, title, urlEndJson, urlEndGeo, urlEndCompl }) {

    // const { navigation, title, urlEndJson, urlEndGeo, urlEndCompl } = props;
    // let data: any;
    const [data, setData] = useState<any>("");
    let hasReloaded = false;

    if (route.params !== undefined && route.params.reload === true && hasReloaded == false) {
        hasReloaded = true;
        getAndRefineData();
    }

    // GetData kommer hämta data från model och "förfina" den baserat på om API är baserat på Json eller GeoJson.
    // ==========================================
    // data = GetData({ urlEndJson, urlEndGeo, urlEndCompl });

    useEffect(() => {
        getAndRefineData();
        // (async function () {
        //     const dataRaw = await sodertaljeModel.getJsonData(urlEndJson);
        //     setData(GetData(dataRaw, urlEndJson, urlEndGeo, urlEndCompl));
        // })();
    }, []);

    async function getAndRefineData() {
        const dataRaw = await sodertaljeModel.getJsonData(urlEndJson);
        setData(GetData(dataRaw, urlEndJson, urlEndGeo, urlEndCompl));
    }

    function updateListOrMap() {
        navigation.navigate("ListOrMap", {
            reload: true
        });
    }

    console.log("render again");

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

                        <TouchableOpacity onPress={updateListOrMap} style={Buttons.button}>
                            <Text style={Typography.boldCenterButton}>UPPDATERA</Text>
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