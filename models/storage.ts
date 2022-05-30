import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = {
    storeTokenAndEmail: async function storeTokenAndEmail(token: string, email: string) {
        try {
            const tokenAndDate = {
                token: token,
                email: email,
                date: new Date().getTime(),
            };
            const jsonValue = JSON.stringify(tokenAndDate);

            await AsyncStorage.setItem('@token', jsonValue);
        } catch (e) {
            // saving error
        }
    },
    readTokenAndEmail: async function readTokenAndEmail(): Promise<any> {
        try {
            const jsonValue = await AsyncStorage.getItem('@token');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    },
    deleteTokenAndEmail: async function deleteToken() {
        await AsyncStorage.removeItem('@token');
    }
};

export default storage;