import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, Foundation, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { View, Text, Button, TouchableOpacity } from "react-native";
import { Typography, Base, Buttons } from '../../../styles';

export default function LoginMenu({ navigation }) {


    function goToLogin() {
        navigation.navigate("Logga in");
    }

    function goToRegister() {
        navigation.navigate("Registrera");
    }

    return (
        <View>
            <Text style={Typography.header1}>Inloggning</Text>
            <Text></Text>
            <View style={Buttons.buttonContainer}>
                <TouchableOpacity onPress={goToLogin} style={Buttons.buttonProfile}>
                    <Ionicons name="log-in-outline" size={27} color="white" />
                    <Text style={Typography.boldButtonSideWhite}>    Logga in</Text>
                    <View style={Buttons.buttonArrow}><AntDesign name="rightcircle" size={22} color="white" /></View>
                </TouchableOpacity>
            </View>

            <View style={Buttons.buttonContainer}>
                <TouchableOpacity onPress={goToRegister} style={Buttons.buttonProfile}>
                    <AntDesign name="pluscircleo" size={23} color="white" />
                    <Text style={Typography.boldButtonSideWhite}>    Registrera</Text>
                    <View style={Buttons.buttonArrow}><AntDesign name="rightcircle" size={22} color="white" /></View>
                </TouchableOpacity>
            </View>
        </View>
    );
};