import * as React from 'react';
import { Alert, Button, Text, View, StyleSheet, StatusBar } from 'react-native';
import { Constants, MediaLibrary, Permissions } from 'expo';
import * as DocumentPicker from 'expo-document-picker';
import MainScreen from './src/main';
import RoomContextProvider from './src/context';

export default class App extends React.Component {

  async componentDidMount() {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  }

  pickDocument = async () => {
    let options = {
     type:"/mp3"
    }
    let result =  DocumentPicker.getDocumentAsync('image/*').then((res)=>{
      console.log('res',res)
    }).catch((err)=>{
      console.log('err',err)
    })
    console.log(result);
   }

  render() {
    return (
      <RoomContextProvider>
         <MainScreen/>
      </RoomContextProvider>
    );
  }
}

