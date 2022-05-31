import Auth from '../../interfaces/auth';
import { showMessage } from 'react-native-flash-message';
import { useState } from 'react';
import authModel from '../../models/auth';
import AuthFields from './Authfields';

export default function Register({ navigation, setIsLoggedIn }) {
    const [auth, setAuth] = useState<Partial<Auth>>({});


    async function doRegister() {
        if (auth.email && auth.password) {
            const result = await authModel.register(auth.email, auth.password);

            showMessage({
                message: result.title,
                description: result.message,
                type: result.type,
            });
            // console.log(result);
            if (result.type === "success") {
                console.log("SUCCESS");
                navigation.navigate("Logga in");
            }

        } else {
            showMessage({
                message: "Varning",
                description: "E-post och/eller lösenord saknas",
                type: "warning",
            });
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doRegister}
            title="Registrera dig"
            navigation={navigation}
        />
    );
};