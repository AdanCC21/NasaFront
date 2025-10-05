import CloudsBackground from '@/componentes/CloudsBackground'
import { Ionicons } from '@expo/vector-icons'
import { useHeaderHeight } from '@react-navigation/elements'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type HistoryItemType = {
    id: number,
    title: string,
    content: string
}

export default function index() {
    const DataTest: Array<HistoryItemType> = [
        { id: 1, title: 'El sauzal', content: 'Buscado recientemente' },
        { id: 2, title: 'Ensenada B.C.', content: 'Buscado el 8 de octubre' },
        { id: 3, title: 'Guadalajara Jalisco', content: 'Buscado el 1 de octubre de 2023' },
    ]
    const safeAreaInsets = useSafeAreaInsets();
    const headerHeight = useHeaderHeight();

    return (
        <LinearGradient
            colors={['#5074C9', '#94A8D8']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}>
            <CloudsBackground />

            <FlatList
                data={DataTest}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <HistoryItem current={item} />}
                style={{ paddingTop: headerHeight }}
                className='mx-[10vw]'
            />
        </LinearGradient>
    )
}

const HistoryItem = ({ current }: any) => (
    <View className='flex flex-row px-5 py-2 bg-[#00000055] items-center rounded-xl my-5'>
        <Ionicons name="time-outline" size={24} color="white" />
        <View className='ml-5' style={{flex:1}}>
            <Text className='text-xl font-bold text-white'>{current.title}</Text>
            <Text className='text-base text-white'>{current.content}</Text>
        </View>
    </View>
)

