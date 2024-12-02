import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField"; // Adjust the path if necessary
import { SafeAreaView } from "react-native-safe-area-context";

const Onboarding1 = () => {
    const router = useRouter();

    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleNextStep = () => {
        if (form.password !== form.confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }
        // Proceed to next step
        router.push("/register/onboarding2");
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.onboardingTitle}>
                Let's create your Klipp account first!
            </Text>

            <View style={styles.formContainer}>
                <FormField
                    title="Email"
                    value={form.email}
                    placeholder="Enter your email"
                    handleChangeText={(value) =>
                        setForm({ ...form, email: value })
                    }
                />
                <FormField
                    title="Password"
                    value={form.password}
                    placeholder="Enter your password"
                    secureTextEntry={true}
                    handleChangeText={(value) =>
                        setForm({ ...form, password: value })
                    }
                />
                <FormField
                    title="Confirm Password"
                    value={form.confirmPassword}
                    placeholder="Confirm your password"
                    secureTextEntry={true}
                    handleChangeText={(value) =>
                        setForm({ ...form, confirmPassword: value })
                    }
                />
            </View>

            <CustomButton title="Register account" handlePress={handleNextStep} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
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

export default Onboarding1;
