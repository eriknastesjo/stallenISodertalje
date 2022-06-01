import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image } from 'react-native';
import { Typography, Base, Buttons, Images } from '../../styles';

export default function Categories({ artefact, isLoggedIn, navigation}) {

    function goToPark() {
        // navigation.navigate("Park");
        navigation.navigate('Park', {
            title: 'Parker',
            urlEnd: '2cc90eb1-2c6a-444b-ab52-e4bcd22c7130',
        });
    }

    function goToDogPark() {
        // navigation.navigate("Hundrastgård");
        navigation.navigate('Hundrastgård', {
            title: 'Hundrastgårdar',
            urlEnd: '1d83a1df-16ca-4bfd-8bc7-242747231b60',
        });
    }

    function goToWalkingTrail() {
        // navigation.navigate("Vandringsled");
        navigation.navigate('Vandringsled', {
            title: 'Vandringsleder',
            urlEnd: 'f6b33e8d-19bd-4d2d-a59b-35c4df352a2c',
        });
    }

    function goToNatureReserve() {
        // navigation.navigate("Naturreservat");
        navigation.navigate('Naturreservat', {
            title: 'Naturreservat',
            urlEnd: '57743863-81ce-461a-9887-791b492f4522',
        });
    }


    return (
        <View style={Base.centerContainer}>
            <Image source={require("../../assets/heart.png")} style={Images.heart} />
            <Text style={Typography.boldCenter}>Hej {artefact.ownerName} och {artefact.dogName},</Text>
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
            <View style={Base.rowContainer}>
                <View style={Buttons.buttonContainer}>
                    <TouchableOpacity onPress={goToWalkingTrail} style={Buttons.button}>
                        <Image source={require("../../assets/hundrastgård.png")} style={Images.buttonImage} />
                    </TouchableOpacity>
                </View>
                <View style={Buttons.buttonContainer}>
                    <TouchableOpacity onPress={goToNatureReserve} style={Buttons.button}>
                        <Image source={require("../../assets/hundrastgård.png")} style={Images.buttonImage} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};