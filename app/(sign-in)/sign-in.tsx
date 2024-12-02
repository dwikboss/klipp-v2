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
import FormField from "../../../components/FormField";
import CustomButton from "../../../components/CustomButton";

const SignIn = () => {
    const router = useRouter();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = () => {
        router.replace("/(tabs)/home");
    };

    return <Text style={{ color: 'white', fontSize: 24 }}>Log in to Klipp</Text>;
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        flexGrow: 1,
    },
    title: {
        fontSize: 34,
        color: "white",
        textAlign: "flex-start",
        marginBottom: 10,
        fontFamily: "MontserratAlternates-Bold",
    },
});

export default SignIn;
