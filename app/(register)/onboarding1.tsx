import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    AppState,
    Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { supabase } from "../utils/supabase";
import { SafeAreaView } from "react-native-safe-area-context";

AppState.addEventListener("change", (state) => {
    if (state === "active") {
        supabase.auth.startAutoRefresh();
    } else {
        supabase.auth.stopAutoRefresh();
    }
});

const Onboarding1 = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    async function signUpWithEmail() {
        console.log(form.email, form.password);
        setLoading(true);
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: form.email,
            password: form.password,
        });

        if (error) {
            Alert.alert(error.message);
        } else if (!session) {
            Alert.alert("Please check your inbox for email verification!");
        }
        setLoading(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.onboardingTitle}>
                Let's create your account first!
            </Text>

            <View style={styles.formContainer}>
                <FormField
                    title="Email"
                    value={form.email}
                    placeholder="Enter your email"
                    handleChangeText={(value) =>
                        setForm({ ...form, email: value })
                    }
                    keyboardType="email-address"
                />
                <FormField
                    title="Password"
                    value={form.password}
                    placeholder="Enter your password"
                    handleChangeText={(value) =>
                        setForm({ ...form, password: value })
                    }
                    secureTextEntry
                    blurOnSubmit={false}
                    onSubmitEditing={() => Keyboard.dismiss()}
                />
            </View>

            <CustomButton
                title="Create my account"
                handlePress={signUpWithEmail}
                disabled={loading}
            />
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
