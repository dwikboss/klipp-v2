import React, { useState, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    AppState,
    Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { SessionContext } from "../../contexts/SessionContext";
import CustomButton from "../../components/CustomButton";

const Onboarding1 = () => {
    const router = useRouter();
    const session = useContext(SessionContext);
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.onboardingSubtitle}>
                Let's setup your Klipp profile!
            </Text>

            <CustomButton
                title="Create my account"
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
    },
    onboardingTitle: {
        color: "white",
        fontSize: 24,
        fontFamily: "Montserrat-SemiBold",
        marginBottom: 30,
    },
    onboardingSubtitle: {
        color: "white",
        fontSize: 16,
        fontFamily: "Montserrat-Regular",
    },
    formContainer: {
        marginBottom: 30,
    },
});

export default Onboarding1;
