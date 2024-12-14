import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useOnboarding } from "../../contexts/OnboardingContext";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import ImageUpload from "../../components/ImageUpload";
import * as ImagePicker from "expo-image-picker";

const Onboarding3 = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const { data, setData } = useOnboarding();

    const handleInputChange = (text: string) => {
        setData({ username: text });
    };

    return (
        <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Klipp</Text>
            <View style={styles.formContainer}>
                <Text style={styles.onboardingSubtitle}>
                    Annyeong {data.username}!
                </Text>
                <Text style={styles.onboardingMainBodyText}>
                    Upload a profile picture
                </Text>
                <ImageUpload
                    containerStyle={{
                        width: 150,
                        height: 150,
                        borderRadius: 999,
                    }}
                    imageStyle={{ borderRadius: 999 }}
                />
            </View>

            <View style={{ width: "100%" }}>
                <CustomButton
                    title="Continue"
                    containerStyles={{ width: "100%" }}
                    handlePress={() => router.push("/onboarding4")}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        color: "white",
        textAlign: "center",
        marginTop: 25,
        fontFamily: "MontserratAlternates-Bold",
    },
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        paddingHorizontal: 25,
    },
    onboardingSubtitle: {
        color: "white",
        fontSize: 24,
        textAlign: "center",
        fontFamily: "Montserrat-SemiBold",
        marginBottom: 20
    },
    onboardingMainBodyText: {
        color: "white",
        fontSize: 38,
        fontFamily: "Montserrat-Bold",
        textAlign: "center",
        marginBottom: 50
    },
    formContainer: {
        marginBottom: 30,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Onboarding3;
