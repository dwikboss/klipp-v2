import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    AppState,
    Keyboard,
    Image,
    Dimensions,
} from "react-native";
import { useSession } from "../../contexts/SessionContext";
import { useUser } from "../../contexts/UserContext";
import { supabase } from "../../utils/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import GestureFlipView from "react-native-gesture-flip-card";
import GestureCard from "../../components/GestureCard";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

export default function HomeScreen() {
    const { profile, loading } = useUser();

    const renderFront = () => {
        return (
            <View style={styles.frontStyle}>
                <View style={styles.frontTop}>
                    <Text style={styles.carduserName}>Top Section</Text>
                </View>

                <View style={styles.frontBottom}>
                    <Text style={styles.carduserName}>{profile.username}</Text>
                    <Text style={styles.cardBio}>✨Dressin up like dynamite✨</Text>
                    <View style={styles.tagHolder}>
                        <Text style={styles.tag}>FEARNOT</Text>
                        <Text style={styles.tag}>DIVE</Text>
                        <Text style={styles.tag}>ARMY</Text>
                    </View>
                </View>
            </View>
        );
    };

    const renderBack = () => {
        return (
            <View style={styles.frontStyle}>
                <View style={styles.frontTop}>
                    <Text style={styles.carduserName}>Top Section</Text>
                </View>

                <View style={styles.frontBottom}>
                    <Text style={styles.carduserName}>{profile.username}</Text>
                    <Text style={styles.cardBio}>✨Dressin up like dynamite✨</Text>
                    <View style={styles.tagHolder}>
                        <Text style={styles.tag}>FEARNOT</Text>
                        <Text style={styles.tag}>DIVE</Text>
                        <Text style={styles.tag}>ARMY</Text>
                    </View>
                </View>
            </View>
        );
    };

    console.log(width, height);

    return (
        <SafeAreaView style={styles.containerStyle}>
            <Text style={styles.title}>Klipp</Text>
            <GestureFlipView
                width={width}
                height={height * 0.65}
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
        paddingHorizontal: 25,
        alignItems: "center",
        gap: 25,
    },
    frontStyle: {
        flex: 1,
        width: width * 0.9,
        backgroundColor: "red",
        borderRadius: 25,
        overflow: "hidden",
    },
    frontTop: {
        flex: 6,
        justifyContent: "center",
        alignItems: "center",
    },
    frontBottom: {
        flex: 2,
        padding: 25,
        backgroundColor: "green",
        gap: 15
    },
    backStyle: {
        flex: 1,
        width: width * 0.95,
        backgroundColor: "red",
        borderRadius: 25,
    },
    title: {
        fontSize: 28,
        color: "white",
        textAlign: "center",
        marginTop: 15,
        fontFamily: "MontserratAlternates-Bold",
    },
    carduserName: {
        fontSize: 36,
        color: "white",
        fontFamily: "MontserratAlternates-Bold",
    },
    cardBio: {
        fontSize: 14,
        color: "white",
        fontFamily: "Montserrat-Regular",
    },
    tagHolder: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10
    },
    tag: {
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 6,
        alignItems: "center",
        justifyContent: "center",
    },
});
