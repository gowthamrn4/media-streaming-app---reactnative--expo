import React, { useState, useEffect, useContext } from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../../axios";
import { RoomContext } from "../../context";
import { Loader } from "../../components";

const RoomSetup = ({ navigation }) => {
    const [ roomCode, setRoomCode ] = useState("");
    const [ roomName, setCreateRoomcode ] = useState("");
    const [ state, dispatch  ] = useContext(RoomContext);
    const [ showLoader, setShowLoader ] = useState(false);

    const joinRoom = () => {
        setShowLoader(true)
        if (roomCode == '') {
            setShowLoader(false)
            return;
        }
        API.get('/rooms/join/' + roomCode, {
    
        }).then((res) => {
            console.log('join room',res?.data?.data)
            dispatch({
                type:'SETUPINIT',
                payload: {
                    roomName: res?.data?.data?.room_name, 
                    isHost: false,
                    roomCode: roomCode
                }
            })
            setShowLoader(false)
            navigation.navigate('home')
        }).catch((error) => {
            setShowLoader(false)
            console.log('error',error)
        });
    }

    const createRoom = () => {
        setShowLoader(true)
        if (roomName == '') {
            setShowLoader(false)
            return;
        }
        AsyncStorage.getItem('userData').then((user)=>{
            let userData = JSON.parse(user)
            console.log('userData',userData)
            let userID = userData.id;
            API.post('/rooms/create', {
                name: roomName,
                creatorId: userID
            }).then((res) => {
                console.log('create room',res)
                dispatch({
                    type:'SETUPINIT',
                    payload: {
                        roomName: roomName, 
                        isHost: true,
                        roomCode: res?.data?.data?.roomCode
                    }
                })
                setShowLoader(false)
                navigation.navigate('home')
            }).catch((error) => {
                setShowLoader(false)
                console.log('error',error)
            });
        })
    }

    useEffect(()=>{
        console.log(state)
    })

    return (
        <View style={styles.container}>
           <View style={styles.boxContent}>
                <Text>Room Code</Text>
                <TextInput value={roomCode} onChangeText={(text)=>setRoomCode(text)} />
           </View>
           <TouchableOpacity style={[styles.boxContent,{ backgroundColor:"#29B73A" }]} onPress={joinRoom}>
                <Text style={styles.loginText}>Join</Text>
            </TouchableOpacity>

            <View style={styles.hr}>
                <Text></Text>
            </View>

            <View style={styles.boxContent}>
                <Text>Create Room</Text>
                <TextInput value={roomName} onChangeText={(text)=>setCreateRoomcode(text)}/>
           </View>
           <TouchableOpacity style={[styles.boxContent,{ backgroundColor:"#29B73A" }]} onPress={createRoom}>
                <Text style={styles.loginText}>Create</Text>
            </TouchableOpacity>
            {
             showLoader &&  <Loader />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        display:'flex', 
        height:'100%', 
        backgroundColor:'#143E60', 
        justifyContent:'center',
        alignItems:'center'
      },
      boxContent: {
        padding:10,
        width:"70%", 
        backgroundColor:"#ffff",
        borderRadius:10,
        marginTop:10
      },
      loginText:{
        textAlign:'center', 
        fontWeight:'bold', 
        fontSize:17,
        color:'#fff'
      },
      hr: {
        width:'70%',
        height:2,
        backgroundColor:'#ffff',
        marginTop:10
      }
})

export default RoomSetup;
