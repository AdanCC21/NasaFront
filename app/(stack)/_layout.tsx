import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { router, Stack, useNavigation } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const StackLayout = () => {

    const navigation = useNavigation();

    const onHeaderLeftClick = (canGoBack: boolean | undefined) => {
        if (canGoBack) {
            router.back();
            return;
        }
        navigation.dispatch(DrawerActions.toggleDrawer);
    }


    return (
        <Stack
            screenOptions={{
                headerShadowVisible: true,
                contentStyle: {
                    flex: 1,

                },
                headerLeft: ({ canGoBack }) => (<Ionicons
                    name={canGoBack ? "chevron-back" : "menu"} size={32} className='mr-5' color={"#fff"}
                    onPress={() => onHeaderLeftClick(canGoBack)}
                />
                )
            }}
        >
            <Stack.Screen name="home/index"
                options={{
                    headerShown: false
                }} />
            <Stack.Screen name="plan/index"
                options={{
                    title: "Plan",
                }} />

            <Stack.Screen name="map/index"
                options={{
                    title: "Mapa",
                    headerTransparent: true,
                    headerTitleStyle: {
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 28,
                    },
                    headerShadowVisible: false
                }} />
            <Stack.Screen name="map/dateHour/index"
                options={{
                    title: "Fecha y hora",
                    headerTransparent: true,
                    headerStyle: {

                    },
                    headerTitleStyle: {
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 28,
                    },
                    headerShadowVisible: false
                }} />
            <Stack.Screen name="chat/index"
                options={{
                    headerTitle: "Chat",
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 28,
                    },
                }} />
            <Stack.Screen
                name='historial/index'
                options={{
                    headerTitle: "History",
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 28,
                    },
                }}
            />
        </Stack>
    )
}

export default StackLayout