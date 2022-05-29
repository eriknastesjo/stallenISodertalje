import { View, ScrollView, Text } from 'react-native';
import { Base, Typography } from '../../styles';
import * as Linking from 'expo-linking';


export default function About() {

    function linkHomepage() {
        Linking.openURL("https://www.sodertalje.se/psidata");
    }
    function linkDatPortal() {
        Linking.openURL("https://www.dataportal.se/en");
    }
    function linkParkData() {
        Linking.openURL("https://www.dataportal.se/en/datasets/75_2259/parks#/");
    }
    function linkDogParkData() {
        Linking.openURL("https://www.dataportal.se/en/datasets/75_2265/dog-exercise-area#/");
    }
    function linkReactNative() {
        Linking.openURL("https://reactnative.dev/");
    }
    function linkComponents() {
        Linking.openURL("https://reactnative.dev/docs/components-and-apis#basic-components");
    }
    function linkModels() {
        Linking.openURL("https://en.wikipedia.org/wiki/Programming_model");
    }
    function linkJwt() {
        Linking.openURL("https://jwt.io/");
    }
    function linkInterfaces() {
        Linking.openURL("https://www.typescriptlang.org/docs/handbook/interfaces.html");
    }



    return (
        <ScrollView>
            <View style={Base.content}>

                <Text style={Typography.header1}>Om appen</Text>

                <Text style={Typography.normal}>
                    Välkommen till <Text style={Typography.bold}>Hundliv i Södertälje</Text>. Här kan du hitta information om parker och hundrastgårdar i Södertäljes kommun. Du kan välja att leta i en listad vy där du ser alla namnen på platserna. Du kan också välja att se alla platserna i en kartvy.
                </Text>

                <Text style={Typography.normalMoreMargin}>
                    Genom att logga in eller registrera dig som användare kan du kan skapa en profil. Då får du en lite mer personlig hälsning varje gång som du loggar in.
                </Text>


                <Text style={Typography.boldCenterParagraph}>Datakällor</Text>
                <Text style={Typography.normal}>Information om platerna är hämtade från
                    <Text onPress={linkHomepage} style={Typography.link}> Södertäljes öppna data</Text>.
                    som ligger på
                    <Text onPress={linkDatPortal} style={Typography.link}> Sveriges dataportal</Text>.
                </Text>

                <Text>{'\u2B24    ' }<Text style={Typography.link} onPress={linkParkData}>Parkdata</Text></Text>

                <Text>{'\u2B24    '}<Text style={Typography.link} onPress={linkDogParkData}>Hundrastgårdsdata</Text></Text>

                <Text style={Typography.normal}></Text>


                <Text style={Typography.boldCenterParagraph}>Dokumentation</Text>
                <Text style={Typography.normal}>
                    Appen är skapad med ramverket <Text style={Typography.link} onPress={linkReactNative}>React Native</Text> som möjligör exportering till både iOS och Android. Koden är skriven i Typescript.
                </Text>

                <Text style={Typography.cursiveCenter}>Komponenter</Text>
                <Text style={Typography.normal}>
                    Den största delen av koden finns uppdelade i olika <Text style={Typography.link} onPress={linkComponents}>komponenter</Text>. Komponent-filerna har i sin tur organiserats i olika kataloger. I katalogen "Park" finns exempelvis de filer som kör när användaren är inne land parkvyerna (t.ex. parkmenyn eller listan på parknamn). Vissa komponenter, exempelvis MapAll och MapSingle, används i flera vyer och ligger därför i en egen katalog "Shared".
                </Text>

                <Text style={Typography.cursiveCenter}>Modeller</Text>
                <Text style={Typography.normal}>
                    Den kod som gör anrop mot Södertäljes databas-API kallar vi <Text style={Typography.link} onPress={linkModels}>modeller</Text> och har lagts i katalogen "models". Här finns också den kod som gör anrop mot auth-API:et som gör att användare som registrerar sig eller loggar in kan autentieras med <Text style={Typography.link} onPress={linkJwt}>JSON Web Tokens (JWT)</Text>.
                </Text>

                <Text style={Typography.cursiveCenter}>Interfaces</Text>
                <Text style={Typography.normal}>
                    För att skapa mer struktur och skriva mer "typat" så används <Text style={Typography.link} onPress={linkInterfaces}>interfaces</Text>. Ett interface definierar vad som skall ingå i ett objekt. I detta projektet har interfaces skapats för att definiera egenskaper som ingår i de dataobjekt vi hämtar med olika API:er.
                </Text>

                <Text style={Typography.cursiveCenter}>Övrigt</Text>
                <Text style={Typography.normalMoreMargin}>
                    De bilder som har använts i detta projektet finns i katalogen "assets". Filer som är ansvariga för att ge appens utseende (t.ex. marginaler och fontstorlek) finns i katalogen "styles".
                </Text>

            </View>
        </ScrollView>
    );
};