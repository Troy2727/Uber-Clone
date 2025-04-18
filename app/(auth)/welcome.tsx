import { router } from "expo-router";
import { useRef, useState, useEffect } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import tw from "@/lib/tw";

import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";

const Home = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
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

  const isLastSlide = activeIndex === onboarding.length - 1;
  const { width } = Dimensions.get("window");

  return (
    <SafeAreaView style={tw`flex h-full items-center justify-between bg-white`}>
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        style={tw`w-full flex justify-end items-end p-5`}
      >
        <Text style={tw`text-black text-base font-JakartaBold`}>Skip</Text>
      </TouchableOpacity>

      <Animated.View
        style={[
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            width: "100%",
            flex: 1,
          },
        ]}
      >
        <Swiper
          ref={swiperRef}
          loop={false}
          dot={
            <View style={tw`w-[8px] h-[8px] mx-1 bg-[#E2E8F0] rounded-full`} />
          }
          activeDot={
            <View
              style={tw`w-[24px] h-[8px] mx-1 bg-primary-500 rounded-full`}
            />
          }
          onIndexChanged={(index) => setActiveIndex(index)}
          paginationStyle={tw`bottom-10`}
        >
          {onboarding.map((item) => (
            <View
              key={item.id}
              style={tw`flex items-center justify-center px-6 pt-5`}
            >
              <View
                style={tw`bg-primary-50 rounded-3xl p-6 mb-8 w-full items-center justify-center`}
              >
                <Image
                  source={item.image}
                  style={[{ width: width * 0.7, height: width * 0.7 }]}
                  resizeMode="contain"
                />
              </View>
              <View
                style={tw`flex flex-row items-center justify-center w-full`}
              >
                <Text
                  style={tw`text-black text-3xl font-JakartaBold text-center`}
                >
                  {item.title}
                </Text>
              </View>
              <Text
                style={tw`text-base font-JakartaMedium text-center text-gray-500 mx-4 mt-4 leading-6`}
              >
                {item.description}
              </Text>
            </View>
          ))}
        </Swiper>
      </Animated.View>

      <Animated.View style={{ opacity: fadeAnim, width: "100%" }}>
        <CustomButton
          title={isLastSlide ? "Get Started" : "Next"}
          onPress={() =>
            isLastSlide
              ? router.replace("/(auth)/sign-up")
              : swiperRef.current?.scrollBy(1)
          }
          style={tw`w-11/12 mx-auto mb-8`}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export default Home;
