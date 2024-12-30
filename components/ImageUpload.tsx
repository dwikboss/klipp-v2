import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useOnboarding } from "../contexts/OnboardingContext";

interface ImageUploadProps {
    aspect?: [number, number];
    containerStyle?: object;
    imageStyle?: object;
    imageType: 'avatar' | 'cardFront';
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    aspect = [1, 1],
    containerStyle,
    imageStyle,
    imageType,
}) => {
    const { data, setData } = useOnboarding();

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect,
            quality: 1,
        });

        if (!result.canceled) {
            const file = {
                uri: result.assets[0].uri,
                name: `img-${Math.random()}.jpg`,
                type: "image/jpeg",
            };
            if (imageType === 'avatar') {
                setData({ avatarFile: file });
            } else if (imageType === 'cardFront') {
                setData({ cardFrontFile: file });
            }
        }
    };

    const imageUri = imageType === 'avatar' ? data.avatarFile?.uri : data.cardFrontFile?.uri;

    return (
        <View style={[styles.container, containerStyle]}>
            {imageUri ? (
                <Image
                    source={{ uri: imageUri }}
                    style={[styles.image, imageStyle]}
                />
            ) : (
                <TouchableOpacity onPress={pickImage} style={styles.placeholder}>
                    <Text style={styles.placeholderText}>+</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    placeholder: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    placeholderText: {
        color: "#7d7d7d",
        fontSize: 48
    },
});

export default ImageUpload;