import { Link, router } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useState } from "react";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;
    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });
      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      // Set 'verification' to pending to display second form and capture OTP code
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onPressVerify = async () => {
    if (!isLoaded) return;
    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
      // If verification was completed, set the session to active and redirect the user
      if (signUpAttempt.status === "complete") {
        // Create a database User

        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });
        router.replace("/");
      } else {
        setVerification({
          ...verification,
          error: "Verification failed",
          state: "failed",
        });
        // If the status is not complete, check why
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
      console.error(JSON.stringify(err, null, 2));
    }
  };

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

          <CustomButton
            title="Sign Up"
            className="mt-4"
            onPress={onSignUpPress}
          />

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
