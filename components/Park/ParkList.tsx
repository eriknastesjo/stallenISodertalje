import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import parkModel from '../../models/park';
import { Typography, Base } from '../../styles';


export default function ParkList() {

    const [parks, setParks] = useState([]);


    useEffect(() => {
        (async function () {
            setParks(await parkModel.getData());
        })();
    }, []);


    const listOfParks = parks
        .map((park, index) => {
            return <Button
                color='#A85D14'
                title={park["﻿namn"]}
                key={index}
                // onPress={() => {
                //     navigation.navigate('Details', {
                //         park: park
                //     });
                // }}
            />
        });

    return (
        <ScrollView>
            <Text style={Typography.boldCenter}>Parker</Text>
            {listOfParks}
        </ScrollView>
    );
};