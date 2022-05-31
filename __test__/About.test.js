import { render } from '@testing-library/react-native';
import About from '../components/About/About';

jest.useFakeTimers();   // inte säker på vad detta är men utan den blir det felmeddelande
                        // ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');  // för att slippa få felmeddelande från useFakeTimers


test('header should exist containing text "Om appen"', async () => {
    const { getByText } = render(<About />);

    const header = await getByText('Om appen');

    expect(header).toBeDefined();
});

test('Describing text should contain title of app', async () => {
    const { getByText } = render(<About />);

    const appTitle = await getByText('Södertäljes hundliv');

    expect(appTitle).toBeDefined();
});
