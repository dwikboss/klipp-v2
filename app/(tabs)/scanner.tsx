import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Modal } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { supabase } from "../../utils/supabase";
import CardDisplay from "../../components/CardDisplay";

const scanner = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [scannedCard, setScannedCard] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleBarcodeScanned = async ({ data }: { data: string }) => {
        if (data && !loading) {
            setLoading(true);
            try {
                const { data: cardData, error: cardError } = await supabase
                    .from("cards")
                    .select(
                        `
                    *,
                    favorite_group_1_id:kpop_groups!cards_favorite_group_id_fkey(fandom_name, associated_color),
                    favorite_group_2_id:kpop_groups!cards_favorite_group_2_id_fkey(fandom_name, associated_color),
                    favorite_group_3_id:kpop_groups!cards_favorite_group_3_id_fkey(fandom_name, associated_color),
                    favorite_idol_id:kpop_idols(name),
                    profile_id
                `
                    )
                    .eq("id", data);

                if (cardError) {
                    console.error("Error fetching card data:", cardError);
                } else if (cardData && cardData.length > 0) {
                    const profileId = cardData[0].profile_id;
                    const { data: profileData, error: profileError } =
                        await supabase
                            .from("profiles")
                            .select("username, avatar_url")
                            .eq("id", profileId);

                    if (profileError) {
                        console.error(
                            "Error fetching profile data:",
                            profileError
                        );
                    } else if (profileData && profileData.length > 0) {
                        const { username, avatar_url } = profileData[0];
                        setScannedCard({ ...cardData[0], username, avatar_url });
                        setModalVisible(true);
                    }
                }
            } catch (error) {
                console.error("Unexpected error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    if (!permission) {
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <Text style={styles.message}>Loading...</Text>
            ) : (
                <CameraView
                    style={styles.camera}
                    facing="back"
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr"],
                    }}
                    onBarcodeScanned={handleBarcodeScanned}
                />
            )}
            {scannedCard && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>
                                You've collected a card!
                            </Text>
                            {scannedCard ? (
                                <CardDisplay cardData={scannedCard} style={styles.cardFullWidth} />
                            ) : (
                                <Text>No card data available</Text>
                            )}
                            <Button
                                title="Close"
                                onPress={() => setModalVisible(false)}
                            />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
    },
    message: {
        textAlign: "center",
        paddingBottom: 10,
        color: "white",
    },
    camera: {
        width: "100%",
        height: "95%",
        borderRadius: 20,
        overflow: "hidden",
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
    },
    modalView: {
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 25,
        textAlign: "center",
        fontSize: 18,
        color: "white",
        fontFamily: "Montserrat-Bold",
    },
    cardInfo: {
        marginBottom: 10,
    },
    cardFullWidth: {
        width: "100%",
        alignItems: "center",
    },
});

export default scanner;
