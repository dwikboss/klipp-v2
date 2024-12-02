import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";

const FormField = ({
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    secureTextEntry = false,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={otherStyles}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputStyle}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#71717a"
                    onChangeText={handleChangeText}
                    secureTextEntry={secureTextEntry && !showPassword}
                />
                {secureTextEntry && (
                    <TouchableOpacity
                        style={styles.toggleButton}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Text style={styles.toggleText}>
                            {showPassword ? "Hide" : "Show"}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2b2b2b",
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
    },
    inputStyle: {
        flex: 1,
        paddingVertical: 20,
        color: "white",
        fontFamily: "Montserrat-Regular",
    },
    toggleButton: {
        marginLeft: 10,
    },
    toggleText: {
        color: "#71717a",
        fontFamily: "Montserrat-Regular",
    },
});

export default FormField;