import { createNativeStackNavigator } from '@react-navigation/native-stack';


import CategoryButtons from './CategoryButtons';
import FlowStack from '../Flow/FlowStack';
import Personalize from '../Personalize/Personalize';


const Stack = createNativeStackNavigator();

export default function Root(props) {

    // Här skapas stackkomponenter för kategorier. I var och en av stackkomponenterna finns ytterligare en "stackmeny" (FlowStack) som används för att navigera till list eller karta.
    // ========================================================
    const CategoryStackComponents = props.categories
        .map((categoryObj, index) => {
            return <Stack.Screen name={categoryObj.stackName} component={FlowStack} key={index}/>
        });

    return (
        <Stack.Navigator initialRouteName="Meny" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Meny">
                {(screenProps) => <CategoryButtons {...screenProps}
                    categories={props.categories}
                    name={props.name}
                    picNum={props.picNum}
                    profilepicList={props.profilepicList}
                />}
            </Stack.Screen>
            <Stack.Screen name="Profil" options={{ headerShown: true }}>
                {(screenProps) => <Personalize {...screenProps}
                    name={props.name}
                    setName={props.setName}
                    picNum={props.picNum}
                    setPicNum={props.setPicNum}
                    profilepicList={props.profilepicList}
                />}
            </Stack.Screen>
            {CategoryStackComponents}
        </Stack.Navigator>
    );
};