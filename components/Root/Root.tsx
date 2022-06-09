import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Categories from './Categories';
import Stacking from '../Shared/Stack';


const Stack = createNativeStackNavigator();

export default function Root({ categories, artefact, isLoggedIn }) {

    const listCategories = categories
        .map((categoryObj, index) => {
            return <Stack.Screen name={categoryObj.stackName} component={Stacking} key={index}/>
        });

    return (
        <Stack.Navigator initialRouteName="Meny" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Meny">
                {(screenProps) => <Categories {...screenProps}
                    categories={categories}
                    artefact={artefact}
                    isLoggedIn={isLoggedIn}
                />}
            </Stack.Screen>
            {listCategories}
        </Stack.Navigator>
    );
};