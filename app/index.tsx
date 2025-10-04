import { Image, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-900">
      <Text className="font-bold text-3xl text-white">Hackamoles 2</Text>
      <Image source={require("../assets/images/image5.png")} />
      <Text className="font-bold text-3xl text-white">Van al espacio</Text>
    </View>
  );
}
