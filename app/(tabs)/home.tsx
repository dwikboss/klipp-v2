import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ImageBackground,
} from "react-native";
import { useSession } from "../../contexts/SessionContext";
import { useUser } from "../../contexts/UserContext";
import { supabase } from "../../utils/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import GestureFlipView from "react-native-gesture-flip-card";
import Skeleton from "react-native-reanimated-skeleton";
import { useFocusEffect } from '@react-navigation/native';
import CardSkeleton from "../../components/CardSkeleton";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

export default function HomeScreen() {
    const { profile, loading, fetchUserProfile } = useUser();
    const [cardData, setCardData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCardData = async (retry = 0) => {
        try {
            const { data, error } = await supabase
                .from('cards')
                .select(`
                    *,
                    favorite_group_1_id:kpop_groups!cards_favorite_group_id_fkey(fandom_name, associated_color),
                    favorite_group_2_id:kpop_groups!cards_favorite_group_2_id_fkey(fandom_name, associated_color),
                    favorite_group_3_id:kpop_groups!cards_favorite_group_3_id_fkey(fandom_name, associated_color),
                    favorite_idol_id:kpop_idols(name)
                `)
                .eq('profile_id', profile?.id ?? '');

            if (error) {
                console.error('Error fetching card data:', error);
            } else if (data.length === 0 && retry < 3) {
                console.log('Retrying fetch card data...');
                setTimeout(() => fetchCardData(retry + 1), 1000);
            } else {
                setCardData(data as any);
                console.log('Fetched card data:', data);
            }
        } catch (error) {
            console.error('Unexpected error fetching card data:', error);
        } finally {
            setIsLoading(false)
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            if (!profile) {
                console.log('Fetching profile data...');
                fetchUserProfile();
            } else {
                console.log('Profile available, fetching card data...');
                fetchCardData();
            }
        }, [profile])
    );

    const renderFront = () => {
        const cardFrontUrl = cardData[0]?.cardfront_url;

        return (
            <ImageBackground
                source={{ uri: cardFrontUrl }}
                style={styles.frontStyle}
            >
                <View style={styles.overlay} />
                <View style={styles.frontTop}>
                </View>

                <View style={styles.frontBottom}>
                    <Text style={styles.carduserName}>{profile?.username ?? ""}</Text>
                    <Text style={styles.cardBio}>✨Dressin up like dynamite✨</Text>
                    <View style={styles.tagHolder}>
                        {Array.isArray(cardData) && cardData.map((card: any, index: number) => {
                            const color1 = `#${card.favorite_group_1_id?.associated_color}`;
                            const color2 = `#${card.favorite_group_2_id?.associated_color}`;
                            const color3 = `#${card.favorite_group_3_id?.associated_color}`;

                            const textColor1 = color1.toLowerCase() === '#ffffff' ? 'black' : 'white';
                            const textColor2 = color2.toLowerCase() === '#ffffff' ? 'black' : 'white';
                            const textColor3 = color3.toLowerCase() === '#ffffff' ? 'black' : 'white';

                            return (
                                <React.Fragment key={index}>
                                    <Text style={[styles.tag, { backgroundColor: color1, color: textColor1 }]}>
                                        {card.favorite_group_1_id?.fandom_name}
                                    </Text>
                                    <Text style={[styles.tag, { backgroundColor: color2, color: textColor2 }]}>
                                        {card.favorite_group_2_id?.fandom_name}
                                    </Text>
                                    <Text style={[styles.tag, { backgroundColor: color3, color: textColor3 }]}>
                                        {card.favorite_group_3_id?.fandom_name}
                                    </Text>
                                </React.Fragment>
                            );
                        })}
                    </View>
                </View>
            </ImageBackground>
        );
    };

    const renderBack = () => {
        return (
            <View style={styles.frontStyle}>
                <View style={styles.frontTop}>
                    <Text style={styles.carduserName}>Top Section</Text>
                </View>

                <View style={styles.frontBottom}>
                    <Text style={styles.carduserName}>{profile?.username ?? "Unknown User"}</Text>
                    <Text style={styles.cardBio}>✨Dressin up like dynamite✨</Text>
                    <View style={styles.tagHolder}>
                        <Text style={styles.tag}>FEARNOT</Text>
                        <Text style={styles.tag}>DIVE</Text>
                        <Text style={styles.tag}>ARMY</Text>
                    </View>
                </View>
            </View>
        );
    };

    console.log(width, height);

    return (
        <SafeAreaView style={styles.containerStyle}>
            <Text style={styles.title}>Klipp</Text>
            {isLoading ? (
                <CardSkeleton />
            ) : (
                <GestureFlipView
                    width={width}
                    height={height * 0.68}
                    renderFront={renderFront}
                    renderBack={renderBack}
                />
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
    frontStyle: {
        flex: 1,
        width: width * 0.92,
        backgroundColor: "#383838",
        borderRadius: 25,
        overflow: "hidden",
    },
    backStyle: {
        flex: 1,
        width: width * 0.92,
        backgroundColor: "#383838",
        borderRadius: 25,
        overflow: "hidden",
    },
    frontTop: {
        flex: 6,
        justifyContent: "center",
        alignItems: "center",
    },
    frontBottom: {
        flex: 2,
        padding: 25,
        gap: 15
    },
    title: {
        fontSize: 28,
        color: "white",
        textAlign: "center",
        marginTop: 15,
        fontFamily: "MontserratAlternates-Bold",
    },
    carduserName: {
        fontSize: 36,
        color: "white",
        fontFamily: "MontserratAlternates-Bold",
    },
    cardBio: {
        fontSize: 14,
        color: "white",
        fontFamily: "Montserrat-Regular",
    },
    tagHolder: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10
    },
    tag: {
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
});
