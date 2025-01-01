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
        const username = cardData?.username;
        const avatar = cardData?.avatar;

        return (
            <View style={styles.imageContainer}>
                <ImageBackground
                    source={{ uri: cardFrontUrl }}
                    style={styles.frontStyle}
                >
                    <View style={styles.overlay} />
                    <View style={styles.frontTop}>
                        {avatar && (
                            <Image
                                source={{ uri: avatar }}
                                style={styles.avatar}
                            />
                        )}
                    </View>

                    <View style={styles.frontBottom}>
                        <Text style={styles.carduserName}>
                            {username ?? ""}
                        </Text>
                        <Text style={styles.cardBio}>
                            ✨Dressin up like dynamite✨
                        </Text>
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
                    </View>
                </ImageBackground>
            </View>
        );
    };

    return <View style={styles.frontStyle}>{renderFront()}</View>;
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
    frontTop: {
        flex: 6,
        justifyContent: "center",
        alignItems: "center",
    },
    frontBottom: {
        flex: 2,
        gap: 15,
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
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
});

export default CardDisplay;
