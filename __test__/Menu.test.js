import { render } from '@testing-library/react-native';
import Menu from '../components/Home/Menu';

jest.useFakeTimers();   // inte säker på vad detta är men utan den blir det felmeddelande
                        // ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');  // för att slippa få felmeddelande från useFakeTimers

const artefact = {
    ownerName: "ägare",
    dogName: "hund",
};


test('header should exist containing text "vart vill ni gå idag"', async () => {
    const { getByText } = render(<Menu artefact={artefact} isLoggedIn='false'/>);

    const header = await getByText('vart vill ni gå idag?');

    expect(header).toBeDefined();
});
