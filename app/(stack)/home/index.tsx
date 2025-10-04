import CustomButton from "@/componentes/CustomButton";
import { router } from 'expo-router';
import { View } from "react-native";

export default function HomeScreen() {
  
  return (
    <View className="flex-1 items-center justify-center bg-blue-900">
            <CustomButton
                color='blue-500'
                onPress={() => router.push('/map')}
                className='mb-2'
            >
                Ir al mapa
            </CustomButton>
    </View>
  );
}
