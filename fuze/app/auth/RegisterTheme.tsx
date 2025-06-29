import { StyleSheet,Text, View } from 'react-native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';

export default function RegisterTheme (){
  
  const getData = async () => {
      const usersCollection = firestore().collection('Users');
  };
  
  return (
    <View>
      <Text>
        Register Theme
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({})