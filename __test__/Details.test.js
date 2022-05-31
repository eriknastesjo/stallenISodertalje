import { render } from '@testing-library/react-native';
import Details from '../components/Park/Details';

jest.useFakeTimers();   // inte säker på vad detta är men utan den blir det felmeddelande
// ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');  // för att slippa få felmeddelande från useFakeTimers

// jest.mock("../components/home/Menu", () => "StockList");

const route = {
    params: {
        park : {
            "beskrivning": "Beskrivning av riktigt fint ställe.",
            "latitude": "56.1940915",
            "longitude": "15.8402871",
            "namn": "Superparken",
        }
    }
}


test('header should exist containing the parks name', async () => {
    const { getByText } = render(<Details route={route} />);

    const header = await getByText('Superparken');

    expect(header).toBeDefined();
});

test('description of park should exist on page', async () => {
    const { getByText } = render(<Details route={route} />);

    const description = await getByText('Beskrivning av riktigt fint ställe.');

    expect(description).toBeDefined();
});
