import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image } from 'react-native';
import { Typography, Base, Buttons, Images } from '../../styles';
import { FlatGrid } from 'react-native-super-grid';


export default function Categories({ categories, navigation, name, profilepics, picNum }) {

    function goToProfile() {
        navigation.navigate("Profil");
    }

    const onPress = (categoryObj) => () => {
        navigation.navigate(categoryObj.stackName, {
            title: categoryObj.title,
            subtitle: categoryObj.subtitle,
            urlEnd: categoryObj.urlEnd,
        });
    };

    const listCategories = categories
        .map((categoryObj, index) => {
            console.log(categoryObj.imgUrl);
            return <TouchableOpacity onPress={onPress(categoryObj)} style={Buttons.buttonGrid} key={index}>
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
            {/* <Text style={Typography.boldCenter}>Platser i Södertälje</Text> */}
            <Text style={Typography.normalCenterLessMargin}>Vart vill du gå idag?</Text>


            <TouchableOpacity style={Images.profilePicContainer} onPress={() => { goToProfile(); }}>
                <Image source={require("../../assets/profilePicBackg.png")} style={Images.profilePicBackg} />
                <Image source={profilepics[picNum]} style={Images.profilePic} />
            </TouchableOpacity>

            {/* {
                isLoggedIn &&
                <Image source={require("../../assets/profilePic.png")} style={Images.profilePic} />
            } */}

            <FlatGrid
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