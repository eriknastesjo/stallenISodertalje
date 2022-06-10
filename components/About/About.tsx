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
        Linking.openURL("https://www.dataportal.se/en/datasets/75_2259/parks");
    }
    function linkDogParkData() {
        Linking.openURL("https://www.dataportal.se/en/datasets/75_2265/dog-exercise-area");
    }
    function linkWalkingTrails() {
        Linking.openURL("https://www.dataportal.se/en/datasets/75_2204/walking-trails-starting-points");
    }
    function linkNatureReserve() {
        Linking.openURL("https://www.dataportal.se/en/datasets/75_2140/nature-reserve");
    }
    // function linkReactNative() {
    //     Linking.openURL("https://reactnative.dev/");
    // }
    // function linkComponents() {
    //     Linking.openURL("https://reactnative.dev/docs/components-and-apis#basic-components");
    // }
    // function linkModels() {
    //     Linking.openURL("https://en.wikipedia.org/wiki/Programming_model");
    // }
    // function linkJwt() {
    //     Linking.openURL("https://jwt.io/");
    // }
    // function linkInterfaces() {
    //     Linking.openURL("https://www.typescriptlang.org/docs/handbook/interfaces.html");
    // }



    return (
        <ScrollView>
            <View style={Base.content}>

                <Text style={Typography.header1}>Om appen</Text>

                <Text style={Typography.normal}>
                    Välkommen till <Text style={Typography.bold}>Ställen i Södertälje</Text>. Här kan du hitta information om olika platser i Södertäljes kommun. Välj först vilken typ av platser du vill gå till. Därifrån kan du välja att leta i en listad vy där du ser namnen på platserna. Du kan också välja att se platserna i en kartvy.
                </Text>

                <Text style={Typography.normal}>
                    Om du vill kan du skapa en profil med namn och bild. Då får du en lite mer personlig hälsning varje gång som du går in i appen. Tryck på ikonen uppe i högra hörnet när du är i startmenyn.
                </Text>
{/*
                <Text style={Typography.normalMoreMargin}>
                    Nedan kan du läsa mer om hur appen är uppbyggd.
                </Text> */}


                <Text style={Typography.boldCenterParagraph}>Datakällor</Text>
                <Text style={Typography.normal}>Information om platserna är hämtade från
                    <Text onPress={linkHomepage} style={Typography.link}> Södertäljes öppna data</Text> som ligger på
                    <Text onPress={linkDatPortal} style={Typography.link}> Sveriges dataportal</Text>.
                </Text>

                {/* <Text>{'\u2B24    ' }<Text style={Typography.link} onPress={linkParkData}>Parkdata</Text></Text>
                <Text>{'\u2B24    '}<Text style={Typography.link} onPress={linkDogParkData}>Hundrastgårdsdata</Text></Text>
                <Text>{'\u2B24    '}<Text style={Typography.link} onPress={linkWalkingTrails}>Vandringsledsdata</Text></Text>
                <Text>{'\u2B24    '}<Text style={Typography.link} onPress={linkNatureReserve}>Naturreservatsdata</Text></Text> */}

                {/* <Text style={Typography.normal}></Text> */}


                {/* <Text style={Typography.boldCenterParagraph}>Dokumentation</Text>
                <Text style={Typography.normal}>
                    Appen är skapad med ramverket <Text style={Typography.link} onPress={linkReactNative}>React Native</Text> som möjligör exportering till både iOS och Android. Koden är skriven i Typescript.
                </Text>

                <Text style={Typography.cursiveCenter}>Komponenter</Text>
                <Text style={Typography.normal}>
                    Den största delen av koden finns uppdelade i olika <Text style={Typography.link} onPress={linkComponents}>komponenter</Text>. Komponenter är "byggstenar" som skapar appen i React Native. Dessa har organiserats i olika kataloger. I katalogen "Root" finns det två filer som tillsammans utgör grundbulten för att visa olika platser i Södertälje, t.ex. parker och hundrastgårdar. De använder sig av återanvändbara komponenter i katalogen "Shared" vilket gör att platserna visas på samma sätt. För att hämta och implementera mer data från Södertäljes kommuns datakällor krävs alltså bara att man lägger till några rader inom de två filerna i katalogen "Root".
                </Text>

                <Text style={Typography.cursiveCenter}>Modeller</Text>
                <Text style={Typography.normal}>
                    Den kod som gör anrop mot ett databas-API kallar vi <Text style={Typography.link} onPress={linkModels}>modell</Text>. I projektet har de lagts i katalogen "models". Genom att injicera en och samma modell med olika URL-ändelser så kan man hämta data med olika API: er så länge de kommer från samma databas. I detta projekt används det för att göra anrop mot flera olika API:er som Södertäljes kommun har publicerat. I katalogen "models" finns också den kod som gör anrop mot auth-API:et. Detta API möjligör att användare som registrerar sig eller loggar in kan autentieras med <Text style={Typography.link} onPress={linkJwt}>JSON Web Tokens (JWT)</Text>.
                </Text>

                <Text style={Typography.cursiveCenter}>Interfaces</Text>
                <Text style={Typography.normal}>
                    För att skapa mer struktur och skriva mer "typat" så används <Text style={Typography.link} onPress={linkInterfaces}>interfaces</Text>. Ett interface definierar vad som skall ingå i ett objekt. I detta projektet har exempelvis interface för artefact skapats som definierar vad för slags information som användaren kan modifiera och spara (ägarnamn och hundnamn).
                </Text>

                <Text style={Typography.cursiveCenter}>Övrigt</Text>
                <Text style={Typography.normalMoreMargin}>
                    De bilder som har använts i detta projektet finns i katalogen "assets". Filer som är ansvariga för att ge appens utseende (t.ex. marginaler och fontstorlek) finns i katalogen "styles".
                </Text> */}

            </View>
        </ScrollView>
    );
};