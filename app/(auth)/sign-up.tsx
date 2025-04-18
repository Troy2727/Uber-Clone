import { useSignUp, useOAuth } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState, useRef, useEffect } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { ReactNativeModal } from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

import tw from "@/lib/tw";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { googleOAuth } from "@/lib/auth";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Fade in and slide up animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setPasswordError("");

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.log(JSON.stringify(err, null, 2));

      // Check for password breach error
      if (
        err.errors &&
        err.errors[0] &&
        err.errors[0].code === "form_password_pwned"
      ) {
        setPasswordError(err.errors[0].longMessage);
      } else {
        Alert.alert("Error", err.errors[0].longMessage);
      }
    } finally {
      setLoading(false);
    }
  };
  const onPressVerify = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
      if (completeSignUp.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed. Please try again.",
          state: "failed",
        });
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <Animated.View
        style={[
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            flex: 1,
            backgroundColor: "white",
          },
        ]}
      >
        <View style={tw`relative w-full h-[180px]`}>
          <Image
            source={images.signUpCar}
            style={tw`z-0 w-full h-[180px]`}
            resizeMode="cover"
          />
          <View style={tw`absolute top-12 left-5 flex-row items-center`}>
            <TouchableOpacity
              onPress={() => router.replace("/(auth)/welcome")}
              style={[
                tw`bg-white/90 p-2 rounded-full`,
                {
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 3,
                },
              ]}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw`px-6 py-4`}>
          <Text style={tw`text-2xl font-JakartaBold mb-6 text-black`}>
            Create Your Account
          </Text>

          <Text style={tw`text-base font-JakartaMedium mb-1 text-gray-700`}>
            Name
          </Text>
          <InputField
            label=""
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
            containerStyle="mb-4"
            labelStyle="hidden"
          />

          <Text style={tw`text-base font-JakartaMedium mb-1 text-gray-700`}>
            Email
          </Text>
          <InputField
            label=""
            placeholder="Enter your email"
            icon={icons.email}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
            containerStyle="mb-4"
            keyboardType="email-address"
            autoCapitalize="none"
            labelStyle="hidden"
          />

          <Text style={tw`text-base font-JakartaMedium mb-1 text-gray-700`}>
            Password
          </Text>
          <InputField
            label=""
            placeholder="Enter your password"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value) => {
              setForm({ ...form, password: value });
              setPasswordError("");
            }}
            containerStyle={passwordError ? "mb-1" : "mb-4"}
            autoCapitalize="none"
            labelStyle="hidden"
          />
          {passwordError ? (
            <Text style={tw`text-red-500 text-xs mb-3 px-1`}>
              {passwordError}
            </Text>
          ) : null}

          <View style={tw`items-center mt-6`}>
            <TouchableOpacity
              onPress={onSignUpPress}
              disabled={loading}
              style={tw`bg-[#0D8BFF] w-[80%] py-3 rounded-full flex items-center justify-center`}
            >
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={tw`text-white font-JakartaBold text-lg`}>
                  Sign Up
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <Text style={tw`text-center my-4 text-gray-500 font-JakartaMedium`}>
            Or
          </Text>

          <View style={tw`items-center`}>
            <TouchableOpacity
              style={tw`flex-row items-center justify-center py-3 bg-white border border-gray-200 rounded-full mb-6 w-[80%]`}
              onPress={() => {
                googleOAuth(startOAuthFlow);
              }}
            >
              <Image
                source={icons.google}
                resizeMode="contain"
                style={tw`w-5 h-5 mr-2`}
              />
              <Text style={tw`text-base font-JakartaMedium text-gray-800`}>
                Log In with Google
              </Text>
            </TouchableOpacity>
          </View>

          <View style={tw`mt-4 mb-6 flex-row justify-center`}>
            <Text style={tw`text-sm text-gray-500 font-JakartaRegular`}>
              Already have an account?{" "}
            </Text>
            <Link href="/sign-in">
              <Text style={tw`text-sm text-[#0D8BFF] font-JakartaBold`}>
                Log In
              </Text>
            </Link>
          </View>
        </View>
      </Animated.View>

      <ReactNativeModal
        isVisible={verification.state === "pending"}
        // onBackdropPress={() =>
        //   setVerification({ ...verification, state: "default" })
        // }
        onModalHide={() => {
          if (verification.state === "success") {
            setShowSuccessModal(true);
          }
        }}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropTransitionOutTiming={0}
        backdropOpacity={0.5}
        style={tw`m-4`}
      >
        <View
          style={[
            tw`bg-white px-7 py-9 rounded-3xl`,
            {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 5,
            },
          ]}
        >
          <View style={tw`items-center mb-6`}>
            <View style={tw`bg-primary-50 p-5 rounded-full mb-5`}>
              <Ionicons name="mail" size={36} color="#0286FF" />
            </View>
            <Text
              style={tw`font-JakartaBold text-2xl mb-3 text-center text-gray-800`}
            >
              Email Verification
            </Text>
            <Text
              style={tw`font-JakartaRegular text-gray-600 text-center mb-5 leading-5 px-2`}
            >
              We've sent a verification code to {form.email}. Please check your
              inbox and enter the code below.
            </Text>
          </View>
          <View style={tw`mb-4`}>
            <Text style={tw`text-base font-JakartaMedium mb-1 text-gray-700`}>
              Verification Code
            </Text>
            <View
              style={tw`flex-row items-center border border-gray-200 rounded-xl px-4 py-3`}
            >
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#9CA3AF"
                style={tw`mr-2`}
              />
              <TextInput
                placeholder="Enter 6-digit code"
                value={verification.code}
                onChangeText={(code) =>
                  setVerification({ ...verification, code })
                }
                keyboardType="number-pad"
                style={tw`flex-1 font-JakartaMedium text-[15px]`}
                maxLength={6}
              />
            </View>
          </View>
          {verification.error && (
            <Text style={tw`text-red-500 text-sm mt-1 mb-3`}>
              {verification.error}
            </Text>
          )}
          <View style={tw`items-center mt-6`}>
            <TouchableOpacity
              onPress={onPressVerify}
              disabled={loading}
              style={tw`bg-green-500 w-[80%] py-3 rounded-full flex items-center justify-center`}
            >
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={tw`text-white font-JakartaBold text-lg`}>
                  Verify Email
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={tw`mt-4 mb-2`}>
            <Text style={tw`text-center text-primary-500 font-JakartaMedium`}>
              Resend Code
            </Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>

      <ReactNativeModal
        isVisible={showSuccessModal}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropTransitionOutTiming={0}
        backdropOpacity={0.5}
        style={tw`m-4`}
      >
        <View
          style={[
            tw`bg-white px-7 py-9 rounded-3xl`,
            {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 5,
            },
          ]}
        >
          <View style={tw`items-center`}>
            <View style={tw`bg-success-50 p-6 rounded-full mb-6`}>
              <Ionicons name="checkmark" size={52} color="#38A169" />
            </View>
            <Text
              style={tw`text-3xl font-JakartaBold text-center text-gray-800 mb-3`}
            >
              Account Verified!
            </Text>
            <Text
              style={tw`text-base text-gray-600 font-JakartaRegular text-center mt-1 mb-8 px-2 leading-5`}
            >
              Congratulations! Your account has been successfully verified.
              You're all set to start using Ryde.
            </Text>
          </View>
          <View style={tw`items-center mt-4`}>
            <TouchableOpacity
              onPress={() => router.push(`/(root)/(tabs)/home`)}
              style={tw`bg-green-500 w-[80%] py-3 rounded-full flex items-center justify-center`}
            >
              <Text style={tw`text-white font-JakartaBold text-lg`}>
                Continue to Home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>
    </ScrollView>
  );
};
export default SignUp;
