import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Menu from './Menu';
import Park from './Park/Park'
import DogPark from './DogPark/DogPark'


const Stack = createNativeStackNavigator();

export default function Home(props) {

    // console.log(props);
    // console.log(props.setIsLoggedIn);
    return (
        <Stack.Navigator initialRouteName="Meny">
            <Stack.Screen name="Meny" component={Menu} />
            <Stack.Screen name="Park" component={Park} />
            <Stack.Screen name="Hundrastgård" component={DogPark} />
        </Stack.Navigator>
    );
};