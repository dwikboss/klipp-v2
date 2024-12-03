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
        <SafeAreaView style={styles.container}>
            <Stack>
                <Stack.Screen
                    name="sign-in"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        backgroundColor: "black",
    },
});

export default AuthLayout;
