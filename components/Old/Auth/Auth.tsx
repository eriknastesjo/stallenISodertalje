import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Login';
import Register from './Register';
import Choice from './LoginMenu';
import { getStateFromPath } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function Deliveries(props) {

    // console.log(props);
    // console.log(props.setIsLoggedIn);
    return (
        <Stack.Navigator initialRouteName="LoginMenu">
            <Stack.Screen name="LoginMenu" component={Choice} options={{ headerShown: false }}/>
            <Stack.Screen name="Logga in">
                {(screenProps) => <Login {...screenProps}
                    setIsLoggedIn={props.setIsLoggedIn}
                    setArtefact={props.setArtefact}
                />}
            </Stack.Screen>
            <Stack.Screen name="Registrera">
                {(screenProps) => <Register {...screenProps}
                    setIsLoggedIn={props.setIsLoggedIn}
                    artefact={props.artefact}
                    setArtefact={props.setArtefact}
                />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};