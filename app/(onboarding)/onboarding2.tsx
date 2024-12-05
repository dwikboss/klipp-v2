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
import CustomButton from "../../../components/CustomButton";
import FormField from "../../../components/FormField";
import { supabase } from "../../../utils/supabase";
import { SafeAreaView } from "react-native-safe-area-context";

AppState.addEventListener("change", (state) => {
    if (state === "active") {
        supabase.auth.startAutoRefresh();
    } else {
        supabase.auth.stopAutoRefresh();
    }
});

const Onboarding2 = () => {
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
            <Text style={styles.onboardingSubtitle}>
                Pick a cool username!
            </Text>
            <Text style={styles.onboardingTitle}>
                Pick a cool username!
            </Text>

            <View style={styles.formContainer}>
                <FormField
                    title="Email"
                    value={form.email}
                    placeholder="Your name"
                    handleChangeText={(value) =>
                        setForm({ ...form, email: value })
                    }
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

export default Onboarding2;
