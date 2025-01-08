import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useSession } from "../../contexts/SessionContext";
import { useUser } from "../../contexts/UserContext";
import { supabase } from "../../utils/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import GestureFlipView from "react-native-gesture-flip-card";
import { useFocusEffect } from "@react-navigation/native";
import CardSkeleton from "../../components/CardSkeleton";
import QRCode from "react-native-qrcode-svg";
import CardDisplay from "../../components/CardDisplay";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

export default function HomeScreen() {
    const { profile, loading, fetchUserProfile } = useUser();
    const [cardData, setCardData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCardData = async (retry = 0) => {
        try {
            const { data, error } = await supabase
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
                .eq("profile_id", profile?.id ?? "");
                console.log("ALL ", data);
            if (error) {
                console.error("Error fetching card data:", error);
            } else if (data.length === 0 && retry < 3) {
                console.log("Retrying fetch card data...");
                setTimeout(() => fetchCardData(retry + 1), 1000);
            } else {
                if (data) {
                    const cardsWithAvatar = data.map(card => ({
                        ...card,
                        avatar: card.profiles.avatar_url
                    }));
                    setCardData(cardsWithAvatar);
                }
                console.log("Fetched card data:", data);
            }
        } catch (error) {
            console.error("Unexpected error fetching card data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            if (!profile) {
                console.log("Fetching profile data...");
                fetchUserProfile();
            } else {
                console.log("Profile available, fetching card data...");
                fetchCardData();
            }
        }, [profile])
    );

    return (
        <SafeAreaView style={styles.containerStyle}>
            <Text style={styles.title}>Klipp</Text>
            {isLoading ? (
                <CardSkeleton />
            ) : (
                <CardDisplay cardData={cardData[0]} />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: "black",
        flex: 1,
        paddingBottom: 25,
        paddingHorizontal: 25,
        alignItems: "center",
        gap: 25,
    },
    title: {
        fontSize: 28,
        color: "white",
        textAlign: "center",
        marginTop: 15,
        fontFamily: "MontserratAlternates-Bold",
    },
});
