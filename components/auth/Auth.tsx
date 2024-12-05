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
                                // console.log(
                                //     JSON.stringify({ error, user }, null, 2)
                                // );
                                if (!error) {
                                    router.replace('/onboarding1');
                                    console.log("User signed in successfully");
                                }
                            } else {
                                throw new Error("No identityToken.");
                            }
                        } catch (e) {
                            if (e.code === "ERR_REQUEST_CANCELED") {
                            } else {
                            }
                        }
                    }}
                />
            </View>
        );
    }
};

export default Auth;
