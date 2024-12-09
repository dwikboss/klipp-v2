import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { supabase } from "../../utils/supabase";

export default function TabLayout() {
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session) {
                router.replace("/");
            }
        };

        checkSession();

        const { data: subscription } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (!session) {
                    router.replace("/");
                }
            }
        );

        return () => subscription.subscription.unsubscribe();
    }, [router]);

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
