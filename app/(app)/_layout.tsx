import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "../../contexts/SessionContext";

export default function AppLayout() {
    const router = useRouter();
    const session = useSession();

    useEffect(() => {
        if (!session) {
            router.replace("/");
        }
    }, [session, router]);

    return (
        <SafeAreaView style={styles.containerStyle}>
            <Text style={styles.title}>Klipp</Text>
            <Stack>
                <Stack.Screen
                    name="home"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: "black",
        flex: 1,
        paddingBottom: 25,
    },
    title: {
        fontSize: 24,
        color: "white",
        textAlign: "center",
        marginTop: 10,
        fontFamily: "MontserratAlternates-Bold",
    },
});
