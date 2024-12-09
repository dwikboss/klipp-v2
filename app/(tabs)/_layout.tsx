import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { Colors } from "@/constants/Colors";

export default function TabLayout() {
    return (
            <Stack>
                <Stack.Screen
                    name="home"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
    );
}
