import { Link, router } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useState } from "react";
import OAuth from "@/components/OAuth";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[220px]">
          <Image source={images.signUpHorse} className="z-0 w-full h-[220px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5 bg-green-100 px-3 py-3 rounded-2xl">
            Create Your Account
          </Text>
        </View>
        <View className="px-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter password"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButton title="Sign Up" className="mt-4" />

          <OAuth />

          <Link
            href="/sign-in"
            className="text-lg text-center text-general-200 mt-5"
          >
            Already have an account?{" "}
            <Text className="text-primary-500">Log in</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
