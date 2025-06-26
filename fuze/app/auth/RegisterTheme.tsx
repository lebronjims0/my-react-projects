import { StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import React, { useState } from 'react';
import { useRealm } from '@realm/react';
import { Users } from './models/Users'; // Adjust path if needed
import Realm from 'realm';

export default function RegisterTheme() {
  const realm = useRealm();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    try {
      const existingUser = realm.objects<Users>('Users').filtered('email == $0', email)[0];
      if (existingUser) {
        Alert.alert('Error', 'Email already registered.');
        return;
      }
      realm.write(() => {
        realm.create('Users', {
          _id: new Realm.BSON.ObjectId(),
          name,
          email,
          password,
        });
      });
      Alert.alert('Success', 'User registered!');
      setName('');
      setEmail('');
      setPassword('');
    } catch (e: any) {
      Alert.alert('Error', `Registration failed: ${e.message || e}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
});