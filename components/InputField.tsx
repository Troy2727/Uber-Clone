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
              tw`flex flex-row justify-start items-center relative bg-white rounded-xl shadow-soft ${containerStyle}`,
              { borderWidth: 1, borderColor },
            ]}
          >
            {icon && (
              <Image source={icon} style={tw`w-5 h-5 ml-4 ${iconStyle}`} />
            )}
            <TextInput
              style={tw`rounded-xl py-3 px-4 font-JakartaMedium text-[15px] flex-1 ${inputStyle} text-left`}
              secureTextEntry={secureTextEntry}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholderTextColor="#9CA3AF"
              {...props}
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
