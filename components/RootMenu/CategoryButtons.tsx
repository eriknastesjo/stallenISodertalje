import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image } from 'react-native';
import { Typography, Base, Buttons, Images } from '../../styles';
import { FlatGrid } from 'react-native-super-grid';

// * Kallas från RootStack.tsx
export default function Categories({ categories, navigation, name, profilepicList, picNum }) {

    function goToProfile() {
        navigation.navigate("Profil");
    }

    const goToCategory = (categoryObj) => () => {

        navigation.navigate(categoryObj.stackName, {
            title: categoryObj.title,
            urlEndJson: categoryObj.urlEndJson,
            urlEndGeo: categoryObj.urlEndGeo,
            urlEndCompl: categoryObj.urlEndCompl,
            dataType: categoryObj.dataType,
        });
    };

    // För varje kategori skapas en klickbar knapp med en passande bild och text som bestäms av vad som angivits i komponenten Categories.
    // =====================================================
    const listCategories = categories
        .map((categoryObj, index) => {
            return <TouchableOpacity onPress={goToCategory(categoryObj)} style={Buttons.buttonGrid} key={index}>
                <Image source={categoryObj.imgUrl} style={Images.buttonImage} />
                <Text style={Typography.boldCenterButton}>{categoryObj.stackName}</Text>
            </TouchableOpacity>
        });

    return (
        <View style={Base.centerContainer}>

            <Image source={require("../../assets/heart.png")} style={Images.heart} />
            {name === "" ?
                <Text style={Typography.boldCenter}>Hej södertäljare,</Text>
            :
                <Text style={Typography.boldCenter}>Hej {name},</Text>
            }

            <Text style={Typography.normalCenterLessMargin}>Vart vill du gå idag?</Text>


            <TouchableOpacity style={Images.profilePicContainer} onPress={() => { goToProfile(); }}>
                <Image source={require("../../assets/profilePicBackg.png")} style={Images.profilePicBackg} />
                <Image source={profilepicList[picNum]} style={Images.profilePic} />
            </TouchableOpacity>

            <FlatGrid
                alwaysBounceVertical={true}
                itemDimension={140}
                data={listCategories}
                spacing={18}
                style={Buttons.gridContainer}
                renderItem={({ item }) => (<View style={Buttons.buttonContainer}>
                    {item}
                </View>)}
            />
        </View>
    );
};