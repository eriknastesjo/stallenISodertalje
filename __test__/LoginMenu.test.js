import { render } from '@testing-library/react-native';
import LoginMenu from '../components/Auth/LoginMenu';

jest.useFakeTimers();   // inte säker på vad detta är men utan den blir det felmeddelande
// ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');  // för att slippa få felmeddelande från useFakeTimers


test('header should exist containing text "Inloggning"', async () => {
    const { getByText } = render(<LoginMenu />);

    const header = await getByText('Inloggning');

    expect(header).toBeDefined();
});

test('One button should contain text "Logga in"', async () => {
    const { getByText } = render(<LoginMenu />);

    const header = await getByText('Logga in');

    expect(header).toBeDefined();
});

test('One button should contain text "Registrera"', async () => {
    const { getByText } = render(<LoginMenu />);

    const header = await getByText('Registrera');

    expect(header).toBeDefined();
});

