import { Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Base, Typography, Buttons } from "../../styles";
import * as Linking from 'expo-linking';
import Map from "../MapSingle";


export default function ParkDetails({ route }) {
    const { park } = route.params; // se i ParkList funktionen listOfParks och vid 'Onpress'

    return (
        <View style={Base.container}>

            <View style={Base.content}>
                <Text style={Typography.header2}>{park.namn}</Text>
                {
                    park.beskrivning !== "" &&
                    <Text style={Typography.normalCenter}>{park.beskrivning}</Text>
                }
                {
                    park.webbsida !== "" &&
                    <View style={Buttons.buttonContainer}>
                        <TouchableOpacity
                            style={Buttons.button2}
                            onPress={() => {
                                Linking.openURL(park.webbsida)
                            }}
                        >
                            <Text style={Typography.smallButton}>Webbsida</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>

            <View style={Base.mapContainer}>
                <Map park={park} />
            </View>

        </View>
    );
};
