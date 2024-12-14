import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../utils/supabase";
import React from "react";
import CustomButton from "../../components/CustomButton";

const handleSubmit = async () => {
    signOut();
};

async function signOut() {
  const { error } = await supabase.auth.signOut();
}

const profile = () => {
    return (
        <SafeAreaView style={styles.containerStyle}>
            <CustomButton
                title="Continue"
                containerStyles={{ width: "100%" }}
                handlePress={handleSubmit}
            />
        </SafeAreaView>
    );
};

export default profile;

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: "black",
        flex: 1,
        paddingBottom: 25,
        alignItems: "center",
        gap: 35,
    },
});
