import React, { useState } from "react";
import { Platform, View, StyleSheet, ActivityIndicator } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { supabase } from "../../utils/supabase";
import { router, Link } from "expo-router";

const Auth = () => {
    const [loading, setLoading] = useState(false);

    if (Platform.OS === "ios") {
        return (
            <View>
                {loading ? (
                    <ActivityIndicator size="large" color="#fff" />
                ) : (
                    <AppleAuthentication.AppleAuthenticationButton
                        buttonType={
                            AppleAuthentication.AppleAuthenticationButtonType
                                .SIGN_IN
                        }
                        buttonStyle={
                            AppleAuthentication.AppleAuthenticationButtonStyle
                                .WHITE
                        }
                        cornerRadius={999}
                        style={{ width: 300, height: 50 }}
                        onPress={async () => {
                            setLoading(true);
                            try {
                                const credential =
                                    await AppleAuthentication.signInAsync({
                                        requestedScopes: [
                                            AppleAuthentication
                                                .AppleAuthenticationScope
                                                .FULL_NAME,
                                            AppleAuthentication
                                                .AppleAuthenticationScope.EMAIL,
                                        ],
                                    });
                                if (credential.identityToken) {
                                    const {
                                        error,
                                        data: { user },
                                    } = await supabase.auth.signInWithIdToken({
                                        provider: "apple",
                                        token: credential.identityToken,
                                    });
                                    console.log("Sign-in response:", {
                                        error,
                                        user,
                                    });

                                    if (!error) {
                                        const {
                                            data: profile,
                                            error: profileError,
                                        } = await supabase
                                            .from("profiles")
                                            .select("updated_at")
                                            .eq("id", user?.id)
                                            .single();

                                        if (profileError) {
                                            console.error(
                                                "Error fetching profile:",
                                                profileError
                                            );
                                            throw profileError;
                                        }
                                    }
                                } else {
                                    throw new Error("No identityToken.");
                                }
                            } catch (e: any) {
                                if (e?.code === "ERR_REQUEST_CANCELED") {
                                    console.log("Request canceled");
                                } else {
                                    console.error("Error during sign-in:", e);
                                }
                            } finally {
                                setLoading(false);
                            }
                        }}
                    />
                )}
            </View>
        );
    }
};

export default Auth;