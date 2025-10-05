import CloudsBackground from '@/componentes/CloudsBackground'; // Asegúrate de que esta ruta sea correcta
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Asegúrate de que la ruta a tu imagen sea correcta
import Ramon from '@/assets/images/Ramon.png'

// --- Tipos ---
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

  const [message, setMessageText] = useState('');

  // Aqui integramos un hook o algo parecido para agregar el mensaje de Chat GPT
  const handleMessages = (message: string) => {
    const newItem: MessageItemType = { id: messageList.length + 1, author: 'User', content: message }
    const botMessage: MessageItemType = { id: messageList.length + 2, author: 'Ramon', content: "Oh, i'm so sorry 😿, for now i can't help you with that, please try again later." }

    let list = [...messageList];
    list.push(newItem);
    list.push(botMessage);
    setMessage(list)
  }

  const handleSend = () => {
    if (message.trim()) {
      handleMessages(message);
      setMessageText('');
    }
  };

  return (
    <LinearGradient
      colors={['#5074C9', '#94A8D8']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}>
      <CloudsBackground />

      {/* HEADER */}
      <View className='flex flex-row items-center px-4 py-3' style={{ paddingTop: safeAreaInsets.top }}>
        <TouchableOpacity
          onPress={() => router.push('/home')}
          className='mr-3'
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text className=' text-white text-2xl font-bold absolute left-1/2 bottom-1/2 -translate-x-[20%]'>Chat</Text>
      </View>

      <FlatList
        className='mx-[5vw]'
        data={messageList}
        keyExtractor={item => String(item.id)}
        renderItem={({ item, index }) => <MessageItem item={item} index={index} />}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainerWrapper}
      >
        <View style={styles.inputContent}>
          <View className='flex-row items-center gap-x-2 mx-2 mt-2'>
            <Ionicons name="information-circle-outline" size={14} color="black" />
            <Text className='text-gray-500 text-xs'>Specify details such as location, time and day.</Text>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Escribe un mensaje..."
              placeholderTextColor="#9CA3AF"
              value={message}
              onChangeText={setMessageText}
              multiline={false}
              maxLength={500}
            />
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: message.trim() ? '#2563EB' : '#9CA3AF' }
              ]}
              onPress={handleSend}
              disabled={!message.trim()}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>➤</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: safeAreaInsets.bottom, backgroundColor: '#fff' }} />
      </KeyboardAvoidingView>
    </LinearGradient>
  )
}

const MessageItem = ({ item, index }: any) => (
  <View className={`flex flex-wrap w-full ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} py-4`}>
    <View className={`flex flex-row w-full ${item.author !== 'User' ? 'items-start' : 'items-end flex-row-reverse'}`}>
      {item.author !== 'User' ? (
        <Image
          source={Ramon}
          style={{ width: 50, height: 70 }}
          resizeMode='contain'
        />) : (
        <View style={{ width: 30, height: 30, borderRadius: 5000, backgroundColor: '#0AF', alignItems: 'center', justifyContent: 'center' }}>
          <Text className='text-white text-lg'>U</Text>
        </View>
      )}
      <View className={`flex-1 ${item.author !== 'User' ? 'ml-2 items-start' : 'mr-2 items-end justify-end'}`}>
        <View className='bg-white px-3 py-2 rounded-lg max-w-[80%]'>
          <Text className='text-lg'>{item.content}</Text>
        </View>
      </View>
    </View>
  </View>
)

const styles = StyleSheet.create({
  inputContainerWrapper: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#D1D5DB',
  },
  inputContent: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingTop: 5,
    gap: 12,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1F2937',
    height: 48,
    marginRight: 8, // Margen para separar del botón
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default PlanScreen