import React, { useState, useContext, createContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useOnboarding } from "../../contexts/OnboardingContext";
import { useSession } from "../../contexts/SessionContext";
import { supabase } from "../../utils/supabase";
import CustomButton from "../../components/CustomButton";

const Onboarding4 = () => {
    const router = useRouter();
    const session = useSession();
    const { data, setData } = useOnboarding();
    const [loading, setLoading] = useState(false);

    console.log("user: " + session.user.id);

    const handleSubmit = async () => {
        setLoading(true);

        try {
            let avatarUrl = null;
            if (data.avatarFile) {
                const file = data.avatarFile;
                const { data: storageData, error } = await supabase.storage
                    .from("avatars")
                    .upload(file.name, { uri: file.uri, type: file.type });

                if (error) {
                    throw new Error("Avatar upload failed");
                }

                avatarUrl = supabase.storage
                    .from("avatars")
                    .getPublicUrl(file.name).data.publicUrl;
            }

            const { error } = await supabase
                .from("profiles")
                .update({
                    username: data.username,
                    avatar_url: avatarUrl,
                    updated_at: new Date(),
                })
                .eq("id", session?.user.id);

            if (error) {
                throw new Error("Profile upload failed");
            }

            router.push("/(tabs)/home");
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.onboardingSubtitle}>All set.</Text>
                <Text style={styles.onboardingMainBodyText}>
                    Welcome to Klipp!
                </Text>
            </View>

            <View style={{ width: "100%" }}>
                <CustomButton
                    title="Continue"
                    containerStyles={{ width: "100%" }}
                    handlePress={handleSubmit}
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
    onboardingSubtitle: {
        color: "white",
        fontSize: 24,
        textAlign: "center",
        fontFamily: "Montserrat-SemiBold",
        marginBottom: 20,
    },
    onboardingMainBodyText: {
        color: "white",
        fontSize: 38,
        fontFamily: "Montserrat-Bold",
        textAlign: "center",
        marginBottom: 50,
    },
    formContainer: {
        marginBottom: 30,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Onboarding4;
