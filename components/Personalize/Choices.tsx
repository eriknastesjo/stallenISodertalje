import { showMessage } from 'react-native-flash-message';
import { Ionicons, Foundation, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import { Typography, Buttons, Images, Base } from '../../styles';
import AuthModel from '../../models/auth';

// import artefactsModel from '../../models/artefacts';
// import { showMessage } from 'react-native-flash-message';

export default function Choices(props) {

    console.log("AHAAA");
    console.log(props.profilepics);
    console.log(props.picNum);
    console.log(props.profilepics[props.picNum]);

    return (
        <View style={Base.backgroundCol}>
            <Text style={Typography.header1}>Profil</Text>

            <Text></Text>

            {/* Namn */}
            <TouchableOpacity
                style={Buttons.buttonProfile}
                onPress={() => {props.navigation.navigate('Namn');}}>
                <Image source={require("../../assets/ownerIcon.png")} style={Images.buttonIconStart} />
                {/* <Text style={Typography.boldButtonSideWhite}>{props.name}</Text> */}
                {props.name === "" ?
                    <Text style={Typography.boldButtonSideWhite}>Välj namn</Text>
                    :
                    <Text style={Typography.boldButtonSideWhite}>{props.name}</Text>
                }
                <View style={Buttons.buttonArrow}><AntDesign name="rightcircle" size={22} color="white" /></View>
            </TouchableOpacity>

            {/* Bild */}
            <TouchableOpacity
                style={Buttons.buttonProfile}
                onPress={() => {props.navigation.navigate('Bild');}}>
                <Image source={props.profilepics[props.picNum]} style={Images.buttonIconStart} />
                <Text style={Typography.boldButtonSideWhite}>Välj bild</Text>
                <View style={Buttons.buttonArrow}><AntDesign name="rightcircle" size={22} color="white" /></View>
            </TouchableOpacity>

            <Text></Text>

        </View>
    );
};