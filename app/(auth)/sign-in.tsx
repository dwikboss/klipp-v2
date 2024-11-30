import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

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

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <SafeAreaView className="">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="">
                        <Text className="">
                            Log in to Klipp
                        </Text>
                        <FormField
                            title="Email"
                            value={form.email}
                            placeholder="Email"
                            handleChangeText={(e) =>
                                setForm({ ...form, email: e })
                            }
                            otherStyles=""
                            keyboardType="email-address"
                        />
                        <FormField
                            title="Password"
                            value={form.password}
                            placeholder="Password"
                            handleChangeText={(e) =>
                                setForm({ ...form, password: e })
                            }
                            otherStyles=""
                        />
                        <View style={{ flex: 1 }} />
                        <CustomButton
                            title="Log in"
                            handlePress={submit}
                            containerStyles=""
                            isLoading={isSubmitting}
                        />
                        <View className="">
                            <Text className="">
                                Don't have an account?
                            </Text>
                            <Link
                                className=""
                                href="/sign-up"
                            >
                                Sign Up
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default SignIn;
