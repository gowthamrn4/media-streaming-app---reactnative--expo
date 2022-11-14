import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react';
import { logout } from '../../auth';

export default function Settings({ navigation }) {

    const userLogout = () => {
        logout();
        navigation.navigate("login")
    }

  return (
    <View>
       <View style={{ padding:10 }}>
            <TouchableOpacity style={{ backgroundColor:"#143E60" }} onPress={userLogout}> 
                <Text style={{ color:'#ffff',padding:10, fontWeight:'bold', fontSize:15 }}>Logout</Text>   
            </TouchableOpacity>
       </View>
    </View>
  )
}