import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Text, TouchableOpacity, View, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SwiperFlatList from "react-native-swiper-flatlist";

const { width } = Dimensions.get("window");

const Onboarding = () => {
  const swiperRef = useRef<SwiperFlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      router.replace("/(auth)/sign-up");
    } else {
      swiperRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>

      <SwiperFlatList
        ref={swiperRef}
        data={onboarding}
        renderItem={({ item }) => (
          <View
            key={item.id}
            style={{ width }}
            className="flex items-center justify-center px-5 mb-16"
          >
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center w-full mt-10">
              <Text className="text-black text-3xl font-bold mx-10 text-center">
                {item.title}
              </Text>
            </View>
            <Text className="text-md font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
              {item.description}
            </Text>
          </View>
        )}
        showPagination
        paginationDefaultColor="#E2F0E9"
        paginationActiveColor="#02FF5B"
        paginationStyleItem={{
          width: 32,
          height: 4,
          marginHorizontal: 4,
          borderRadius: 999,
        }}
        onChangeIndex={({ index }) => setActiveIndex(index)}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        autoplay={false}
      />

      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={handleNext}
        className="w-2/3 mx-auto"
      />
    </SafeAreaView>
  );
};

export default Onboarding;
