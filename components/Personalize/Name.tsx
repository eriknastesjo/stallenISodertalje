import { useState } from 'react';
import { View, ScrollView, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { Base, Typography, Forms, Buttons } from '../../styles';
import { showMessage } from 'react-native-flash-message';
import { Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import storage from '../../models/storage';

// import auth from '../../models/auth';
// import artefactsModel from '../../models/artefacts';


export default function Name({navigation,setName}) {

    const [currentName, setCurrentName] = useState<string>("");

    async function submit() {
        setName(currentName);

        await storage.setName(currentName);

        // showMessage({
        //     message: `Hej ${currentName}!`,
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
            <Text style={Typography.header2}>Välj namn</Text>

            <Text style={Typography.normal}>Namn</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setCurrentName(content);
                }}
                placeholder="Skriv ditt namn här"
                selectionColor={'#46A450'}
            // value={delivery?.comment}
            />
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