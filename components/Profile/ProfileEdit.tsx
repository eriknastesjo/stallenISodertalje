import { Ionicons, Foundation, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import { Typography, Buttons, Images } from '../../styles';
import AuthModel from '../../models/auth';

import artefactsModel from '../../models/artefacts';
// import { showMessage } from 'react-native-flash-message';

export default function ProfileEdit(props) {

    function doLogout() {
        props.setIsLoggedIn(false);
        props.setArtefact({
            ownerName: "ägare",
            dogName: "hund",
        });
        AuthModel.logout();
        // showMessage({
        //     message: "Information",
        //     description: "Du är utloggad",
        //     type: "info",
        // });
    }

    return (
        <View>
            <Text style={Typography.header1}>Profil</Text>

            <Text></Text>

            {/* Hundägare */}
            <TouchableOpacity
                style={Buttons.buttonProfile}
                onPress={() => {props.navigation.navigate('Ägare');}}>
                <Image source={require("../../assets/heart.png")} style={Images.buttonIconStart} />
                <Text style={Typography.boldButtonSideWhite}>{props.artefact.ownerName}</Text>
                <View style={Buttons.buttonArrow}><AntDesign name="rightcircle" size={22} color="white" /></View>
            </TouchableOpacity>


            {/* Hund */}
            <TouchableOpacity
                style={Buttons.buttonProfile}
                onPress={() => {props.navigation.navigate('Hund');}}>
                <Image source={require("../../assets/heart.png")} style={Images.buttonIconStart} />
                <Text style={Typography.boldButtonSideWhite}>{props.artefact.dogName}</Text>
                <View style={Buttons.buttonArrow}><AntDesign name="rightcircle" size={22} color="white" /></View>
            </TouchableOpacity>

            <Text></Text>


                {/* Logga ut */}
            <TouchableOpacity
                style={Buttons.buttonLines}
                onPress={doLogout}
            >
                {/* <SimpleLineIcons name="login" size={20} color="#5BAF63" /> */}
                <Ionicons name="log-in-outline" size={27} color="#5BAF63" />
                <Text style={Typography.normalButtonSide}>    Logga ut</Text>
                <View style={Buttons.buttonArrow}><AntDesign name="rightcircle" size={22} color="#5BAF63" /></View>
            </TouchableOpacity>
        </View>
    );
};