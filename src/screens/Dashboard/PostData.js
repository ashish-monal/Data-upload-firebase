import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {collection, addDoc, doc} from 'firebase/firestore/lite';
import {db} from '../firebase/firebase';

const PostData = () => {
  const [fullName, setFullName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);

  const saveData = async () => {
    const docRef = await addDoc(collection(db, 'users'), {
      FullName: fullName,
      Phone: phone,
      Address: address,
    });
    Alert.alert('Document Written with ID:', docRef.id);
    console.log('Document Written with ID:', docRef.id);
  };

  return (
    <View>
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: 18,
          marginVertical: 20,
        }}>
        Profile Screen
      </Text>
      <View>
        <TextInput
          placeholder="Full Name"
          onChangeText={text => setFullName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Mobile Number"
          onChangeText={text => setPhone(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Address"
          onChangeText={text => setAddress(text)}
          style={styles.input}
        />
        <TouchableOpacity style={styles.btn} onPress={() => saveData()}>
          <Text style={{color: 'white'}}>Save Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostData;

const styles = StyleSheet.create({
  input: {
    width: '80%',
    alignSelf: 'center',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  btn: {
    backgroundColor: 'green',
    height: 50,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
