import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import PhoneAuth from "../../components/auth/PhoneAuth";

const SignIn = () => {
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                {/* <PhoneAuth /> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        paddingTop: 24
    },
    onboardingTitle: {
        color: "white",
        fontSize: 24,
        fontFamily: "Montserrat-SemiBold",
        marginBottom: 30,
    },
    formContainer: {
        marginBottom: 30,
    },
});

export default SignIn;
