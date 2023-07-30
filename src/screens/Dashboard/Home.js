import {View, Text, Alert, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {firebase} from '../firebase/firebase';

const Home = ({navigation, route}) => {
  const userInfo = route.params.data;
  const userInfo1 = route.params.data1;
  const [user, setUser] = useState();
  const dataRef = firebase.firestore().collection('name');

  const logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure ? You want to logout?',
      [
        {
          text: 'Cancle',
          onPress: () => {
            return null;
          },
        },
        {
          text: 'Confirm',
          onPress: () => {
            auth()
              .signOut()
              .then(() => navigation.replace('Welcome'))
              .catch(error => {
                console.log(error);
                if (error.code === 'auth/no-current-user')
                  navigation.replace('Welcome');
                else Alert.alert(error);
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View>
      {userInfo ? (
        <View>
          <Text>Welcome {userInfo.displayName}</Text>
          <Text>Welcome {userInfo.email}</Text>
        </View>
      ) : (
        <View>
          <Text>Welcome {userInfo1.givenName}</Text>
          <Text>Email Id : {userInfo1.email}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={logout}>
        <Text style={styles.buttonTextStyle}>LogOut</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate('Camera')}>
        <Text style={styles.buttonTextStyle}>Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate('FetchData')}>
        <Text style={styles.buttonTextStyle}>FetchData</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate('PostData')}>
        <Text style={styles.buttonTextStyle}>Post Data</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate('UploadImage')}>
        <Text style={styles.buttonTextStyle}>Upload Image</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate('EmailVerification')}>
        <Text style={styles.buttonTextStyle}>Email Verification</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonStyle: {
    minWidth: 300,
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default Home;

// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';

// const Home = () => {
//   return (
//     <View>
//       <Text>Home</Text>
//     </View>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({});
