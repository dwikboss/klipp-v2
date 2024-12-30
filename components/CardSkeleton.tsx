import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const CardSkeleton = () => {
    return (
        <View style={styles.skeletonContainer}>
            <View style={styles.skeletonTop} />
            <View style={styles.skeletonBottom}>
                <View style={styles.skeletonText} />
                <View style={styles.skeletonTextSmall} />
                <View style={styles.skeletonPills}>
                    <View style={styles.skeletonPill} />
                    <View style={styles.skeletonPill} />
                    <View style={styles.skeletonPill} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    skeletonContainer: {
        flex: 1,
        width: width * 0.92,
        backgroundColor: "#383838",
        borderRadius: 25,
        overflow: "hidden",
        marginVertical: 10,
    },
    skeletonTop: {
        flex: 6,
        justifyContent: "center",
        alignItems: "center",
    },
    skeletonBottom: {
        flex: 2,
        padding: 25,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    skeletonText: {
        width: "60%",
        height: 20,
        backgroundColor: "#6a6a6a",
        borderRadius: 10,
        marginBottom: 10,
    },
    skeletonTextSmall: {
        width: "40%",
        height: 15,
        backgroundColor: "#6a6a6a",
        borderRadius: 10,
        marginBottom: 20,
    },
    skeletonPills: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    skeletonPill: {
        width: 60,
        height: 20,
        backgroundColor: "#6a6a6a",
        borderRadius: 10,
    },
});

export default CardSkeleton;
