import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Image, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import tw from "@/lib/tw";

import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { googleOAuth } from "@/lib/auth";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await googleOAuth(startOAuthFlow);

      if (result.code === "session_exists") {
        Alert.alert("Success", "Session exists. Redirecting to home screen.");
        router.replace("/(root)/(tabs)/home");
        return;
      }

      if (result.success) {
        // Success but no session exists yet
        Alert.alert("Success", result.message);
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tw`w-full`}>
      <View style={tw`flex-row justify-center gap-4`}>
        <TouchableOpacity
          style={tw`flex-1 flex-row items-center justify-center p-3 bg-white border border-gray-200 rounded-xl shadow-soft`}
          onPress={handleGoogleSignIn}
          disabled={loading}
        >
          <Image
            source={icons.google}
            resizeMode="contain"
            style={tw`w-5 h-5 mr-2`}
          />
          <Text style={tw`text-base font-JakartaMedium text-gray-800`}>
            Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex-1 flex-row items-center justify-center p-3 bg-[#3b5998] rounded-xl shadow-soft`}
        >
          <Ionicons
            name="logo-facebook"
            size={20}
            color="white"
            style={tw`mr-2`}
          />
          <Text style={tw`text-base font-JakartaMedium text-white`}>
            Facebook
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={tw`flex-row items-center justify-center p-3 bg-black rounded-xl shadow-soft mt-4`}
      >
        <Ionicons name="logo-apple" size={20} color="white" style={tw`mr-2`} />
        <Text style={tw`text-base font-JakartaMedium text-white`}>
          Sign in with Apple
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OAuth;
