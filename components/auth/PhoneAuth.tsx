import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Alert,
    AppState,
    Keyboard,
} from "react-native";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import supabase from "../../utils/supabase";

// AppState.addEventListener("change", (state) => {
//     if (state === "active") {
//         supabase.auth.startAutoRefresh();
//     } else {
//         supabase.auth.stopAutoRefresh();
//     }
// });

const PhoneAuth = () => {
    const [form, setForm] = useState({
        phone: "",
    });

    async function signUpWithPhone() {
        console.log(form.phone);
        const { data, error } = await supabase.auth.signUp({
            phone: form.phone,
        })

        if (error) {
            Alert.alert(error.message);
        } else if (!session) {
            Alert.alert("Registered succesfully!");
        }
    }

    return (
        <View>
            <Text style={styles.onboardingTitle}>
                What's your{"\n"}phone number?
            </Text>
            <FormField
                title="Phone number"
                placeholder="Phone number"
                otherStyles={{ backgroundColor: "red" }}
                handleChangeText={(value) =>
                    setForm({ ...form, phone: value })
                }
            />
            <FormField
                title="Phone number"
                placeholder="Phone number"
                otherStyles={{ backgroundColor: "red" }}
                handleChangeText={(value) =>
                    setForm({ ...form, phone: value })
                }
            />
            <CustomButton title="Register my account" containerStyles={{ marginTop: 25 }} handlePress={signUpWithPhone} />
        </View>
    );
};

const styles = StyleSheet.create({
    onboardingTitle: {
        color: "white",
        fontSize: 28,
        fontFamily: "Montserrat-SemiBold",
        marginBottom: 30,
    },
    formContainer: {
        marginBottom: 30,
    },
});

export default PhoneAuth;
