import { StyleSheet, Button } from 'react-native';
import { Text, View, TouchableOpacity } from '@/components/Themed';
import React from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';


type RootStackParamList = {
  'auth/Register': undefined;
  // add other routes here if needed
};

export default function ProfileTheme() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Text>Don't have account yet?</Text>
      <Button title="Sign Up" onPress={() => navigation.navigate('auth/Register')} />
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

