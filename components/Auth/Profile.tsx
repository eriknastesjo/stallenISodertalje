import { View, Text, Button } from "react-native";
import { Typography } from '../../styles';
import AuthModel from '../../models/auth';
// import { showMessage } from 'react-native-flash-message';

export default function Profile({ profileName, setProfileame, setIsLoggedIn }) {

    function doLogout() {
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
            <Text>Det här är profilsidan.</Text>

            <Text style={Typography.header1}>Utloggning</Text>
            <Button
                color='#A85D14'
                title="Logga ut"
                onPress={doLogout}
            />
        </View>
    );
};