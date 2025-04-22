import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Animated,
} from "react-native";
import { useState, useRef, useEffect } from "react";

import { InputFieldProps } from "@/types/type";
import tw from "@/lib/tw";

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, focusAnim]);

  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E5E5E5", "#0286FF"],
  });

  const shadowOpacity = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.05, 0.15],
  });

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={tw`my-3 w-full`}>
          <Text
            style={tw`text-base font-JakartaSemiBold mb-2 text-gray-700 ${labelStyle}`}
          >
            {label}
          </Text>
          <Animated.View
            style={[
              tw`flex flex-row justify-start items-center relative bg-white rounded-xl ${containerStyle}`,
              {
                borderWidth: 1,
                borderColor,
                elevation: 2,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity,
                shadowRadius: 4,
              },
            ]}
          >
            {icon && (
              <Image source={icon} style={tw`w-5 h-5 ml-4 ${iconStyle}`} />
            )}
            <TextInput
              style={tw`rounded-xl py-3.5 px-4 font-JakartaMedium text-[15px] flex-1 ${inputStyle} text-left`}
              secureTextEntry={secureTextEntry}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholderTextColor="#9CA3AF"
              selectionColor="#0286FF"
              {...props}
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
