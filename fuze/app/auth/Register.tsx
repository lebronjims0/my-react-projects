import { StyleSheet } from 'react-native';
import React from 'react';
import { Text, View } from '@/components/Themed';
import  RegisterTheme  from './RegisterTheme';

export default function Register (){
    return (
       <View style={styles.container}>
             <RegisterTheme />
       </View>
    );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    textAlign: 'center',
  }
});