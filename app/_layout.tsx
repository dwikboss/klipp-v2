import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { SessionProvider } from "../contexts/SessionContext";
import "react-native-reanimated";
import { AppState } from "react-native";
import { Session } from "@supabase/supabase-js";
import * as SplashScreen from "expo-splash-screen";

AppState.addEventListener("change", (state) => {
    if (state === "active") {
        supabase.auth.startAutoRefresh();
    } else {
        supabase.auth.stopAutoRefresh();
    }
});

export default function RootLayout() {
    const [session, setSession] = useState<Session | null>(null);
    const [fontsLoaded, error] = useFonts({
        "Montserrat-Black": require("../assets/fonts/Montserrat-Black.ttf"),
        "Montserrat-BlackItalic": require("../assets/fonts/Montserrat-BlackItalic.ttf"),
        "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
        "Montserrat-BoldItalic": require("../assets/fonts/Montserrat-BoldItalic.ttf"),
        "Montserrat-ExtraBold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
        "Montserrat-ExtraBoldItalic": require("../assets/fonts/Montserrat-ExtraBoldItalic.ttf"),
        "Montserrat-ExtraLight": require("../assets/fonts/Montserrat-ExtraLight.ttf"),
        "Montserrat-ExtraLightItalic": require("../assets/fonts/Montserrat-ExtraLightItalic.ttf"),
        "Montserrat-Italic": require("../assets/fonts/Montserrat-Italic.ttf"),
        "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
        "Montserrat-LightItalic": require("../assets/fonts/Montserrat-LightItalic.ttf"),
        "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
        "Montserrat-MediumItalic": require("../assets/fonts/Montserrat-MediumItalic.ttf"),
        "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
        "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
        "Montserrat-SemiBoldItalic": require("../assets/fonts/Montserrat-SemiBoldItalic.ttf"),
        "Montserrat-Thin": require("../assets/fonts/Montserrat-Thin.ttf"),
        "Montserrat-ThinItalic": require("../assets/fonts/Montserrat-ThinItalic.ttf"),
        "MontserratAlternates-Black": require("../assets/fonts/MontserratAlternates-Black.ttf"),
        "MontserratAlternates-BlackItalic": require("../assets/fonts/MontserratAlternates-BlackItalic.ttf"),
        "MontserratAlternates-Bold": require("../assets/fonts/MontserratAlternates-Bold.ttf"),
        "MontserratAlternates-BoldItalic": require("../assets/fonts/MontserratAlternates-BoldItalic.ttf"),
        "MontserratAlternates-ExtraBold": require("../assets/fonts/MontserratAlternates-ExtraBold.ttf"),
        "MontserratAlternates-ExtraBoldItalic": require("../assets/fonts/MontserratAlternates-ExtraBoldItalic.ttf"),
        "MontserratAlternates-ExtraLight": require("../assets/fonts/MontserratAlternates-ExtraLight.ttf"),
        "MontserratAlternates-ExtraLightItalic": require("../assets/fonts/MontserratAlternates-ExtraLightItalic.ttf"),
        "MontserratAlternates-Italic": require("../assets/fonts/MontserratAlternates-Italic.ttf"),
        "MontserratAlternates-Light": require("../assets/fonts/MontserratAlternates-Light.ttf"),
        "MontserratAlternates-LightItalic": require("../assets/fonts/MontserratAlternates-LightItalic.ttf"),
        "MontserratAlternates-Medium": require("../assets/fonts/MontserratAlternates-Medium.ttf"),
        "MontserratAlternates-MediumItalic": require("../assets/fonts/MontserratAlternates-MediumItalic.ttf"),
        "MontserratAlternates-Regular": require("../assets/fonts/MontserratAlternates-Regular.ttf"),
        "MontserratAlternates-SemiBold": require("../assets/fonts/MontserratAlternates-SemiBold.ttf"),
        "MontserratAlternates-SemiBoldItalic": require("../assets/fonts/MontserratAlternates-SemiBoldItalic.ttf"),
        "MontserratAlternates-Thin": require("../assets/fonts/MontserratAlternates-Thin.ttf"),
        "MontserratAlternates-ThinItalic": require("../assets/fonts/MontserratAlternates-ThinItalic.ttf"),
    });

    const router = useRouter();
    // async function signOut() {
    //     const { error } = await supabase.auth.signOut();
    // }
    // signOut();

    useEffect(() => {
        if (error) throw error;
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, [router]);

    useEffect(() => {
        if (error) throw error;
    }, [fontsLoaded, error]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SessionProvider session={session}>
            <Slot />
        </SessionProvider>
    );
}
