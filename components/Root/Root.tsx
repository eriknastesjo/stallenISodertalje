import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Categories from './Categories';
import Stacking from '../Shared/Stack';
import Personalize from '../Personalize/Personalize';


const Stack = createNativeStackNavigator();

export default function Root(props) {

    const listCategories = props.categories
        .map((categoryObj, index) => {
            return <Stack.Screen name={categoryObj.stackName} component={Stacking} key={index}/>
        });

    return (
        <Stack.Navigator initialRouteName="Meny" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Meny">
                {(screenProps) => <Categories {...screenProps}
                    categories={props.categories}
                    name={props.name}
                    picNum={props.picNum}
                    profilepics={props.profilepics}
                />}
            </Stack.Screen>
            <Stack.Screen name="Profil" options={{ headerShown: true }}>
                {(screenProps) => <Personalize {...screenProps}
                    name={props.name}
                    setName={props.setName}
                    picNum={props.picNum}
                    setPicNum={props.setPicNum}
                    profilepics={props.profilepics}
                />}
            </Stack.Screen>
            {listCategories}
        </Stack.Navigator>
    );
};