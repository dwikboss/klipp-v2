import React from "react";
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Dimensions,
    Image,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import GestureFlipView from "react-native-gesture-flip-card";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");

interface CardDisplayProps {
    cardData: {
        cardfront_url?: string;
        username?: string;
        avatar?: string;
        [key: string]: any;
    };
}

const CardDisplay: React.FC<CardDisplayProps> = ({ cardData }) => {
    const renderFront = () => {
        const cardFrontUrl = cardData?.cardfront_url;
        const username = cardData?.profiles.username;
        const bio = cardData?.bio;

        return (
            <View style={styles.imageContainer}>
                <ImageBackground
                    source={{ uri: cardFrontUrl }}
                    style={styles.frontStyle}
                >
                    <View style={styles.overlay} />
                    <View style={styles.frontTop}>
                    </View>

                    <View style={styles.frontBottom}>
                        <Text style={styles.carduserName}>
                            {username ?? ""}
                        </Text>
                        <View>
                            <Text style={styles.cardBio}>
                                {bio ?? ""}
                            </Text>
                        </View>
                        <View style={styles.tagHolder}>
                            {[
                                "favorite_group_1_id",
                                "favorite_group_2_id",
                                "favorite_group_3_id",
                            ].map((groupKey, index) => {
                                const group = cardData[groupKey];
                                const color = `#${group?.associated_color}`;
                                const textColor =
                                    color.toLowerCase() === "#ffffff"
                                        ? "black"
                                        : "white";

                                return (
                                    <Text
                                        key={index}
                                        style={[
                                            styles.tag,
                                            {
                                                backgroundColor: color,
                                                color: textColor,
                                            },
                                        ]}
                                    >
                                        {group?.fandom_name}
                                    </Text>
                                );
                            })}
                        </View>
                        <View style={styles.favoriteIdolContainer}>
                            <View style={styles.favoriteIdolBox}>
                                <FontAwesome size={15} name="heart" color="red" />
                                <Text style={styles.favoriteIdolText}>
                                    {cardData?.favorite_idol_id?.name}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    };

    const renderBack = () => {
        const cardId = cardData?.id;
        const avatar = cardData?.avatar;
        const username = cardData?.profiles?.username;
        const topColor = cardData?.favorite_group_1_id?.associated_color 
            ? `#${cardData.favorite_group_1_id.associated_color}`
            : '#FF1493';
        
        return (
            <View style={styles.backStyle}>
                <View style={[styles.backTop, { backgroundColor: topColor }]} />
                <View style={styles.backBottom} />
                <View style={styles.avatarContainer}>
                    {avatar && (
                        <Image
                            source={{ uri: avatar }}
                            style={styles.avatar}
                        />
                    )}
                    <Text style={styles.backUsername}>
                        {username ?? ""}
                    </Text>
                </View>
                {cardId && (
                    <View style={styles.qrContainer}>
                        <View style={styles.qrBackground}>
                            <QRCode
                                value={cardId.toString()}
                                size={100}
                                backgroundColor="white"
                                color="black"
                            />
                        </View>
                    </View>
                )}
            </View>
        );
    };

    return (
        <GestureFlipView
            width={width}
            height={height * 0.68}
            renderFront={renderFront}
            renderBack={renderBack}
        />
    );
    
};

const styles = StyleSheet.create({
    imageContainer: {
        width: width * 0.9,
    },
    frontStyle: {
        paddingBottom: 25,
        paddingHorizontal: 25,
        borderRadius: 25,
        overflow: "hidden",
        height: height * 0.66,
    },
    backStyle: {
        height: height * 0.66,
        width: width * 0.9,
        borderRadius: 25,
        overflow: "hidden",
    },
    backTop: {
        height: '25%',
        width: '100%',
        position: 'absolute',
        top: 0,
    },
    backBottom: {
        backgroundColor: '#121212',
        height: '75%',
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    backText: {
        color: 'white',
    },
    frontTop: {
        flex: 6,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    frontBottom: {
        flex: 4,
        gap: 15,
        justifyContent: "flex-end",
    },
    carduserName: {
        fontSize: 42,
        color: "white",
        fontFamily: "MontserratAlternates-Bold",
        marginBottom: 0
    },
    cardBio: {
        fontSize: 14,
        color: "white",
        fontFamily: "Montserrat-Medium",
    },
    tagHolder: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
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
        backgroundColor: "rgba(0, 0, 0, 0.25)",
    },
    avatarContainer: {
        position: 'absolute',
        top: '15%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    backUsername: {
        color: 'white',
        marginTop: 25,
        fontSize: 40,
        fontFamily: "MontserratAlternates-Bold",
    },
    qrContainer: {
        position: 'absolute',
        bottom: '20%',
        alignSelf: 'center',
    },
    qrBackground: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 12,
    },
    qrPill: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginTop: 12,
        alignSelf: 'stretch',
    },
    qrPillText: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular',
    },
    favoriteIdolText: {
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        marginLeft: 5,
        fontSize: 15,
    },
    favoriteIdolContainer: {
        alignItems: 'flex-start',
    },
    favoriteIdolBox: {
        backgroundColor: '#121212',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
});

export default CardDisplay;
