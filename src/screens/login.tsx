import React, { useState } from "react";
import { View, Text } from "react-native";
import { InputText } from "../components/input-text";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View>
            <Text>Login</Text>

            <InputText
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            <InputText
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                showPassword={true}
            />


        </View>
    );
};

export default LoginScreen;