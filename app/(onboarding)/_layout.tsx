import {
    View,
    Text,
    Platform,
    Keyboard,
    StyleSheet,
    KeyboardAvoidingView,
} from "react-native";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

const RegisterLayout = () => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Klipp</Text>
                <Stack>
                    <Stack.Screen
                        name="onboarding1"
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="onboarding2"
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        backgroundColor: "black",
        paddingBottom: 25,
    },
    title: {
        fontSize: 24,
        color: "white",
        textAlign: "center",
        marginTop: 10,
        fontFamily: "MontserratAlternates-Bold",
    },
});

export default RegisterLayout;
