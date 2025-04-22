import { useUser, useClerk } from "@clerk/clerk-expo";
import { useState } from "react";
import { router } from "expo-router";
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import InputField from "@/components/InputField";

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isLoading, setIsLoading] = useState(false);

  // Function to view profile information
  const handleViewProfile = () => {
    Alert.alert(
      "Profile Information",
      `First Name: ${user?.firstName || "Not provided"}\nLast Name: ${user?.lastName || "Not provided"}\nEmail: ${user?.primaryEmailAddress?.emailAddress || "Not provided"}\nPhone: ${user?.primaryPhoneNumber?.phoneNumber || "Not provided"}`
    );
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
      router.replace("/(auth)/sign-in");
    } catch (error) {
      console.error("Error signing out:", error);
      Alert.alert("Error", "Failed to sign out. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text className="text-2xl font-JakartaBold my-5">My profile</Text>

        <View className="flex items-center justify-center my-5">
          <Image
            source={{
              uri: user?.imageUrl,
            }}
            style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
            className="rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
          />
        </View>

        <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
          <View className="flex flex-col items-start justify-start w-full">
            <InputField
              label="First name"
              placeholder={user?.firstName || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Last name"
              placeholder={user?.lastName || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Email (cannot be changed)"
              placeholder={
                user?.primaryEmailAddress?.emailAddress || "Not Found"
              }
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Phone (for display only)"
              placeholder={user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />
            
            <Text className="text-xs text-gray-500 mt-1 mb-5 ml-1">
              Note: Phone number changes require verification and will not be
              saved in this version.
            </Text>

            <TouchableOpacity
              className="bg-[#0286FF] w-full py-4 rounded-xl items-center justify-center shadow-sm"
              onPress={handleViewProfile}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text className="text-white font-JakartaBold text-base">
                  View Profile Info
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="border border-[#0286FF] w-full py-4 rounded-xl mt-3 items-center justify-center shadow-sm"
              onPress={handleSignOut}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#0286FF" size="small" />
              ) : (
                <Text className="text-[#0286FF] font-JakartaBold text-base">
                  Sign Out
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
