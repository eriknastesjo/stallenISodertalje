import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { getStateFromPath } from '@react-navigation/native';

import Choices from './Choices';
import Name from './Name';

const Stack = createNativeStackNavigator();

export default function Personalize(props) {
    return (
        <Stack.Navigator initialRouteName="Menyval" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Menyval" options={{headerShown: false}}>
                {(screenProps) => <Choices {...screenProps}
                    name={props.name}
                />}
            </Stack.Screen>
            <Stack.Screen name="Namn">
                {(screenProps) =>
                    <Name {...screenProps}
                        setName={props.setName}
                    />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};