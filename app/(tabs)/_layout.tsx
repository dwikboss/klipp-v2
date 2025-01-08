import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Image } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "../../contexts/SessionContext";
import { UserProvider, useUser } from "../../contexts/UserContext";
import { supabase } from "../../utils/supabase";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function AppLayout() {
    const router = useRouter();
    const session = useSession();
    const { profile, loading } = useUser();
    const [avatarUrl, setAvatarUrl] = useState("");

    useEffect(() => {
        if (!session) {
            router.replace("/");
        }
    }, [session, router]);

    useEffect(() => {
        if (profile?.avatar_url) {
            setAvatarUrl(profile.avatar_url);
        }
    }, [profile?.avatar_url]);

    console.log(avatarUrl);

    return (
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
                name="scanner"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={28} name="camera" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="home"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={28} name="tablet" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) =>
                        avatarUrl ? (
                            <Image
                                source={{ uri: avatarUrl }}
                                style={[styles.avatar, { borderColor: color }]}
                            />
                        ) : (
                            <FontAwesome size={28} name="cog" color={color} />
                        ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: "black",
        flex: 1,
        paddingBottom: 25,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 14,
        borderWidth: 1,
    },
    title: {
        fontSize: 24,
        color: "white",
        textAlign: "center",
        marginTop: 10,
        fontFamily: "MontserratAlternates-Bold",
    },
});
