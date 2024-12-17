import React, { useRef, useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    TextInput,
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
    const [kpopIdols, setKpopIdols] = useState<any[]>([]);
    const [selectedIdol, setSelectedIdol] = useState<string | null>(null);
    const { data: onboardingData, setData: setOnboardingData } =
        useOnboarding() || {};
    const [idolSearchQuery, setIdolSearchQuery] = useState("");

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

    useEffect(() => {
        const fetchKpopIdols = async () => {
            const { data, error } = await supabase
                .from("kpop_idols")
                .select("*, kpop_groups(name)")
                .order("name", { ascending: true });

            if (error) {
                console.error("Error fetching K-pop idols:", error);
            } else {
                setKpopIdols(data);
            }
        };

        fetchKpopIdols();
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
                    favorite_kpop_groups: selectedGroups,
                    favorite_idol: selectedIdol,
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
            let updatedGroups;
            if (prevSelected.includes(group)) {
                updatedGroups = prevSelected.filter((g) => g !== group);
            } else if (prevSelected.length < 3) {
                updatedGroups = [...prevSelected, group];
            } else {
                updatedGroups = prevSelected;
            }
            setOnboardingData({ selectedGroups: updatedGroups });
            console.log(updatedGroups);
            return updatedGroups;
        });
    };

    const filteredIdols = idolSearchQuery
        ? kpopIdols.filter((idol) =>
              idol.name.toLowerCase().includes(idolSearchQuery.toLowerCase())
          )
        : kpopIdols.slice(0, 3);

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
                                    selectedGroups.includes(item.id) 
                                        ? { backgroundColor: `#${item.associated_color}` }
                                        : {  }
                                ]}
                                onPress={() => toggleGroupSelection(item.id)}
                            >
                                <Text style={{ 
                                    color: selectedGroups.includes(item.id) ? (item.associated_color.toLowerCase() === 'ffffff' ? 'black' : 'white') : 'white',
                                    fontSize: 20
                                }}>
                                    {item.fandom_name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.slide}>
                    <Text style={styles.onboardingMainBodyText}>
                        Select your favorite idol
                    </Text>
                    <View style={styles.inputWrapper}>
                        {selectedIdol ? (
                            <TouchableOpacity style={styles.pill} onPress={() => setSelectedIdol(null)}>
                                <Text style={styles.pillText}>{selectedIdol}</Text>
                                <Text style={styles.removeText}>✕</Text>
                            </TouchableOpacity>
                        ) : (
                            <TextInput
                                style={[styles.searchInput, { fontSize: 36, fontFamily: "Montserrat-Bold" }]}
                                placeholder="..."
                                placeholderTextColor="#1f1f1f"
                                value={idolSearchQuery}
                                onChangeText={setIdolSearchQuery}
                                keyboardType="default"
                                editable={true}
                            />
                        )}
                    </View>
                    <View style={styles.wrapContainer}>
                        {filteredIdols.map((idol) => (
                            <TouchableOpacity
                                key={idol.id}
                                style={[
                                    styles.groupItem,
                                    selectedIdol === idol.name && styles.selectedGroupItem,
                                ]}
                                onPress={() => setSelectedIdol(selectedIdol === idol.name ? null : idol.name)}
                            >
                                <Text style={styles.groupText}>{idol.name}</Text>
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
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 25,
        paddingTop: 50
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
        fontSize: 36,
        fontFamily: "Montserrat-SemiBold",
        textAlign: "center",
        marginBottom: 50,
    },
    onboardingSubtitle: {
        color: "#545454",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 20,
        fontFamily: "Montserrat-Regular",
    },
    customTextStyle: {
        fontSize: 36,
        color: "white",
        fontFamily: "Montserrat-Bold",
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
        paddingHorizontal: 20,
        paddingVertical: 8,
        margin: 5,
        backgroundColor: "#333",
        borderRadius: 20,
        borderColor: "white",
    },
    selectedGroupItem: {
        backgroundColor: "#555",
        fontSize: 18,
    },
    idolList: {
        marginBottom: 50,
    },
    dropdownContainer: {
        maxHeight: 150,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
    },
    dropdownList: {
        width: '100%',
    },
    dropdownItem: {
        padding: 10,
        backgroundColor: '#333',
    },
    selectedDropdownItem: {
        backgroundColor: '#555',
    },
    searchInput: {
        borderColor: 'gray',
        paddingHorizontal: 10,
        paddingVertical: 15,
        color: 'white',
        width: '100%',
        textAlign: 'center',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    pill: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 999,
        paddingHorizontal: 25,
        paddingVertical: 15,
        gap: 10,
    },
    pillText: {
        color: 'black',
        fontSize: 24,
        fontFamily: "Montserrat-Bold",
        marginRight: 5,
    },
    removeText: {
        color: 'black',
        fontSize: 16,
        fontFamily: "Montserrat-Bold",
    },
});

export default OnboardingCarousel;
