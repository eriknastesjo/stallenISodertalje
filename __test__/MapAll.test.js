import { render } from '@testing-library/react-native';
import ParkMap from '../components/Park/ParkMap';
import DogParkMap from '../components/DogPark/DogParkMap';

jest.useFakeTimers();   // inte säker på vad detta är men utan den blir det felmeddelande
                        // ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');  // för att slippa få felmeddelande från useFakeTimers


test('header should exist containing text "Parker" in ParkMap', async () => {
    const { getByText } = render(<ParkMap />);

    const header = await getByText('Parker');

    expect(header).toBeDefined();
});

test('header should exist containing text "Hundrastgårdar" in DogParkMap', async () => {
    const { getByText } = render(<DogParkMap />);

    const header = await getByText('Hundrastgårdar');

    expect(header).toBeDefined();
});
