import { TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";
import { GestureResponderEvent } from "react-native";

interface CustomButtonProps {
  title: string;
  handlePress: (event: GestureResponderEvent) => void;
  containerStyles?: object;
  textStyles?: object;
  isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={[styles.buttonStyle, containerStyles]}
      disabled={isLoading}
    >
      <Text style={[styles.textStyle, textStyles]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 999,
  },
  textStyle: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
    color: "black",
  },
});

export default CustomButton;
