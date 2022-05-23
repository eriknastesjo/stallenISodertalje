import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { Typography, Forms, Base } from '../../styles';


export default function AuthFields({ auth, setAuth, title, submit, navigation }) {
    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>{title}</Text>
            <ScrollView style={Base.content}>
                <Text style={Typography.label}>E-post</Text>
                <TextInput
                    style={Forms.input}
                    onChangeText={(content: string) => {
                        setAuth({ ...auth, email: content })
                    }}
                    value={auth?.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
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
                />
                <Button
                    title={title}
                    color="#4D4948"
                    onPress={() => {
                        submit();
                    }}
                />
                {title === "Logga in" &&
                    <Button
                        title="Registrera istället"
                        color="#4D4948"
                        onPress={() => {
                            navigation.navigate("Register");
                        }}
                    />
                    }
            </ScrollView>
        </View>
    );
};