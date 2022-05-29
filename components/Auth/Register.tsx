import Auth from '../../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './Authfields';
// import { showMessage } from 'react-native-flash-message';

export default function Register({ navigation, setIsLoggedIn }) {
    const [auth, setAuth] = useState<Partial<Auth>>({});


    async function doRegister() {
        if (auth.email && auth.password) {
            const result = await AuthModel.register(auth.email, auth.password);

            // console.log(result);
            if (result.type === "success") {
                console.log("SUCCESS");
                navigation.navigate("Logga in");
            }

            // showMessage({
            //     message: result.title,
            //     description: result.message,
            //     type: result.type,
            // });
        } else {
            // showMessage({
            //     message: "Varning",
            //     description: "E-post och/eller lösenord saknas",
            //     type: "warning",
            // });
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