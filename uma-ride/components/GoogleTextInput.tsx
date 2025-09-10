import { View, Text } from "react-native";
import { GoogleInputProps } from "@/types/type";

const GoogleTextInput = ({ containerStyle }: GoogleInputProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle}`}
    >
      <Text>Search</Text>
    </View>
  );
};

export default GoogleTextInput;
