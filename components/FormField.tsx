import { View, Text, TextInput } from "react-native";
import { React, useState } from "react";

const FormField = ({
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    ...props
}) => {
    const [showPassword, setshowPassword] = useState(false)

    return (
        <View className={`w-full space-y-2 ${otherStyles}`}>
            <View className="w-full h-16 px-4 border-b border-zinc-500 focus:border-white items-center">
                <TextInput
                    className="w-full text-center flex-1 text-white font-pregular text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#71717a"
                    onChangeText={handleChangeText}
                    secureTextEntry = {title === 'Password' && !showPassword}
                />
            </View>
        </View>
    );
};

export default FormField;
