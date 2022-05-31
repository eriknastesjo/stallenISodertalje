import { Ionicons, Foundation, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity } from "react-native";
import { Typography, Forms, Base, Buttons } from '../../styles';


export default function AuthFields({ auth, setAuth, title, submit, navigation }) {
    return (
        <View>
            <Text></Text>
            <Text></Text>
            <ScrollView style={Base.content}>
                {title === "Registrera dig" &&
                    <View>
                        <Text style={Typography.label}>Ditt namn</Text>
                        <TextInput
                            style={Forms.input}
                            onChangeText={(content: string) => {
                                setAuth({ ...auth, ownerName: content })
                            }}
                            value={auth?.ownerName}
                            selectionColor={'#46A450'}
                        />
                        <Text style={Typography.label}>Hundens namn</Text>
                        <TextInput
                            style={Forms.input}
                            onChangeText={(content: string) => {
                                setAuth({ ...auth, dogName: content })
                            }}
                            value={auth?.dogName}
                            selectionColor={'#46A450'}
                        />
                    </View>
                }
                <Text style={Typography.label}>E-post</Text>
                <TextInput
                    style={Forms.input}
                    onChangeText={(content: string) => {
                        setAuth({ ...auth, email: content })
                    }}
                    value={auth?.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    selectionColor={'#46A450'}
                />
                <Text style={Typography.label}>Lösenord</Text>
                <TextInput
                    style={Forms.input}
                    onChangeText={(content: string) => {
                        setAuth({ ...auth, password: content })
                    }}
                    value={auth?.password}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    selectionColor={'#46A450'}
                />
                <View style={Buttons.buttonContainer}>
                    <TouchableOpacity onPress={() => { submit(); }} style={Buttons.buttonProfileCenter}>
                        <Text style={Typography.boldButtonSideWhite}>{title}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};