import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Menu from './Menu';
import Park from '../Park/Park'
import DogPark from '../DogPark/DogPark'


const Stack = createNativeStackNavigator();

export default function Home({artefact, isLoggedIn}) {
    return (
        <Stack.Navigator initialRouteName="Meny" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Meny">
                {(screenProps) => <Menu {...screenProps}
                    artefact={artefact}
                    isLoggedIn={isLoggedIn}
                />}
            </Stack.Screen>
            <Stack.Screen name="Park" component={Park} />
            <Stack.Screen name="Hundrastgård" component={DogPark} />
        </Stack.Navigator>
    );
};