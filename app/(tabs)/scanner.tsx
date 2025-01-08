import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, SafeAreaView } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { supabase } from "../../utils/supabase";
import CardDisplay from "../../components/CardDisplay";
import CustomButton from "../../components/CustomButton";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay, withTiming, withRepeat } from "react-native-reanimated";

const scanner = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [scannedCard, setScannedCard] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [isScannerActive, setIsScannerActive] = useState(true);

    const windowHeight = Dimensions.get('window').height;
    const translateY = useSharedValue(windowHeight);
    const shadowOpacity = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    const animatedCardStyle = useAnimatedStyle(() => {
        return {
            shadowOpacity: shadowOpacity.value,
        };
    });

    useEffect(() => {
        if (scannedCard) {
            translateY.value = withSpring(0, { damping: 100, stiffness: 150 });
        }
    }, [scannedCard]);

    useEffect(() => {
        shadowOpacity.value = withRepeat(
            withTiming(0.5, { duration: 800 }),
            -1,
            true
        );
    }, []);

    const handleBarcodeScanned = async ({ data }: { data: string }) => {
        if (data && !loading) {
            setLoading(true);
            setIsScannerActive(false);
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
                    profiles:profile_id(username, avatar_url)
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
                    }
                }
            } catch (error) {
                console.error("Unexpected error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleAddToCollection = () => {
        setScannedCard(null);
        setIsScannerActive(true);
        translateY.value = windowHeight;
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
                <CustomButton handlePress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {loading && (
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" color="#ffffff" />
                    <Text style={styles.loadingText}>
                        Hold on! We're retrieving the card...
                    </Text>
                </View>
            )}
            {!loading && isScannerActive && (
                <CameraView
                    style={styles.camera}
                    facing="back"
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr"],
                    }}
                    onBarcodeScanned={handleBarcodeScanned}
                />
            )}
            {isScannerActive && (
                <View style={styles.pillContainer}>
                    <Text style={styles.pillText}>Scan a Klipp QR code</Text>
                </View>
            )}
            {scannedCard && (
                <SafeAreaView style={styles.safeArea}>
                    <Animated.View style={[styles.cardContainer, animatedStyle]}>
                        <Text style={styles.modalText}>
                            You've collected a card!
                        </Text>
                        <View style={styles.cardWrapper}>
                            <Animated.View style={[styles.cardWrapper, animatedCardStyle]}>
                                <CardDisplay cardData={scannedCard} />
                            </Animated.View>
                        </View>
                        <CustomButton title="Add to collection" handlePress={handleAddToCollection} />
                    </Animated.View>
                </SafeAreaView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
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
    pillContainer: {
        position: "absolute",
        bottom: 20,
        backgroundColor: "black",
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: "center",
        marginBottom: 50,
    },
    pillText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        justifyContent: "center",
        alignItems: "center",
    },
    safeArea: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    cardContainer: {
        width: "80%",
        alignItems: "center",
        padding: 20,
    },
    cardWrapper: {
        transform: [{ scale: 0.95 }],
        shadowColor: '#ffffff',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 50,
        elevation: 10,
    },
    modalText: {
        textAlign: "center",
        fontSize: 18,
        color: "white",
        fontFamily: "Montserrat-Bold",
    },
    loadingText: {
        marginTop: 10,
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
});

export default scanner;
