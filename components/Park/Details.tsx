import { Text, View, Button } from "react-native";
import { Typography } from "../../styles";
import * as Linking from 'expo-linking';

export default function ParkDetails({ route }) {
    const { park } = route.params; // se i ParkList funktionen listOfParks och vid 'Onpress'

    return (
        <View>
            <Text style={Typography.boldCenter}>{park["namn"]}</Text>
            <Text>{park["beskrivning"]}</Text>
            {park["webbsida"] !== "" ?
                park["webbsida"] &&
                <Button
                    color='#313131'
                    title={"Webbsida"}
                    onPress={() => {
                        Linking.openURL(park["webbsida"])
                    }}

                />
                :
                <Text></Text>
            }

        </View>
    );
};