import { Platform, View, StyleSheet } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { supabase } from "../../utils/supabase";
import { router, Link } from "expo-router";

const Auth = () => {
    if (Platform.OS === "ios") {
        return (
            <View>
                <AppleAuthentication.AppleAuthenticationButton
                    buttonType={
                        AppleAuthentication.AppleAuthenticationButtonType
                            .SIGN_IN
                    }
                    buttonStyle={
                        AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
                    }
                    cornerRadius={999}
                    style={{ width: 300, height: 50 }}
                    onPress={async () => {
                        try {
                            const credential =
                                await AppleAuthentication.signInAsync({
                                    requestedScopes: [
                                        AppleAuthentication
                                            .AppleAuthenticationScope.FULL_NAME,
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

                                if (!error) {
                                    const { data: profile, error: profileError } = await supabase
                                        .from("profiles")
                                        .select("updated_at")
                                        .eq("id", user?.id)
                                        .single();

                                    if (profileError) {
                                        console.error("Error fetching profile:", profileError);
                                        throw profileError;
                                    }

                                    if (profile?.updated_at) {
                                        router.replace("/home");
                                        console.log("user is not new");
                                    } else {
                                        console.log("user is new!");
                                    }
                                }
                            } else {
                                throw new Error("No identityToken.");
                            }
                        } catch (e) {
                            if (e.code === "ERR_REQUEST_CANCELED") {
                                console.log("Request canceled");
                            } else {
                                console.error("Error during sign-in:", e);
                            }
                        }
                    }}
                />
            </View>
        );
    }
};

export default Auth;