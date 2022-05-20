import { Text, View } from "react-native";
import { Typography } from "../../styles";

export default function DogParkDetails({ route }) {
    const { dogPark } = route.params; // se i DogParkList funktionen listOfDogParks och vid 'Onpress'

    console.log(dogPark);

    return (
        <View>
            <Text style={Typography.boldCenter}>{dogPark["namn"]}</Text>
            <Text>{dogPark["webbsida"]}</Text>
        </View>
    );
};