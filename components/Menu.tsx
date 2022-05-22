import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image } from 'react-native';
import { Typography, Base, Buttons, Images } from '../styles';

export default function Menu({ navigation}) {

    function goToPark() {
        navigation.navigate("Park");
    }

    function goToDogPark() {
        navigation.navigate("Hundrastgård");
    }

    return (
        <View style={Base.centerContainer}>
            <Image source={require("../assets/heart.png")} style={Images.heart} />
            <Text style={Typography.boldCenter}>Hej ägare och hund,</Text>
            <Text style={Typography.normalCenter}>vart vill ni gå idag?</Text>

            <View style={Base.rowContainer}>
                <TouchableOpacity onPress={goToPark} style={Buttons.button}>
                    <Image source={require("../assets/park.png")} style={Images.buttonImage} />
                </TouchableOpacity>

                <TouchableOpacity onPress={goToDogPark} style={Buttons.button}>
                    <Image source={require("../assets/hundrastgård.png")} style={Images.buttonImage} />
                </TouchableOpacity>
            </View>

            {/* <Button
                color='#313131'
                title="Park"
                onPress={goToPark}
            /> */}

            {/* <Button
                color='#313131'
                title="Hundrastgård"
                onPress={goToDogPark}
            /> */}
        </View>
    );
};