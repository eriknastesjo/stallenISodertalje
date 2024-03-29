import config from "../../config/config.json";

import storage from "../storage";

const auth = {
    loggedIn: async function loggedIn() {
        const token = await storage.readTokenAndEmail();
        if (token) {
            const twentyFourHours = 1000 * 60 * 60 * 24;
            const notExpired = (new Date().getTime() - token.date) < twentyFourHours;
            // console.log(token);
            return token && notExpired;
        }
        return false;
    },
    getEmail: async function getEmail() {
        const token = await storage.readTokenAndEmail();
        if (token) {
            return token.email;
            // const twentyFourHours = 1000 * 60 * 60 * 24;
            // const notExpired = (new Date().getTime() - token.date) < twentyFourHours;
            // if (notExpired) {
            //     return token.email;
            // }
            // return "";
        }
        return "";
    },
    login: async function login(email: string, password: string) {
        const data = {
            api_key: config.api_key,
            email: email,
            password: password,
        };
        const response = await fetch(`${config.auth_url}/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
        });

        const result = await response.json();

        // errors kommer med som property om login inte lyckas, då returner
        // vi istället ett flash meddelande.
        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
            return {
                title: "Misslyckat",
                message: "Fel e-post och/eller lösenord",
                type: "danger",
            };
        }

        await storage.storeTokenAndEmail(result.data.token, result.data.user.email);

        return {
            title: "Lyckat!",
            message: "Du är inloggad",
            type: result.data.type,
        };
    },
    register: async function register(email: string, password: string) {
        const data = {
            api_key: config.api_key,
            email: email,
            password: password,
        };
        const response = await fetch(`${config.auth_url}/register`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
        });


        const result = await response.json();

        console.log(result);

        // errors kommer med som property om login inte lyckas, då returner
        // vi istället ett flash meddelande.
        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
            return {
                title: "Misslyckat",
                message: `${email} är redan registrerad`,
                type: "danger",
            };
        }

        return {
            title: "Lyckat!",
            message: "Du är registrerad och inloggad",
            type: "success",
        };
    },
    logout: async function logout() {
        await storage.deleteTokenAndEmail();
    }
};

export default auth;