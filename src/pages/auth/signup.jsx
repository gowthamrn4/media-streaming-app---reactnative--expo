import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Loader } from '../../components';
import AsyncStorage from "@react-native-async-storage/async-storage";

function Signup({ navigation }) {

  const [ showLoader, setShowLoader ] = useState(false);

  const userLogin = () => {
    AsyncStorage.setItem("token","123455556")
    setShowLoader(true)
  }

  useEffect(()=>{
    setTimeout(()=>{
        setShowLoader(false)
    },3000)
  },[showLoader])

  return (
    <View style={styles.container}>
        <View style={styles.boxContent}>
            <View>
                <Text>Username</Text>
                <TextInput/>
            </View>
        </View>
        <View style={styles.boxContent}>
            <View>
                <Text>Email</Text>
                <TextInput/>
            </View>
        </View>
        <View style={styles.boxContent}>
            <View>
                <Text>Password</Text>
                <TextInput secureTextEntry={true}/>
            </View>
        </View>

        <TouchableOpacity style={[styles.boxContent,{ backgroundColor:"#29B73A" }]} onPress={userLogin}>
            <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation?.navigate("login")}>
            <Text style={styles.newUserText}>Login? </Text>
        </TouchableOpacity>
        { showLoader && <Loader/> }
    </View>
  )
}

export default Signup

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