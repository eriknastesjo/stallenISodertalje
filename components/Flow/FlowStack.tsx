import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListOrMapButtons from './ListOrMapButtons';
import List from './List/List';
import MapAll from './Map/MapAll';
import Details from './List/Details';
import GetData from './GetData';


const Stack = createNativeStackNavigator();

export default function Stacking({ route }) {
    const { title, urlEndJson, urlEndGeo, urlEndCompl } = route.params;

    // GetData kommer hämta data från model och "förfina" den baserat på om API är baserat på Json eller GeoJson.
    // ==========================================
    const data = GetData({ urlEndJson, urlEndGeo, urlEndCompl });

    return (
        <Stack.Navigator initialRouteName="ListOrMap" >
            <Stack.Screen name="ListOrMap" component={ListOrMapButtons} options={{ title: title }} />
            <Stack.Screen name="Detaljer" component={Details} />
            <Stack.Screen name="Lista">{(props) => <List {...props}
                listItems={data.refinedData}
                listItemsCompl={data.refinedDataCompl}
                title={title}
                urlEndJson={urlEndJson}
                urlEndGeo={urlEndGeo}
                urlEndCompl={urlEndCompl}
                fitCoordinates={data.fitCoordinates}
                />}
            </Stack.Screen>
            <Stack.Screen name="Karta">{(props) => <MapAll {...props}
                mapItems={data.refinedData}
                mapItemsCompl={data.refinedDataCompl}
                title={title}
                urlEndJson={urlEndJson}
                urlEndGeo={urlEndGeo}
                urlEndCompl={urlEndCompl}
                fitCoordinates={data.fitCoordinates}
            />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
