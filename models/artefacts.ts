import config from "../config/config.json";

import storage from "./storage";
import Token from "../interfaces/token";
import Artefact from "../interfaces/artefact";

const artefactsModel = {
    getArtefactByEmail: async function getArtefactByEmail(): Promise<Artefact|null> {
        const tokenObj = await storage.readTokenAndEmail();

        if (!tokenObj) {
            return null;
        }

        const token = tokenObj.token;
        const email = tokenObj.email;
        let artefact = null;

        const response = await fetch(`${config.auth_url}/data?api_key=${config.api_key}`, {
            headers: {
                'content-type': 'application/json',
                'x-access-token': token
            },
            method: 'GET'
        })

        const result = await response.json();


        // Search for latest artefact that can be connected to email.
        // If no artefact can be found null will be returned.
        result.data.forEach((element: { email: string; artefact: string }) => {
            if (element.email = email) {
                // Result is in string format so have to parse it to become object
                const artefactStr = element.artefact;
                const parsedArtefact = JSON.parse(artefactStr);
                artefact = parsedArtefact;
            }
        });
        return artefact;
    },
    setArtefact: async function setArtefact(artefact: Artefact): Promise<void> {

        const tokenObj = await storage.readTokenAndEmail();
        let oldArtefact = await this.getArtefactByEmail();

        if (oldArtefact) {
            console.log("UPDATING...");
            const data = {
                id: 2026,
                artefact: JSON.stringify(artefact),
                api_key: config.api_key
            };

            // console.log(data);
            await fetch(`${config.auth_url}/data`, {
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': tokenObj.token
                },
                method: 'PUT'
            });

            return;
        }

        console.log("CREATING...");
        const data = {
            artefact: JSON.stringify(artefact),
            api_key: config.api_key
        };
        await fetch(`${config.auth_url}/data`, {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'x-access-token': tokenObj.token
            },
            method: 'POST'
        });

        return;

    }
};

export default artefactsModel;