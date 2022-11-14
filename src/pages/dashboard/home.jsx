import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from './settings';
import ChatPage from './chat';
import Media from './media';
import { RoomContext } from "../../context";
import { socketIO } from '../../utlis/socket';

const Tab = createBottomTabNavigator();

export default function Home() {

  const [ state, dispatch  ] = useContext(RoomContext);

  useEffect(()=>{
    console.log('state',state)
    let data = {
        room_code: state?.roomCode
    }
    if (state?.isHost) {
        socketIO.emit("create-room", data);
    } else {
        socketIO.emit("join-room", data);
    }
    // socketIO.on("message",(res)=>{
    //     console.log("message",res)
    // })
    console.log("socketIO",socketIO)
  },[])

  return (
    <Tab.Navigator screenOptions={
        { 
            headerShown: false,
            tabBarStyle: {
                paddingHorizontal: 5,
                paddingTop: 0,
                backgroundColor: '#143E60',
                position: 'absolute',
                borderTopWidth: 0,
            },
        }
    }
    tabBarOptions={{
        activeTintColor: '#29B73A',
        inactiveTintColor: 'gray',
        showLabel: true,
        style: {backgroundColor: '#29B73A',},
      }}
    >
        <Tab.Screen name="Media"  component={Media} />
        <Tab.Screen name="Chat"  component={ChatPage} />
        <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  )
}