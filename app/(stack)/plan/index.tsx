import InputForm from '@/componentes/chat/inputForm';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PlanScreen = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View className='flex-1 bg-blue-950' style={{ paddingTop: safeAreaInsets.top }}>
      <View className='flex-row items-center px-4 py-3'>
        <TouchableOpacity 
          onPress={() => router.push('/home')}
          className='mr-3'
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text className='text-white text-2xl font-bold'>Chat</Text>
      </View>

      <InputForm />
    </View>
  )
}

export default PlanScreen