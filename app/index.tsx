import { Text, View, StyleSheet, Image } from "react-native";
import { router, Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
} from "react-native-reanimated";
import React, { useEffect, useState } from "react";

const Index = () => {
    const offset = useSharedValue(75 / 2 - 25);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: offset.value }],
    }));

    React.useEffect(() => {
        offset.value = withRepeat(
            withTiming(-offset.value, { duration: 3000 }),
            -1,
            true
        );
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topSection}>
                <Text style={styles.title}>Klipp</Text>
                <Text style={styles.subtitle}>Collect your friends</Text>
                <Animated.View style={animatedStyles}>
                    <Image
                        style={{height: '90%'}}
                        source={require("../assets/images/home.png")}
                        resizeMode="contain"
                    />
                </Animated.View>
            </View>

            <View style={styles.bottomSection}>
                <CustomButton
                    title="Create my account"
                    containerStyles={{ width: '100%' }}
                    handlePress={() => router.push("/onboarding1")}
                />
                <CustomButton
                    title="Already have an account? Click here"
                    containerStyles={{ width: '100%', backgroundColor: 'none'}}
                    textStyles={{ color: 'white', fontFamily: "Montserrat-Regular", fontSize: 14 }}
                    handlePress={() => router.push("register/onboarding1")}
                />
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