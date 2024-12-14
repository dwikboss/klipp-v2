import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    AppState,
    Keyboard,
    Image,
} from "react-native";
import { useSession } from "../../contexts/SessionContext";
import { useUser } from "../../contexts/UserContext";
import { supabase } from "../../utils/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import GestureFlipView from "react-native-gesture-flip-card";

export default function HomeScreen() {
    const { profile, loading } = useUser();

    const renderFront = () => {
        return (
            <View style={styles.frontStyle}>
                <Image
                    source={require("../../assets/images/c-dwyk.png")}
                    resizeMode="contain"
                    style={styles.imageStyle}
                />
            </View>
        );
    };

    const renderBack = () => {
        return (
            <View style={styles.backStyle}>
                <Image
                    source={require("../../assets/images/c-back.png")}
                    resizeMode="contain"
                    style={styles.imageStyle}
                />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.containerStyle}>
            <Text style={styles.title}>Klipp</Text>
            <GestureFlipView
                width={300}
                height={550}
                renderFront={renderFront}
                renderBack={renderBack}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: "black",
        flex: 1,
        paddingBottom: 25,
        alignItems: "center",
        gap: 35
    },
    // front: {
    //     backgroundColor: "red",
    //     width: 350,
    //     height: "100%",
    //     borderRadius: 25,
    // },
    imageStyle: {
        width: 1200,
        height: "100%",
        borderRadius: 25,
    },
    title: {
        fontSize: 24,
        color: "white",
        textAlign: "center",
        marginTop: 25,
        fontFamily: "MontserratAlternates-Bold",
    },
});
