import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";

interface InputTextProps extends TextInputProps { 
    showPassword?: boolean;
}

export const InputText = ({ showPassword, ...props }: InputTextProps) => {
    return (
        <View>
            <TextInput
                placeholder={props.placeholder}
                value={props.value}
                onChangeText={props.onChangeText}
                secureTextEntry={showPassword}
                {...props}
            />
        </View>
    );
};