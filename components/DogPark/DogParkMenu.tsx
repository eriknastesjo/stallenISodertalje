import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';

export default function Menu({ navigation }) {

    function goToList() {
        navigation.navigate("Lista");
    }

    function goToMap() {
        navigation.navigate("Karta");
    }

    return (
        <View>
            <Button
                color='#313131'
                title="Lista"
                onPress={goToList}
            />

            <Button
                color='#313131'
                title="Karta"
                onPress={goToMap}
            />
        </View>
    );
};