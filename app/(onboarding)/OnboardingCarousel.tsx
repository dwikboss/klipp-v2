import React, { useRef, useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
} from "react-native";
import Swiper from "react-native-swiper";
import { useSession } from "../../contexts/SessionContext";
import { useRouter } from "expo-router";
import { supabase } from "../../utils/supabase";
import { useOnboarding } from "../../contexts/OnboardingContext";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import ImageUpload from "../../components/ImageUpload";

const OnboardingCarousel = () => {
    const router = useRouter();
    const swiperRef = useRef<Swiper>(null);
    const session = useSession();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [kpopGroups, setKpopGroups] = useState<any[]>([]);
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
    const { data: onboardingData, setData: setOnboardingData } =
        useOnboarding() || {};

    useEffect(() => {
        const fetchKpopGroups = async () => {
            const { data, error } = await supabase
                .from("kpop_groups")
                .select("*");
            if (error) {
                console.error("Error fetching K-pop groups:", error);
            } else {
                setKpopGroups(data);
            }
        };

        fetchKpopGroups();
    }, []);

    const handleNext = () => {
        if (currentIndex < 3) {
            swiperRef.current?.scrollBy(1);
            setCurrentIndex(currentIndex + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            let avatarUrl = null;
            const file = onboardingData.avatarFile;
            if (file) {
                const { data: storageData, error } = await supabase.storage
                    .from("avatars")
                    .upload(file.name, file as unknown as File);

                if (error) {
                    throw new Error("Avatar upload failed");
                }

                avatarUrl = supabase.storage
                    .from("avatars")
                    .getPublicUrl(file.name).data.publicUrl;
            }

            const { error } = await supabase
                .from("profiles")
                .update({
                    username: onboardingData.username,
                    avatar_url: avatarUrl,
                    // favorite_kpop_groups: selectedGroups,
                    updated_at: new Date(),
                })
                .eq("id", session?.user.id);

            if (error) {
                throw new Error("Profile update failed");
            }

            router.push("/(tabs)/home");
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    const toggleGroupSelection = (group: string) => {
        setSelectedGroups((prevSelected) => {
            if (prevSelected.includes(group)) {
                return prevSelected.filter((g) => g !== group);
            } else if (prevSelected.length < 3) {
                return [...prevSelected, group];
            }
            return prevSelected;
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Klipp</Text>
            <Swiper
                ref={swiperRef}
                loop={false}
                showsPagination={true}
                onIndexChanged={(index) => setCurrentIndex(index)}
                dotColor="#545454"
                activeDotColor="white"
            >
                <View style={styles.slide}>
                    <Text style={styles.onboardingMainBodyText}>
                        Pick a username
                    </Text>
                    <FormField
                        title="Username"
                        value={onboardingData.username}
                        placeholder="Your name"
                        handleChangeText={(e: string) =>
                            setOnboardingData({ username: e })
                        }
                        keyboardType="default"
                        customTextStyle={styles.customTextStyle}
                    />
                    <Text style={styles.onboardingSubtitle}>
                        Don't worry. You can change it later.
                    </Text>
                </View>

                <View style={styles.slide}>
                    <Text style={styles.onboardingMainBodyText}>
                        Upload a profile picture
                    </Text>
                    <ImageUpload
                        containerStyle={{
                            width: 150,
                            height: 150,
                            borderRadius: 999,
                        }}
                        imageStyle={{ borderRadius: 999 }}
                    />
                </View>

                <View style={styles.slide}>
                    <Text style={styles.onboardingMainBodyText}>
                        Select up to 3 fandoms you're a part of!
                    </Text>
                    <View style={styles.wrapContainer}>
                        {kpopGroups.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.groupItem,
                                    selectedGroups.includes(item.name) &&
                                        styles.selectedGroupItem,
                                ]}
                                onPress={() => toggleGroupSelection(item.name)}
                            >
                                <Text style={styles.groupText}>
                                    {item.fandom_name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.slide}>
                    <Text style={styles.onboardingMainBodyText}>
                        Welcome to Klipp!
                    </Text>
                </View>
            </Swiper>

            <View style={styles.buttonContainer}>
                <CustomButton
                    title={currentIndex < 3 ? "Next" : "Continue"}
                    containerStyles={styles.button}
                    handlePress={handleNext}
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
    slide: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 25,
    },
    title: {
        fontSize: 24,
        color: "white",
        textAlign: "center",
        marginTop: 25,
        fontFamily: "MontserratAlternates-Bold",
    },
    onboardingMainBodyText: {
        color: "white",
        fontSize: 24,
        fontFamily: "Montserrat-SemiBold",
        textAlign: "center",
        marginBottom: 20,
    },
    onboardingSubtitle: {
        color: "#545454",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 20,
        fontFamily: "Montserrat-Regular",
    },
    customTextStyle: {
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    button: {
        width: "80%",
    },
    groupText: {
        color: "white",
        fontSize: 18,
    },
    centerContent: {
        justifyContent: "center",
        backgroundColor: "red",
        flex: 1,
    },
    wrapContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 10,
    },
    groupItem: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        margin: 6,
        backgroundColor: "#333",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "white",
    },
    selectedGroupItem: {
        backgroundColor: "#555",
        borderColor: "#888",
    },
});

export default OnboardingCarousel;
