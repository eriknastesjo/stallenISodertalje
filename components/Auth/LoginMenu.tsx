import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { View, Text, Button } from "react-native";

export default function LoginMenu({ navigation, setIsLoggedIn}) {


    function goToLogin() {
        navigation.navigate("Login");
    }

    function goToRegister() {
        navigation.navigate("Register");
    }

    return (
        <View>
            <Button
                color='#A85D14'
                title="Logga in"
                onPress={goToLogin}
            />

            <Button
                color='#A85D14'
                title="Registrera"
                onPress={goToRegister}
            />
        </View>
    );
};