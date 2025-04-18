import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Animated,
  View,
} from "react-native";
import { useRef } from "react";

import tw from "@/lib/tw";
import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[1px]";
    default:
      return "bg-primary-500";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  loading = false,
  ...props
}: ButtonProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], width: "100%" }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={props.disabled || loading}
        style={[
          tw`w-full rounded-2xl p-4 flex flex-row justify-center items-center shadow-soft ${getBgVariantStyle(bgVariant)} ${props.disabled ? "opacity-60" : "opacity-100"}`,
          className && tw`${className}`,
        ]}
        {...props}
      >
        {loading ? (
          <ActivityIndicator
            color={textVariant === "default" ? "white" : "#0286FF"}
            size="small"
          />
        ) : (
          <>
            {IconLeft && (
              <View style={tw`mr-2`}>
                <IconLeft />
              </View>
            )}
            <Text
              style={tw`text-lg font-JakartaBold ${getTextVariantStyle(textVariant)}`}
            >
              {title}
            </Text>
            {IconRight && (
              <View style={tw`ml-2`}>
                <IconRight />
              </View>
            )}
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CustomButton;
