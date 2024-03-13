import React, { useState } from 'react';
import { View, TextInput, TouchableHighlight, Text, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const UploadPage = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('photo', {
        uri: image,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
      formData.append('title', title);
      formData.append('description', description);

      // Adjust the backend URL here
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload successful:', response.data);
      Alert.alert('Upload Successful');
    } catch (error) {
      console.error('Error uploading photo:', error);
      Alert.alert('Upload Failed', 'Please try again later');
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
      <TouchableHighlight
        style={{ backgroundColor: 'black', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }}
        onPress={pickImage}
      >
        <Text style={{ color: 'white' }}>Pick an image from camera roll</Text>
      </TouchableHighlight>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginVertical: 20 }} />}
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={text => setTitle(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={text => setDescription(text)}
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        multiline
      />
      <TouchableHighlight
        style={{ backgroundColor: 'black', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, marginTop: 20 }}
        onPress={handleUpload}
      >
        <Text style={{ color: 'white' }}>Upload</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = {
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
};

export default UploadPage;
