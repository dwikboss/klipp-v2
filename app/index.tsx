import { Text, View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";

const Index = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topSection}>
                <Text style={styles.title}>Collect your friends</Text>
            </View>

            <View style={styles.bottomSection}>
                <CustomButton
                    title="Start collecting"
                    handlePress={() => router.push("/auth/sign-in")}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    topSection: {
        flex: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red"
    },
    bottomSection: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        color: "white",
        textAlign: "center",
        marginBottom: 20,
    },
});

export default Index;