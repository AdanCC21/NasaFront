import CloudsBackground from "@/componentes/CloudsBackground";
import MenuButton from "@/componentes/MenuButton";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={["#5074C9", "#94A8D8"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <CloudsBackground />

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text className="text-white text-4xl text-center font-bold">
            Will it rain on my parade?
          </Text>
          <Text className="text-white text-xl text-center">Hackamoles 2</Text>
        </View>

        <View
          style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
          className="w-auto items-center h-auto p-8 px-4 rounded-xl mt-4"
        >
          <MenuButton
            title="Map"
            description="Explore locations visually."
            icon="location-sharp"
            color="#5074C9"
            onPress={() => router.push("/map")}
            className="mt-2"
          />
          <MenuButton
            title="Chat with Ramon"
            description="Talk to Ramon about the weather."
            icon="chatbubble-ellipses-sharp"
            color="#0DE200"
            onPress={() => router.push("/chat")}
            className="overflow-hidden mt-2"
          />
          <MenuButton
            title="History"
            description="Check your recent searches."
            icon="time-outline"
            color="#1E90FF"
            onPress={() => router.push("/historial")}
            className="mt-2"
          />
        </View>
      </View>
    </LinearGradient>
  );
}