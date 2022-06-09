import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Categories from './Categories';
import Stacking from '../Shared/Stack';
import Personalize from '../Personalize/Personalize';


const Stack = createNativeStackNavigator();

export default function Root({ categories, name, setName }) {

    const listCategories = categories
        .map((categoryObj, index) => {
            return <Stack.Screen name={categoryObj.stackName} component={Stacking} key={index}/>
        });

    return (
        <Stack.Navigator initialRouteName="Meny" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Meny">
                {(screenProps) => <Categories {...screenProps}
                    categories={categories}
                    name={name}
                />}
            </Stack.Screen>
            <Stack.Screen name="Profil" options={{ headerShown: true }}>
                {(screenProps) => <Personalize {...screenProps}
                    name={name}
                    setName={setName}
                />}
            </Stack.Screen>
            {listCategories}
        </Stack.Navigator>
    );
};