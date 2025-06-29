import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'; 
import React from 'react';
import { auth } from '@/FirebaseConfig';
import { getAuth } from 'firebase/auth';
import { router } from 'expo-router';

export default function index() {
  getAuth().onAuthStateChanged((user) => {
    if (!user) router.replace('/');

  });
  return (
    <View>
      <Text>Sign Out </Text>
      <TouchableOpacity onPress={() => auth.signOut()}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View> 
  );
}

const styles = StyleSheet.create({});