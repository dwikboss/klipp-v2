import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
    Platform,
    AppState,
    Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { useOnboarding } from "../../contexts/OnboardingContext";

const Onboarding2 = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const { data, setData } = useOnboarding();

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.onboardingMainBodyText}>
                    Pick a username
                </Text>
                <FormField
                    placeholder="Your name"
                    handleChangeText={(e) => setData({ username: e })}
                />
            </View>

            <View style={{ width: "100%" }}>
                <Text style={styles.onboardingSubtitle}>
                    Don't worry. You will be able to change your username later.
                </Text>
                <CustomButton
                    title="Continue"
                    containerStyles={{ width: "100%" }}
                    handlePress={() => router.push("/onboarding3")}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        paddingTop: 75,
        paddingHorizontal: 25,
    },
    onboardingMainBodyText: {
        color: "white",
        fontSize: 24,
        fontFamily: "Montserrat-SemiBold",
        textAlign: "center",
    },
    onboardingSubtitle: {
        color: "#545454",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 20,
        fontFamily: "Montserrat-Regular",
    },
    formContainer: {
        marginBottom: 30,
        width: "100%",
    },
});

export default Onboarding2;
