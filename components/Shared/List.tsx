import { Ionicons, Foundation, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
// import parkModel from '../../models/park';
import { Typography, Base, Buttons } from '../../styles';


export default function List({ navigation, listItems, title, subtitle }) {

    // Get in alphabetical order
    listItems.sort((a, b) => {
        let fa = a.namn.toLowerCase(),
            fb = b.namn.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }

        return 0;
    });

    // Create buttons from ordered list
    const listReturn = listItems
        .map((listItem, index) => {
            return <View style={Buttons.buttonContainer} key={index}>
                <TouchableOpacity
                    style={Buttons.button2}
                    onPress={() => {
                        navigation.navigate('Detaljer', {
                            detailObj: listItem
                        });
                    }}
                >
                    <Text style={Typography.normalButton}>   {listItem.namn}</Text>
                    <View style={Buttons.buttonArrow2}><AntDesign name="rightcircle" size={20} color="#9AE9A1" /></View>
                </TouchableOpacity>
            </View>
        });

    return (
        <ScrollView style={Base.backgroundCol}>
            {subtitle !== undefined ?
                <View>
                    <Text style={Typography.header1NoMargin}>{title}</Text>
                    <Text style={Typography.header3}>{subtitle}</Text>
                </View>
                :
                <View>
                    <Text style={Typography.header1}>{title}</Text>
                </View>
            }
            {listReturn}
        </ScrollView>
    );
};