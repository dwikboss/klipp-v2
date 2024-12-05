import { Text, View, StyleSheet, Image, Platform } from "react-native";
import { router, Link, Redirect  } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import Auth from "../components/auth/Auth";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
} from "react-native-reanimated";
import React, { useEffect, useState, useContext } from "react";
import { supabase } from "../utils/supabase";
import { SessionContext } from "../contexts/SessionContext";

const Index = () => {
    const offset = useSharedValue(75 / 2 - 25);
    const session = useContext(SessionContext);

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

    // async function signOut() {
    //     const { error } = await supabase.auth.signOut()
    // }

    // signOut();

    if (!session) {
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
    } else {
        console.log(session);
        return <Redirect href="/onboarding1" />;
    }
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
