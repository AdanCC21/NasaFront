import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function InputForm() {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      // Aquí se manejará el envío del mensaje
      console.log('Mensaje enviado:', message);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <View className='flex-row items-center gap-4 mx-2 mt-2'>
      <Ionicons name="information-circle-outline" size={24} color="black" />
      <Text className='text-gray-500 text-xs self-start'>Especifica detalles como lugar, hora y dia</Text>

      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
        <TextInput
          style={[styles.input, { width: '100%' }]}
          placeholder="Escribe un mensaje..."
          placeholderTextColor="#9CA3AF"
          value={message}
          onChangeText={setMessage}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#D1D5DB',
    gap: 12,
    bottom: 0,
    position: 'absolute',
    width:'100%',
    zIndex: 1000,
  },
  input: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1F2937',
    height: 48,
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
