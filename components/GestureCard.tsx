import React, { useRef, useState } from "react";
import {
    Animated,
    PanResponder,
    StyleSheet,
    View,
    Text,
    Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

export default function DraggableFlipCard() {
    const rotateAnim = useRef(new Animated.Value(0)).current; // Track rotation
    const [flipped, setFlipped] = useState(false);

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) =>
                Math.abs(gestureState.dx) > 10, // Start gesture if dragging horizontally
            onPanResponderMove: (_, gestureState) => {
                const dragPercentage = gestureState.dx / width; // Normalize drag
                const newRotation = dragPercentage * 180; // Convert drag to rotation
                rotateAnim.setValue(flipped ? 180 + newRotation : newRotation);
            },
            onPanResponderRelease: (_, gestureState) => {
                const dragPercentage = gestureState.dx / width; // Drag distance as percentage
                const dragThreshold = 0.3; // Flip threshold at 30% of screen width

                if (Math.abs(dragPercentage) > dragThreshold) {
                    // Complete the flip
                    Animated.spring(rotateAnim, {
                        toValue: flipped ? 0 : 180,
                        useNativeDriver: true,
                    }).start(() => setFlipped(!flipped));
                } else {
                    // Snap back to original position
                    Animated.spring(rotateAnim, {
                        toValue: flipped ? 180 : 0,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    // Interpolating scale for 3D effect
    const frontScale = rotateAnim.interpolate({
        inputRange: [0, 90, 180],
        outputRange: [1, 0.85, 1], // Shrink and grow for 3D effect
    });

    const backScale = rotateAnim.interpolate({
        inputRange: [0, 90, 180],
        outputRange: [0.85, 1, 0.85], // Opposite scaling for the back
    });

    // Interpolating rotation for the front and back faces
    const interpolatedFrontRotation = rotateAnim.interpolate({
        inputRange: [0, 180],
        outputRange: ["0deg", "180deg"],
    });

    const interpolatedBackRotation = rotateAnim.interpolate({
        inputRange: [0, 180],
        outputRange: ["180deg", "360deg"],
    });

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer} {...panResponder.panHandlers}>
                {/* Front Face */}
                <Animated.View
                    style={[
                        styles.card,
                        styles.front,
                        {
                            transform: [
                                { rotateY: interpolatedFrontRotation },
                                { perspective: 1000 },
                                { scale: frontScale }, // Apply scaling for 3D effect
                            ],
                        },
                    ]}
                >
                    <Text style={styles.text}>Front</Text>
                </Animated.View>

                {/* Back Face */}
                <Animated.View
                    style={[
                        styles.card,
                        styles.back,
                        {
                            transform: [
                                { rotateY: interpolatedBackRotation },
                                { perspective: 1000 },
                                { scale: backScale }, // Apply scaling for 3D effect
                            ],
                        },
                    ]}
                >
                    <Text style={styles.text}>Back</Text>
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#222",
    },
    cardContainer: {
        width: width * 0.8,
        height: 300,
        position: "relative",
    },
    card: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden", // Ensures the hidden side isn't shown
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
    },
    front: {
        backgroundColor: "#4CAF50",
    },
    back: {
        backgroundColor: "#FF5722",
        transform: [{ rotateY: "180deg" }], // Back starts rotated
    },
    text: {
        fontSize: 24,
        color: "#fff",
        fontWeight: "bold",
    },
});
