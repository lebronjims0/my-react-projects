import { StyleSheet } from 'react-native';
import { View,Text } from '@/components/Themed';
import React from 'react';
import EditTheme from './ProfileEditTheme';

export default function EditProfile() {
  return (
    <View style={styles.container}>
      <EditTheme />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});