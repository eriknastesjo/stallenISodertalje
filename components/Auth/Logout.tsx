import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Typography } from '../../styles';
import { View, Text, Button } from "react-native";
import AuthModel from '../../models/auth';
// import { showMessage } from 'react-native-flash-message';


export default function Logout({ setIsLoggedIn }) {


    function goToLoginMenu() {
        setIsLoggedIn(false);
        AuthModel.logout();
        // showMessage({
        //     message: "Information",
        //     description: "Du är utloggad",
        //     type: "info",
        // });
    }

    return (
        <View>
            <Text style={Typography.header1}>Utloggning</Text>
            <Button
                color='#A85D14'
                title="Logga ut"
                onPress={goToLoginMenu}
            />
        </View>
    );
};