import { render } from '@testing-library/react-native';
import Categories from '../components/RootMenu/CategoryButtons';

jest.useFakeTimers();   // inte säker på vad detta är men utan den blir det felmeddelande
                        // ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');  // för att slippa få felmeddelande från useFakeTimers

const artefact = {
    ownerName: "Erik",
    dogName: "Voffe",
};


test('header should exist containing text "vart vill ni gå idag"', async () => {
    const { getByText } = render(<Categories artefact={artefact} isLoggedIn='false' />);

    // // uncomment to see what is rendered in OrderList component:
    // const { getByText, debug } = render(<Categories artefact={artefact} isLoggedIn='false' />);
    // debug("Categories component");

    const header = await getByText('vart vill ni gå idag?');

    expect(header).toBeDefined();
});

test('header should exist containing owner name and dog name', async () => {
    const { getByText } = render(<Categories artefact={artefact} isLoggedIn='true' />);

    // // uncomment to see what is rendered in OrderList component:
    // const { getByText, debug } = render(<Categories artefact={artefact} isLoggedIn='true' />);
    // debug("Categories component");

    const header = await getByText('Hej Erik och Voffe,');

    expect(header).toBeDefined();
});