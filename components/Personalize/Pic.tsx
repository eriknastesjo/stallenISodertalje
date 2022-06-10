import { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, Button, TouchableOpacity, Image } from "react-native";
import { Base, Typography, Forms, Buttons, Images } from '../../styles';
import { showMessage } from 'react-native-flash-message';
import { Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import storage from '../../models/storage';


export default function Pic({ navigation, picNum, setPicNum, profilepics }) {

    const [currentPicNum, setCurrentPicNum] = useState<number>(-1);
    console.log("PICNUMMMMM");
    console.log(picNum);

    let listPics = "";
    redefineListPics();

    useEffect(() => {
        setPicNumber(picNum);
    }, []);

    function setPicNumber(picNumber: number) {
        setCurrentPicNum(picNumber);
        redefineListPics();
    }

    function redefineListPics() {
        listPics = profilepics
            .map((profilepic, index) => {
                return <TouchableOpacity
                    key={index}
                    onPress={() => { setPicNumber(index); }}>
                    {
                        index === currentPicNum &&
                        <Image source={require("../../assets/profilePicBackg.png")} style={Images.profilePicBackg2} />
                    }
                    <Image source={profilepic} style={Images.profilePic2} />
                </TouchableOpacity>
            });
    }

    async function submit() {
        setPicNum(currentPicNum);

        await storage.setPicNum(currentPicNum.toString());

        // showMessage({
        //     message: `Bra val!`,
        //     type: "success",
        // });

        navigation.navigate("Menyval");

    }

    async function cancel() {
        navigation.navigate("Menyval");
    }

    // console.log(setProfilename);

    return (
        <ScrollView style={Base.content}>
            <Text style={Typography.header2}>Välj bild</Text>
            <View style={Base.rowContainer}>{listPics}</View>
            <Text></Text>

            <View style={Base.rowContainerCenter}>
                <TouchableOpacity onPress={() => { submit(); }} style={Buttons.buttonProfileSmall}>
                    <Feather name="save" size={24} color="white" />
                    <Text style={Typography.boldButtonSideWhite}>    Spara</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { cancel(); }} style={Buttons.buttonProfileSmallRed}>
                    <MaterialCommunityIcons name="cancel" size={24} color="white" />
                    <Text style={Typography.boldButtonSideWhite}>    Avbryt</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );


};