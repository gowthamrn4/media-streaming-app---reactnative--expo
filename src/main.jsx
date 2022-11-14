import { View, Text, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Login, Signup } from './pages/auth';
import { Home, Chat, Settings, RoomSetup } from './pages/dashboard'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

function MainScreen() {

    const [ token, setToken ] = useState(null);

    useEffect(()=>{
        AsyncStorage.getItem("token").then((res)=>{
            setToken(res)
        })
    },[AsyncStorage])

  return (
    <>
        <StatusBar backgroundColor={"#143E60"}/>
        <NavigationContainer>
               <Stack.Navigator screenOptions={{   headerShown: false} }>
                    <Stack.Screen name="login" component={Login} />
                    <Stack.Screen name="signup" component={Signup} />
                    <Stack.Screen name="room" component={RoomSetup} />
                    <Stack.Screen name="home" component={Home} />
                </Stack.Navigator> 
        </NavigationContainer>
    </>

  )
}

export default MainScreen