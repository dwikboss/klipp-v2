import { View, Text, TextInput, StyleSheet } from "react-native";
import { React, useState } from "react";

const FormField = ({
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    ...props
}) => {
    const [showPassword, setshowPassword] = useState(false)

    return (
        <View className={`${otherStyles}`}>
            <View>
                <TextInput
                    style={ styles.inputStyle }
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#71717a"
                    onChangeText={handleChangeText}
                    secureTextEntry = {title === 'Password' && !showPassword}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputStyle: {
        flexGrow: 1,
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: '#2b2b2b',
        fontFamily: "Montserrat-Regular",
    },
});

export default FormField;
