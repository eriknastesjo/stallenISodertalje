import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image } from 'react-native';
import { Typography, Base, Buttons, Images } from '../../styles';

export default function ListOrMapButtons({ navigation, data }) {


    function updateListOrMap() {
        console.log("update");
        navigation.navigate("ListOrMap");
    }

    function goToList() {
        navigation.navigate("Lista");
    }

    function goToMap() {
        navigation.navigate("Karta");
    }

    console.log("2");

    return (
        <View style={Base.centerContainer}>
            {
                data === undefined ?
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