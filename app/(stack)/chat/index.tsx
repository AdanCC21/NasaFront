import InputForm from '@/componentes/chat/inputForm';
import CloudsBackground from '@/componentes/CloudsBackground';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ramon from '@/assets/images/Ramon.png'

type MessageItemType = {
  id: number,
  author: string,
  content: string
}


const PlanScreen = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const router = useRouter();

  const [messageList, setMessage] = useState<Array<MessageItemType>>(
    [{ id: 1, author: 'Ramon', content: "Hi, welcome ✌️, please tell me your plans and how can i help you 😺." }]
  )

  const MessageItem = ({ item, index }: any) => (
    <View className={`flex flex-wrap w-full ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} py-2`}>
      <View className={`flex flex-row w-full ${index % 2 === 0 ? '' : 'items-end flex-row-reverse'}`}>
        {item.author !== 'User' ? (
          <Image
            source={Ramon}
            style={{ width: 50, height: 50 }}
            resizeMode='contain'
          />) : (
          <View style={{ width: 30, height: 30, borderRadius: 5000, backgroundColor: '#0AF', alignItems: 'center', justifyContent: 'center' }}>
            <Text className='text-white'>U</Text>
          </View>
        )}
        <View className='flex-1 mx-2 items-end justify-end'>
          <View className='bg-white px-3 py-1 rounded-lg '>
            <Text>{item.content}</Text>
          </View>
        </View>
      </View>
    </View>
  )

  return (
    <LinearGradient
      colors={['#5074C9', '#94A8D8']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}>
      <CloudsBackground />
      {/* HEADER */}
      <View className='flex-row items-center px-4 py-3' style={{ paddingTop: safeAreaInsets.top }}>
        <TouchableOpacity
          onPress={() => router.push('/home')}
          className='mr-3'
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text className='text-white text-2xl font-bold'>Chat</Text>
      </View>

      <FlatList
        className='mx-[5vw]'
        data={messageList}
        keyExtractor={item => String(item.id)}
        renderItem={({ item, index }) => <MessageItem item={item} index={index} />}
      />

      <InputForm callback={(message) => {
        const newItem: MessageItemType = { id: messageList.length + 1, author: 'User', content: message }
        const botMessage: MessageItemType = { id: messageList.length + 2, author: 'Ramon', content: "Oh, i'm so sorry 😿, for now i can't help you with that, please try again later." }
        
        let list = [...messageList];
        list.push(newItem);
        list.push(botMessage);
        setMessage(list)
      }} />
    </LinearGradient>
  )
}

export default PlanScreen