import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignedIn, useUser } from "@clerk/clerk-expo";
import { mockRides } from "@/constants/mockRides";
import RideCard from "@/components/RideCard";

const Home = () => {
  const { user } = useUser();

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-general-500">
      <FlatList
        data={mockRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
      />
    </SafeAreaView>
  );
};

export default Home;
