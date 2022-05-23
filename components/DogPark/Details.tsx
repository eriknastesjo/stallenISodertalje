import { Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Base, Typography, Buttons } from "../../styles";
import * as Linking from 'expo-linking';
import Map from "../MapSingle";


export default function DogParkDetails({ route }) {
    const { dogPark } = route.params; // se i ParkList funktionen listOfParks och vid 'Onpress'

    return (
        <View style={Base.container}>

            <View style={Base.content}>
                <Text style={Typography.header2}>{dogPark.namn}</Text>
                {
                    dogPark.webbsida !== "" &&
                    <View style={Buttons.buttonContainer}>
                        <TouchableOpacity
                            style={Buttons.button2}
                            onPress={() => {
                                Linking.openURL(dogPark.webbsida)
                            }}
                        >
                            <Text style={Typography.smallButton}>Webbsida</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>

            <View style={Base.mapContainer}>
                <Map park={dogPark} />
            </View>

        </View>
    );
};
