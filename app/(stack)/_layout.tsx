import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { router, Stack, useNavigation } from 'expo-router';
import React from 'react';

const StackLayout = () => {

    const navigation = useNavigation();

    const onHeaderLeftClick = (canGoBack:boolean|undefined)=>{

        if(canGoBack){
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
            backgroundColor: '#fff'
        },
        headerLeft: ({tintColor,canGoBack}) => (<Ionicons 
        name={canGoBack ? "arrow-back-outline":"menu-outline"} size={26} className='mr-5' 
            onPress={() => onHeaderLeftClick(canGoBack)}
        />
        )
    }}
    >
        <Stack.Screen name="home/index"
        options={{
            title: "Chat",
        }} />
        <Stack.Screen name="plan/index"
        options={{
            title: "Plan",
        }} />

        <Stack.Screen name="map/index"
        options={{
            title: "Mapa",
            headerStyle:{
                
            }
        }} />
    </Stack>
  )
}

export default StackLayout