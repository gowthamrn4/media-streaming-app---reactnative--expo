import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Loader } from '../../components';
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from '../../axios';
import { login } from '../../auth';

function Login({ navigation }) {

  const [ showLoader, setShowLoader ] = useState(false);
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");


  const userLogin = () => {
    setShowLoader(true);
    API.post('/auth/login', {
      username: username,
      password: password
    }).then((res)=>{
      if (res.status == 200) {
        login(username, res.data.data.token, res.data.data.id);
        navigation.navigate("room");
      }
      setShowLoader(false)
    }).catch((error)=>{
      setShowLoader(false)
    })
  }

  useEffect(()=>{
    setShowLoader(true);
    AsyncStorage.getItem("userData").then((res)=>{
      if (res) {
        let json = JSON.parse(res);
        if (json?.token) {
          setShowLoader(false)
          navigation.navigate("room")
        }
      } else {
        setShowLoader(false);
      }
    })
  },[])

  return (
    <View style={styles.container}>
        <View style={styles.boxContent}>
            <View>
                <Text>Username</Text>
                <TextInput value={username} onChangeText={(text)=>setUsername(text)}/>
            </View>
        </View>
        <View style={styles.boxContent}>
            <View>
                <Text>Password</Text>
                <TextInput value={password} secureTextEntry={true} onChangeText={(text)=>setPassword(text)}/>
            </View>
        </View>

        <TouchableOpacity style={[styles.boxContent,{ backgroundColor:"#29B73A" }]} onPress={userLogin}>
            <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation?.navigate("signup")}>
            <Text style={styles.newUserText}>New user? </Text>
        </TouchableOpacity>
        { showLoader && <Loader/> }
    </View>
  )
}

export default Login

const styles  = StyleSheet.create({
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
  newUserText:{
    color:'#ffff',
    marginTop:10
  }
})