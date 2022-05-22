import { Text, View, Button, StyleSheet } from "react-native";
import { Base, Typography } from "../../styles";
import * as Linking from 'expo-linking';
import Map from "./Map";


export default function ParkDetails({ route }) {
    const { park } = route.params; // se i ParkList funktionen listOfParks och vid 'Onpress'

    const parkInArray: Array = [park];

    // const map = Map({ "parks": park });

    return (
        <View style={Base.container}>

            <View>
                <Text style={Typography.boldCenter}>{park.namn}</Text>
                <Text>{park.beskrivning}</Text>
                {park.webbsida !== "" ?
                    park.webbsida &&
                    <Button
                        color='#313131'
                        title={"Webbsida"}
                        onPress={() => {
                            Linking.openURL(park.webbsida)
                        }}

                    />
                    :
                    <Text></Text>
                }
            </View>

            <View style={Base.mapContainer}>
                <Map park={park} />
            </View>

        </View>
    );
};
