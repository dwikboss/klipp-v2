import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    AppState,
    Keyboard,
} from "react-native";
import { useSession } from "../../contexts/SessionContext";
import { supabase } from "../../utils/supabase";
import React, { useEffect, useState } from "react";

export default function HomeScreen() {
    const session = useSession();

    useEffect(() => {
        const getData = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
        };
        getData();
    }, []);

    return (
        <View>
            <Text>Test</Text>
        </View>
    );
}

const styles = StyleSheet.create({});
