import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import { Typography, Base } from '../styles';

export default function Menu({ navigation}) {

    function goToPark() {
        navigation.navigate("Park");
    }

    function goToDogPark() {
        navigation.navigate("Hundrastgård");
    }

    return (
        <View>
            <Text style={Typography.boldCenter}>Hej ägare och hund,</Text>
            <Text style={Typography.normalCenter}>vart vill ni gå idag?</Text>

            <Button
                color='#313131'
                title="Park"
                onPress={goToPark}
            />

            <Button
                color='#313131'
                title="Hundrastgård"
                onPress={goToDogPark}
            />
        </View>
    );
};