import { Text, View, Button } from "react-native";
import { Typography } from "../../styles";
import * as Linking from 'expo-linking';

export default function DogParkDetails({ route }) {
    const { dogPark } = route.params; // se i DogParkList funktionen listOfDogParks och vid 'Onpress'

    return (
        <View>
            <Text style={Typography.boldCenter}>{dogPark["namn"]}</Text>
            {dogPark["webbsida"] !== "" ?
                dogPark["webbsida"] &&
                <Button
                    color='#313131'
                    title={"Webbsida"}
                    onPress={() => {
                        Linking.openURL(dogPark["webbsida"])
                    }}

                />
                :
                <Text></Text>
            }
        </View>
    );
};