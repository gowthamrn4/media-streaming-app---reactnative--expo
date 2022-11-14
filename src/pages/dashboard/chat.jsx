import { View, Text, TextInput } from 'react-native'
import React, { useState, useCallback, useEffect, useContext } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { socketIO } from '../../utlis/socket';
import { RoomContext } from "../../context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Chat, MessageType } from '@flyerhq/react-native-chat-ui';

const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.floor(Math.random() * 16)
      const v = c === 'x' ? r : (r % 4) + 8
      return v.toString(16)
    })
  }

export default function ChatPage({ navigation }) {

    const [messages, setMessages] = useState([]);
    const [ state, dispatch  ] = useContext(RoomContext);
    const [user, setUser] = useState([]);



    useEffect(()=>{
        socketIO.on("message",(msg)=>{
            setMessages((previewMessage)=>[...previewMessage,msg])
            console.log("message",msg)
        })
        AsyncStorage.getItem("userData").then((res)=>{
            let userData = JSON.parse(res);
            setUser(userData)
            console.log(userData)
        })
    },[])


    const addMessage = (message) => {
      setMessages([...messages,message])
    }
  
    const handleSendPress = (message) => {
      const textMessage = {
        author: { id: user?.id },
        createdAt: Date.now(),
        id: Date.now(),
        text: message.text,
        type: 'text',
        message: message.text,
        room_code: state?.roomCode,
        senderId: user?.id,
        senderName: "admin",
        senderStatus: true,
        time: Date.now(),
      }
      setMessages((previewMessage)=>[...previewMessage,textMessage])
      socketIO.emit("message",textMessage)
    }


  return (
    <View style={{ height:"90%" }}>
        <Chat
            messages={messages.reverse()}
            onSendPress={handleSendPress}
            user={{ id: user?.id }}
        />
    </View>
  )
}