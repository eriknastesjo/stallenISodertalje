import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image } from 'react-native';
import { Typography, Base, Buttons, Images } from '../../styles';
import { FlatGrid } from 'react-native-super-grid';


export default function Categories({ categories, artefact, isLoggedIn, navigation }) {

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
            </TouchableOpacity>
        });

    return (
        <View style={Base.centerContainer}>

            <Image source={require("../../assets/heart.png")} style={Images.heart} />
            <Text style={Typography.boldCenter}>Hej {artefact.ownerName} och {artefact.dogName},</Text>
            <Text style={Typography.normalCenter}>vart vill ni gå idag?</Text>

            {
                isLoggedIn &&
                <Image source={require("../../assets/profilePic.png")} style={Images.profilePic} />
            }

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