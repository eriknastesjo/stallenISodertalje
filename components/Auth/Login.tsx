import Auth from '../../interfaces/auth';
import { useState } from 'react';
import authModel from '../../models/auth';
import AuthFields from './Authfields';

import artefactsModel from '../../models/artefacts';


export default function Login({ navigation, setIsLoggedIn, setArtefact }) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doLogin() {
        if (auth.email && auth.password) {
            const result = await authModel.login(auth.email, auth.password);

            if (result.type === "success") {
                setIsLoggedIn(true);
                const loadArtefact = await artefactsModel.getArtefactByEmail()
                if (loadArtefact !== null) {
                    setArtefact( await artefactsModel.getArtefactByEmail());
                }
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
            submit={doLogin}
            title="Logga in"
            navigation={navigation}
        />
    );
};