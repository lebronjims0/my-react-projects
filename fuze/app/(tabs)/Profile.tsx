import { StyleSheet, Button } from 'react-native';
import { Link } from 'expo-router';
import { Text, View, TouchableOpacity } from '@/components/Themed';
import React from 'react';
import ProfileThemes from '@/components/ProfileTheme';



export default function ProfileTheme() {
  return (
    <View style={styles.container}>
      <Text>Don't have account yet?</Text>
      <Link href="/auth/Register" asChild>
        <Button title="Sign Up" />
      </Link>
      <ProfileThemes />
    </View>
  );
}
  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
