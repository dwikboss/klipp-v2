import { View, Text, Platform, Keyboard, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

const RegisterLayout = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Stack>
                <Stack.Screen
                    name="onboarding1"
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

export default RegisterLayout;
