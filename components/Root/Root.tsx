import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Categories from './Categories';
import Stacking from '../Shared/Stack';


const Stack = createNativeStackNavigator();

export default function Root({ artefact, isLoggedIn }) {
    return (
        <Stack.Navigator initialRouteName="Meny" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Meny">
                {(screenProps) => <Categories {...screenProps}
                    artefact={artefact}
                    isLoggedIn={isLoggedIn}
                />}
            </Stack.Screen>
            <Stack.Screen name="Park" component={Stacking} />
            <Stack.Screen name="Hundrastgård" component={Stacking} />
            <Stack.Screen name="Vandringsled" component={Stacking} />
            <Stack.Screen name="Naturreservat" component={Stacking} />
        </Stack.Navigator>
    );
};