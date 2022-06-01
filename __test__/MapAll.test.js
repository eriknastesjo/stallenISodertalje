import { render } from '@testing-library/react-native';
// import ParkMap from '../components/Park/ParkMap';
// import DogParkMap from '../components/DogPark/DogParkMap';
import MapAll from '../components/Shared/MapAll';

jest.useFakeTimers();   // inte säker på vad detta är men utan den blir det felmeddelande
                        // ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');  // för att slippa få felmeddelande från useFakeTimers


const data = [
    {
        "beskrivning": "Ett riktigt fint ställe.",
        "latitude": "56.1940915",
        "longitude": "15.8402871",
        "namn": "Superparken",
    },
    {
        "beskrivning": "Inte ett så fint ställe.",
        "latitude": "26.1940916",
        "longitude": "55.8402877",
        "namn": "Skurkparken",
    },
    {
        "beskrivning": "Helt okej ställe.",
        "latitude": "86.1940913",
        "longitude": "45.8402874",
        "namn": "Mediokerparken",
    },
]

const title = 'Parker';
test('header should exist containing text "Parker" in ParkMap', async () => {
    const { getByText } = render(<MapAll title={title} mapItems={data} />);

    const header = await getByText('Parker');

    expect(header).toBeDefined();
});

const title2 = 'Hundrastgårdar';
test('header should exist containing text "Hundrastgårdar" in DogParkMap', async () => {
    const { getByText } = render(<MapAll title={title2} mapItems={data}/>);

    const header = await getByText('Hundrastgårdar');

    expect(header).toBeDefined();
});
