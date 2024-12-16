import {
    View,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OnboardingProvider } from "../../contexts/OnboardingContext";
import React from "react";
import OnboardingCarousel from "./OnboardingCarousel";

const RegisterLayout = () => {
    return (
        <OnboardingProvider>
            <SafeAreaView style={styles.container}>
                <OnboardingCarousel />
            </SafeAreaView>
        </OnboardingProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        paddingBottom: 50,
    },
});

export default RegisterLayout;
