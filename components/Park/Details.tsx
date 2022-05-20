import { Text, View } from "react-native";
import { Typography } from "../../styles";

export default function ParkDetails({ route }) {
    const { park } = route.params; // se i ParkList funktionen listOfParks och vid 'Onpress'

    console.log(park);

    return (
        <View>
            <Text style={Typography.boldCenter}>{park["namn"]}</Text>
            <Text>{park["beskrivning"]}</Text>
            <Text>{park["webbsida"]}</Text>
        </View>
    );
};