import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    StyleSheet,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, Slot } from "expo-router";

const AuthLayout = () => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <SafeAreaView>
                <Slot/>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "red",
        flex: 1,
    },
    title: {
        fontSize: 34,
        color: "white",
        textAlign: "flex-start",
        marginBottom: 10,
        fontFamily: "MontserratAlternates-Bold",
    },
});

export default AuthLayout;
