import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../utils/supabase";
import React, { useState, useEffect } from "react";
import CustomButton from "../../components/CustomButton";
import { useUser } from "../../contexts/UserContext";
import CardDisplay from "../../components/CardDisplay";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

const Profile = () => {
    const { profile } = useUser();
    const [collectedCards, setCollectedCards] = useState([]);
    const [stats, setStats] = useState({
        totalCards: 0
    });
    const [loading, setLoading] = useState(true);

    const fetchUserStats = async () => {
        if (!profile?.id) return;
        setLoading(true);

        const { data: cards, error } = await supabase
            .from('collected_cards')
            .select(`
                card:card_id(
                    *,
                    favorite_group_1_id:kpop_groups!cards_favorite_group_id_fkey(fandom_name, associated_color),
                    favorite_group_2_id:kpop_groups!cards_favorite_group_2_id_fkey(fandom_name, associated_color),
                    favorite_group_3_id:kpop_groups!cards_favorite_group_3_id_fkey(fandom_name, associated_color),
                    favorite_idol_id:kpop_idols(name),
                    profiles:profile_id(username, avatar_url)
                )
            `)
            .eq('user_id', profile.id);

        if (error) {
            console.error('Error fetching cards:', error);
            return;
        }

        const processedCards = cards.map(item => ({
            ...item.card,
            avatar: item.card.profiles.avatar_url
        }));

        setCollectedCards(processedCards as any[]);

        setStats({
            totalCards: processedCards.length
        });
        setLoading(false);
    };

    useEffect(() => {
        fetchUserStats();
    }, [profile]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.header}>
                    <TouchableOpacity 
                        style={styles.signOutButton} 
                        onPress={handleSignOut}
                    >
                        <FontAwesome name="sign-out" size={24} color="white" />
                    </TouchableOpacity>
                    <Image 
                        source={{ uri: profile?.avatar_url }} 
                        style={styles.avatar}
                    />
                    <Text style={styles.username}>{profile?.username}</Text>
                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{stats.totalCards}</Text>
                            <Text style={styles.statLabel}>Collected Cards</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>My Collection</Text>
                <View style={styles.cardGrid}>
                    {collectedCards.map((card, index) => (
                        <View key={index} style={styles.simpleCard}>
                            {card.cardfront_url ? (
                                <Image
                                    source={{ uri: card.cardfront_url }}
                                    style={styles.cardImage}
                                />
                            ) : (
                                <View style={[styles.cardImage, styles.cardImagePlaceholder]} />
                            )}
                            
                            {card.profiles.username ? (
                                <View style={styles.cardName}>
                                    <Text style={styles.cardNameText}>
                                        {card.profiles.username}
                                    </Text>
                                </View>
                            ) : (
                                <View style={[styles.cardName, styles.cardNamePlaceholder]} />
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    scrollView: {
        flex: 1,
    },
    header: {
        alignItems: "center",
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#222',
        position: 'relative',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
    },
    username: {
        fontSize: 24,
        color: "white",
        fontFamily: "MontserratAlternates-Bold",
        marginBottom: 15,
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "80%",
        marginBottom: 20,
    },
    statItem: {
        alignItems: "center",
    },
    statNumber: {
        fontSize: 20,
        color: "white",
        fontFamily: "Montserrat-Bold",
    },
    statLabel: {
        fontSize: 14,
        color: "#888",
        fontFamily: "Montserrat-Medium",
    },
    signOutButton: {
        padding: 10,
        position: 'absolute',
        right: 20,
        top: 20,
    },
    sectionTitle: {
        fontSize: 20,
        color: "white",
        fontFamily: "Montserrat-Bold",
        padding: 15,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 0,
    },
    cardGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: 10,
    },
    simpleCard: {
        width: width / 3 - 15,
        marginBottom: 15,
        position: 'relative',
    },
    cardImage: {
        width: '100%',
        height: ((width / 3 - 15) * 4) / 3,
        borderRadius: 10,
    },
    cardImagePlaceholder: {
        backgroundColor: '#333',
    },
    cardName: {
        position: 'absolute',
        bottom: 5,
        left: 5,
        padding: 10,
        borderRadius: 5,
    },
    cardNameText: {
        color: 'white',
        fontSize: 16,
        fontFamily: "Montserrat-Bold",
    },
    cardNamePlaceholder: {
        width: 80,
        height: 20,
        backgroundColor: '#444',
        borderRadius: 5,
    },
    profileRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
});

export default Profile;
