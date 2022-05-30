import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { getStateFromPath } from '@react-navigation/native';

import ProfileEdit from './ProfileEdit';
import Owner from './Owner';
import Dog from './Dog';


const Stack = createNativeStackNavigator();

export default function Profile(props) {
    return (
        <Stack.Navigator initialRouteName="ProfilMeny">
            <Stack.Screen name="ProfilMeny" options={{headerShown: false}}>
                {(screenProps) => <ProfileEdit {...screenProps}
                    artefact={props.artefact}
                    setArtefact={props.setArtefact}
                    setIsLoggedIn={props.setIsLoggedIn}
                />}
            </Stack.Screen>
            <Stack.Screen name="Ägare">
                {(screenProps) =>
                    <Owner {...screenProps}
                        artefact={props.artefact}
                        setArtefact={props.setArtefact}
                        />}
            </Stack.Screen>
            <Stack.Screen name="Hund">
                {(screenProps) =>
                    <Dog {...screenProps}
                        artefact={props.artefact}
                        setArtefact={props.setArtefact}
                    />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};