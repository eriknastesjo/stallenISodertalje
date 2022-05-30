import { useState } from 'react';
import { View, ScrollView, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { Base, Typography, Forms, Buttons } from '../../styles';
// import ProductDropDown from './ProductDropDown';

// import { showMessage } from 'react-native-flash-message';


export default function Dog({ navigation, dogName, setDogName }) {

    const [currentName, setCurrentName] = useState<string>("");

    function submit() {
        setDogName(currentName);
        // todo: spara i artefact också!!!!
        navigation.navigate("ProfilMeny");
    }

    // console.log(setProfilename);

    return (
        <ScrollView style={Base.content}>
            <Text style={Typography.header2}>Ändra namn på hund</Text>

            {/* <Text style={{ ...Typography.label }}>Produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
                required="required"
            /> */}

            <Text style={Typography.normal}>Namn</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setCurrentName(content)
                }}
                placeholder="Skriv hundens namn här"
                selectionColor={'#46A450'}
            // value={delivery?.comment}
            />

            <TouchableOpacity onPress={() => { submit(); }} style={Buttons.buttonProfileCenter}>
                <Text style={Typography.boldButtonSideWhite}>Spara</Text>
            </TouchableOpacity>

            {/* <Button
                title="Gör inleverans"
                color='#A85D14'
                onPress={() => {
                    if (passValidattion(delivery)) {
                        // testa här att delivery faktiskt levererar en produkt som finns?
                        // eller bara köra showmessage direkt? (för som nu är går det alltid igenom)
                        addDelivery(navigation, delivery, setProducts);
                    }
                }}
            /> */}


        </ScrollView>
    );


};