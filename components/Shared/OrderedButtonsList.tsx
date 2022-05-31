import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import parkModel from '../../models/park';
import { Typography, Base, Buttons } from '../../styles';


export default function OrderedButtonsList({ navigation, listOfItems }) {

    // console.log(listOfItems);

    // Get in alphabetical order
    listOfItems.sort((a, b) => {
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
    const listOfParks = listOfItems
        .map((park, index) => {
            return <View style={Buttons.buttonContainer} key={index}>
                <TouchableOpacity
                    style={Buttons.button2}
                    onPress={() => {
                        navigation.navigate('Detaljer', {
                            detailObj: park
                        });
                    }}
                >
                    <Text style={Typography.normalButton}>{park.namn}</Text>
                </TouchableOpacity>
            </View>
        });

    return (
        <View>
            {listOfParks}
        </View>
    );
};