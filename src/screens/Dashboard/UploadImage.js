// import {StyleSheet, Button, Text, TouchableOpacity, View} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {launchImageLibrary} from 'react-native-image-picker';
// import {storage} from '../firebase/firebase';
// const UploadData = () => {
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploadStatus, setUploadStatus] = useState('');

//   const chooseFile = async () => {
//     const options = {
//       mediaType: 'photo',
//     };

//     try {
//       launchImageLibrary(options, response => {
//         //   console.log('Line 15', response.assets[0].uri);
//         if (response.didCancel) {
//           console.log('User Canclled Image Picker');
//         } else if (response.error) {
//           console.log('ImagePicker Error:', response.error);
//         } else if (response.assets[0].uri) {
//           uploadFile(response.assets[0].uri);
//         }
//       });
//     } catch (error) {
//       console.log('Error in Image Picker:', error);
//     }
//   };
//   const uploadFile = async uri => {
//     setUploadProgress(0);
//     setUploadStatus('Uploading...');

//     const reference = storage().ref(`files/${Math.random().toString(36)}`);
//     console.log('Line 32', reference);
//     const task = reference.putFile(uri);

//     task.on(
//       'state_changed',
//       taskSnapshot => {
//         console.log('Line 38');
//         const progress =
//           (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
//         setUploadProgress(progress);
//       },
//       error => {
//         console.log('Error uploading file: ', error);
//         setUploadStatus('Upload failed');
//       },
//       () => {
//         // On successful upload
//         setUploadProgress(100);
//         setUploadStatus('Upload successful');
//       },
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Upload File</Text>
//       <Button title="Choose File" onPress={chooseFile} />
//       {uploadStatus !== '' && (
//         <View>
//           <Text>Progress: {uploadProgress}%</Text>
//           <Text>Status: {uploadStatus}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default UploadData;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     color: 'black',
//     marginVertical: 10,
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   buttonStyle: {
//     minWidth: 300,
//     backgroundColor: '#7DE24E',
//     borderWidth: 0,
//     color: '#FFFFFF',
//     borderColor: '#7DE24E',
//     height: 40,
//     alignItems: 'center',
//     borderRadius: 30,
//     marginLeft: 35,
//     marginRight: 35,
//     marginTop: 20,
//     marginBottom: 25,
//   },
//   buttonTextStyle: {
//     color: '#FFFFFF',
//     paddingVertical: 10,
//     fontSize: 16,
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {firebase} from '../firebase/firebase';

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    // No Permission required
    let result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const source = {uri: result.assets[0].uri};
    console.log(source);
    setImage(source);
  };

  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1);
    var ref = firebase.storage().ref().child(filename).put(blob);

    try {
      await ref;
    } catch (e) {
      console.log(e);
    }
    setUploading(false);
    Alert.alert('Photo Uploaded.....');
    setImage(null);
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an Image</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {image && (
          <Image source={{uri: image.uri}} style={{width: 300, height: 300}} />
        )}
        <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    margin: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
});
