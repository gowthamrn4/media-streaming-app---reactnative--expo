import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

function Loader() {
  return (
    <View style={{position:'absolute', backgroundColor:"rgba(0,0,0,0.5)", height:'100%', width:'100%' }}>
        <View style={{ display:'flex', height:"100%", width:'100%', justifyContent:'center', alignItems:'center' }}>
            <View style={{  backgroundColor:'#fff', padding:20, display:'flex', justifyContent:'center', alignItems:'center', width:'50%' }}>
               <ActivityIndicator size={30} color={"#29B73A"}/>
            </View>
        </View>
    </View>
  )
}

export default Loader;