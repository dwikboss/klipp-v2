import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,
    Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { SessionContext } from "../../contexts/SessionContext";
import CustomButton from "../../components/CustomButton";

const Onboarding1 = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.onboardingMainBodyText}>
                Let's setup your Klipp profile
            </Text>
            <CustomButton title="Let's go!" containerStyles={{ width: "100%" }} handlePress={() => router.push("/onboarding2")}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 75,
        paddingHorizontal: 25,
    },
    onboardingMainBodyText: {
        color: "white",
        fontSize: 48,
        fontFamily: "Montserrat-Bold",
        textAlign: "center",
    },
    onboardingSubtitle: {
        color: "white",
        fontSize: 32,
        fontFamily: "Montserrat-Bold",
        marginBottom: 25,
    },
    formContainer: {
        marginBottom: 30,
    },
});

export default Onboarding1;
