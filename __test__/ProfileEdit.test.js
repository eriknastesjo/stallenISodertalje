import { render } from '@testing-library/react-native';
import ProfileEdit from '../components/Profile/ProfileEdit';

jest.useFakeTimers();   // inte säker på vad detta är men utan den blir det felmeddelande
// ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');  // för att slippa få felmeddelande från useFakeTimers

// jest.mock("../components/home/Menu", () => "StockList");

const artefact = {
    ownerName: "Erik",
    dogName: "Voffe",
};

test('Owners name should exist on page', async () => {
    const { getByText } = render(<ProfileEdit artefact={artefact} />);

    const ownerName = await getByText('Erik');

    expect(ownerName).toBeDefined();
});
