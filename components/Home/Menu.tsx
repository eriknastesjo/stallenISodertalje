import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image } from 'react-native';
import { Typography, Base, Buttons, Images } from '../../styles';

export default function Menu({ profileName, dogName, isLoggedIn, navigation}) {

    function goToPark() {
        navigation.navigate("Park");
    }

    function goToDogPark() {
        navigation.navigate("Hundrastgård");
    }

    return (
        <View style={Base.centerContainer}>
            <Image source={require("../../assets/heart.png")} style={Images.heart} />
            <Text style={Typography.boldCenter}>Hej {profileName} och {dogName},</Text>
            <Text style={Typography.normalCenter}>vart vill ni gå idag?</Text>

            {
                isLoggedIn &&
                <Image source={require("../../assets/profilePic.png")} style={Images.profilePic} />
            }


            <View style={Base.rowContainer}>
                <View style={Buttons.buttonContainer}>
                    <TouchableOpacity onPress={goToPark} style={Buttons.button}>
                        <Image source={require("../../assets/park.png")} style={Images.buttonImage} />
                    </TouchableOpacity>
                </View>

                <View style={Buttons.buttonContainer}>
                    <TouchableOpacity onPress={goToDogPark} style={Buttons.button}>
                        <Image source={require("../../assets/hundrastgård.png")} style={Images.buttonImage} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};