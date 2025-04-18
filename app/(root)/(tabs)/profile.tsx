import { useUser, useAuth } from "@clerk/clerk-expo";
import { useState, useRef } from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

import tw from "@/lib/tw";
import CustomButton from "@/components/CustomButton";

import InputField from "@/components/InputField";

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  // Animation values
  const scrollY = useRef(new Animated.Value(0)).current;

  // Calculate header opacity based on scroll position
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  // Calculate profile image scale based on scroll position
  const imageScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.8],
    extrapolate: "clamp",
  });

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      router.replace("/(auth)/sign-in");
    } catch (error) {
      Alert.alert("Error", "Failed to sign out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const userInitial = user?.firstName?.charAt(0) || "U";
  const profileImage = user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl;

  return (
    <SafeAreaView style={styles.container}>
      {/* Animated Header */}
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <Text style={styles.headerTitle}>Profile</Text>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Profile Header Section */}
        <View style={styles.profileHeader}>
          <Text style={styles.profileTitle}>My profile</Text>

          <Animated.View
            style={[
              styles.profileImageContainer,
              { transform: [{ scale: imageScale }] },
            ]}
          >
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.initialContainer}>
                <Text style={styles.initialText}>{userInitial}</Text>
              </View>
            )}
          </Animated.View>

          <Text style={styles.userName}>{user?.fullName || "User"}</Text>
          <Text style={styles.userEmail}>
            {user?.primaryEmailAddress?.emailAddress || "No email"}
          </Text>
        </View>

        {/* Profile Info Cards */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.card}>
            <ProfileInfoItem
              icon="person-outline"
              label="First name"
              value={user?.firstName || "Not Found"}
            />

            <View style={styles.divider} />

            <ProfileInfoItem
              icon="people-outline"
              label="Last name"
              value={user?.lastName || "Not Found"}
            />

            <View style={styles.divider} />

            <ProfileInfoItem
              icon="mail-outline"
              label="Email"
              value={user?.primaryEmailAddress?.emailAddress || "Not Found"}
            />

            <View style={styles.divider} />

            <ProfileInfoItem
              icon="call-outline"
              label="Phone"
              value={user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
            />
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Account Settings</Text>

          <View style={styles.card}>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingIconContainer}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={22}
                  color="#0286FF"
                />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>Privacy Settings</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingIconContainer}>
                <Ionicons
                  name="notifications-outline"
                  size={22}
                  color="#0286FF"
                />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>Notifications</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingIconContainer}>
                <Ionicons
                  name="help-circle-outline"
                  size={22}
                  color="#0286FF"
                />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>Help & Support</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Out Button */}
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Sign Out"
            onPress={handleSignOut}
            loading={loading}
            bgVariant="outline"
            textVariant="primary"
          />
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

// Profile Info Item Component
const ProfileInfoItem = ({ icon, label, value }) => (
  <View style={styles.infoItem}>
    <View style={styles.infoIconContainer}>
      <Ionicons name={icon} size={22} color="#0286FF" />
    </View>
    <View style={styles.infoContent}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "white",
    zIndex: 1000,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "JakartaBold",
    color: "#000",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 30,
  },
  profileTitle: {
    fontSize: 24,
    fontFamily: "JakartaBold",
    color: "#000",
    marginBottom: 20,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "white",
  },
  initialContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#0286FF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "white",
  },
  initialText: {
    fontSize: 48,
    fontFamily: "JakartaBold",
    color: "white",
  },
  userName: {
    fontSize: 22,
    fontFamily: "JakartaBold",
    color: "#000",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    fontFamily: "JakartaRegular",
    color: "#6B7280",
  },
  infoSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "JakartaBold",
    color: "#374151",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(2, 134, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: "JakartaMedium",
    color: "#6B7280",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: "JakartaSemiBold",
    color: "#111827",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 8,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(2, 134, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: "JakartaSemiBold",
    color: "#111827",
  },
  buttonContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  versionContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  versionText: {
    fontSize: 14,
    fontFamily: "JakartaRegular",
    color: "#9CA3AF",
  },
});

export default Profile;
