import {Button, Text, View, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {db} from '../firebase/firebase';
import {collection, getDocs} from 'firebase/firestore/lite';

const FetchData = () => {
  const [dataList, setDataList] = useState([]);

  const GetData = async () => {
    const dataCol = collection(db, 'users');
    const dataSnapshot = await getDocs(dataCol);
    const userData = dataSnapshot.docs.map(doc => doc.data());
    setDataList(userData);
    console.log(dataList);
  };

  return (
    <ScrollView>
      <Button title="Get Data" onPress={GetData} />
      {dataList.map((userData, index) => (
        <View style={{alignItems: 'center'}} key={index}>
          <Text style={style.list}>Name :- {userData.FullName}</Text>
          <Text style={style.list}> Mobile Number :- {userData.Phone}</Text>
          <Text style={style.list}> Address : - {userData.Address}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default FetchData;

const style = StyleSheet.create({
  list: {
    width: '80%',
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 25,
    borderWidth: 2,
  },
});
