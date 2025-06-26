import { StyleSheet, TextInput, Button, Alert, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import React, { useState } from 'react';
import { useRealm, useQuery } from '@realm/react';
import { Profile } from './models/Profile';

export default function ProfileEditTheme() {
  const realm = useRealm();
  const existingProfile = useQuery(Profile)[0];

  const [tag, setTag] = useState(existingProfile?.tag || '');
  const [realName, setRealName] = useState(existingProfile?.realName || '');
  const [country, setCountry] = useState(existingProfile?.country || '');
  const [age, setAge] = useState(existingProfile?.age || '');
  const [game, setGame] = useState(existingProfile?.game || '');

  const handleSave = () => {
    try {
      realm.write(() => {
        if (existingProfile) {
          existingProfile.tag = tag;
          existingProfile.realName = realName;
          existingProfile.country = country;
          existingProfile.age = age;
          existingProfile.game = game;
        } else {
          realm.create('Profile', {
            tag,
            realName,
            country,
            age,
            game,
          });
        }
      });
      Alert.alert('Success', 'Profile saved!');
    } catch (e) {
      Alert.alert('Error', (e as Error).message);
    }
  };

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={[{}]}
      renderItem={() => (
        <>
          <Text style={styles.label}>Tag</Text>
          <TextInput
            style={styles.input}
            value={tag}
            onChangeText={setTag}
            placeholder="Enter tag"
            placeholderTextColor="#888"
          />
          <Text style={styles.label}>Real Name</Text>
          <TextInput
            style={styles.input}
            value={realName}
            onChangeText={setRealName}
            placeholder="Enter real name"
            placeholderTextColor="#888"
          />
          <Text style={styles.label}>Country</Text>
          <TextInput
            style={styles.input}
            value={country}
            onChangeText={setCountry}
            placeholder="Enter country"
            placeholderTextColor="#888"
          />
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            placeholder="Enter age"
            placeholderTextColor="#888"
            keyboardType="numeric"
          />
          <Text style={styles.label}>Game</Text>
          <TextInput
            style={styles.input}
            value={game}
            onChangeText={setGame}
            placeholder="Enter game"
            placeholderTextColor="#888"
          />
          <Button title="Save Profile" onPress={handleSave} />
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#18191A',
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#333',
    width: 250,
  },
});