import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { Redirect, useRouter } from "expo-router";
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
    const router = useRouter();

    const [profileUpdatedAt, setProfileUpdatedAt] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(false);

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
            const startTime = Date.now();
            setLoading(true);
            setFetching(true);
    
            try {
                if (!session?.user?.id) {
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);
                    return;
                }
    
                const { data: profile, error } = await supabase
                    .from("profiles")
                    .select("updated_at")
                    .eq("id", session.user.id)
                    .single();
    
                if (error) {
                    console.error("Error fetching profile:", error);
                } else {
                    setProfileUpdatedAt(profile?.updated_at);
                    const targetRoute = profile?.updated_at
                        ? "/home"
                        : "/OnboardingCarousel";
    
                    const elapsedTime = Date.now() - startTime;
                    const delay = Math.max(1500 - elapsedTime, 0);
                    setTimeout(() => {
                        router.replace(targetRoute);
                    }, delay);
                }
            } catch (error) {
                console.error("Unexpected error:", error);
            } finally {
                const elapsedTime = Date.now() - startTime;
                const delay = Math.max(1500 - elapsedTime, 0);
                setTimeout(() => {
                    setFetching(false);
                    setLoading(false);
                }, delay);
            }
        };
    
        fetchProfile();
    }, [session?.user?.id]);
    

    if (loading || fetching) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "black"
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontFamily: "MontserratAlternates-Bold",
                        fontSize: 64,
                        marginBottom: 50,
                    }}
                >
                    Klipp
                </Text>
                <ActivityIndicator size="small" color="#fff" />
            </View>
        );
    }

    // if (session) {
    //     if (!profileUpdatedAt) {
    //         return <Redirect href="/onboarding1" />;
    //     } else {
    //         return <Redirect href="/home" />;
    //     }
    // }

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
    animatedStyles: {
        height: 250,
        width: 250,
        borderRadius: 20,
    },
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    topSection: {
        flex: 8,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 16,
    },
    bottomSection: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 25,
        paddingRight: 25,
    },
    title: {
        fontSize: 56,
        color: "white",
        textAlign: "center",
        marginBottom: 10,
        fontFamily: "MontserratAlternates-Bold",
    },
    subtitle: {
        fontSize: 20,
        color: "white",
        textAlign: "center",
        marginBottom: 30,
        fontFamily: "Montserrat-Regular",
    },
});

export default Index;
