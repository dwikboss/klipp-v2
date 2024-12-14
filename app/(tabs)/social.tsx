import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

const social = () => {
    return <SafeAreaView style={styles.containerStyle}></SafeAreaView>;
};

export default social;

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: "black",
        flex: 1,
        paddingBottom: 25,
        alignItems: "center",
        gap: 35,
    },
});
