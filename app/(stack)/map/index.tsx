import VariablePill from '@/componentes/variablePill';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

const MapScreen = () => {
  return (
    <View className='flex-1 items-center justify-center bg-blue-900'>
      <Text>MapScreen</Text>
      <VariablePill 
        icon={<Ionicons name="rainy-sharp" size={24} color="  " />} 
        texto="Nublado con lluvia" color="#1E90FF" />
    </View>
  )
}

export default MapScreen