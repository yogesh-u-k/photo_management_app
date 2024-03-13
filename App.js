import React from 'react';
import { StatusBar, View } from 'react-native';
import UploadPage from './Apps/Screens/UploadPage';


export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <UploadPage/>
    </View>
  );
}
