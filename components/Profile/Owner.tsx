import { useState } from 'react';
import { View, ScrollView, Text, TextInput, Button } from "react-native";
import { Base, Typography, Forms } from '../../styles';
// import ProductDropDown from './ProductDropDown';

// import { showMessage } from 'react-native-flash-message';


export default function Owner({ navigation, profileName, setProfilename }) {

    // const [currentProduct, setCurrentProduct] = useState<Product[]>([]);

    // console.log(setProfilename);

    return (
        <ScrollView style={Base.content}>
            <Text style={Typography.header2}>Ändra namn på ägare</Text>

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
                    setProfilename(content)
                }}
                placeholder="Skriv ditt namn här"
                // value={delivery?.comment}
            />
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