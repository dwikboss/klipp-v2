import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "../../contexts/SessionContext";
import { UserProvider } from "../../contexts/UserContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function AppLayout() {
    const router = useRouter();
    const session = useSession();
    

    useEffect(() => {
        if (!session) {
            router.replace("/");
        }
    }, [session, router]);

    return (
        <UserProvider>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: "white",
                    tabBarInactiveTintColor: "grey",
                    tabBarStyle: {
                        backgroundColor: "#000",
                        borderTopWidth: 0,
                    },
                    tabBarShowLabel: false,
                }}
            >
                <Tabs.Screen
                    name="social"
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <FontAwesome size={28} name="user" color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="home"
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <FontAwesome
                                size={28}
                                name="tablet"
                                color={color}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <FontAwesome size={28} name="cog" color={color} />
                        ),
                    }}
                />
            </Tabs>
        </UserProvider>
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
