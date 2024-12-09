import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
} from "react-native-reanimated";
import { supabase } from "../utils/supabase";
import { useSession } from "../contexts/SessionContext";
import Auth from "../components/auth/Auth";

const Index = () => {
    const offset = useSharedValue(75 / 2 - 25);
    const session = useSession();
    const [profileUpdatedAt, setProfileUpdatedAt] = useState(null);
    const [loading, setLoading] = useState(true);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: offset.value }],
    }));

    useEffect(() => {
        offset.value = withRepeat(
            withTiming(-offset.value, { duration: 3000 }),
            -1,
            true
        );
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (!session?.user?.id) {
                    setLoading(false);
                    return;
                }

                const { data: profile, error } = await supabase
                    .from("profiles")
                    .select("updated_at")
                    .eq("id", session.user.id)
                    .single();

                if (error) {
                    console.error("Error fetching profile:", error);
                    return;
                }

                setProfileUpdatedAt(profile?.updated_at);
            } catch (error) {
                console.error("Unexpected error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [session]);

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    if (profileUpdatedAt) {
        return <Redirect href="/home" />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topSection}>
                <Text style={styles.title}>Klipp</Text>
                <Text style={styles.subtitle}>Collect your friends</Text>
                <Animated.View style={animatedStyles}>
                    <Image
                        style={{ height: "90%" }}
                        source={require("../assets/images/home.png")}
                        resizeMode="contain"
                    />
                </Animated.View>
            </View>

            <View style={styles.bottomSection}>
                <Auth />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },
    topSection: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#555",
        marginBottom: 30,
    },
    bottomSection: {
        flex: 0.5,
        justifyContent: "flex-end",
        alignItems: "center",
    },
});

export default Index;