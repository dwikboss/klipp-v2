import React, { useState } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
} from "react-native";

const FormField = ({
    title,
    value,
    placeholder,
    handleChangeText,
    keyboardType,
    secureTextEntry = false,
    customTextStyle,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.inputStyle}
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#1f1f1f"
                placeHolder="#1f1f1f"
                textAlign={'center'}
                onChangeText={handleChangeText}
                keyboardType={keyboardType}
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
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        paddingVertical: 15,
        backgroundColor: "black",
    },
    inputStyle: {
        flex: 1,
        color: "white",
        fontFamily: "Montserrat-Bold",
        fontSize: 32
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
