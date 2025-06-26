import { StyleSheet, TextInput, Button, Alert, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import React, { useState } from 'react';
import { useQuery, useRealm } from '@realm/react';
import { Users } from "../../models/Users";

export default function Test() {
  const realm = useRealm();
  const users = useQuery(Users);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const startEdit = (user: Users) => {
    setEditingId(user._id.toHexString());
    setEditName(user.name);
    setEditEmail(user.email);
  };

  const saveEdit = (user: Users) => {
    try {
      realm.write(() => {
        user.name = editName;
        user.email = editEmail;
      });
      setEditingId(null);
    } catch (e) {
      Alert.alert('Error', 'Failed to update user');
    }
  };

  const deleteUser = (user: Users) => {
    Alert.alert('Delete', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: () => {
          realm.write(() => {
            realm.delete(user);
          });
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users</Text>
      <FlatList
        data={users}
        keyExtractor={item => item._id.toHexString()}
        renderItem={({ item }) => (
          <View style={styles.userRow}>
            {editingId === item._id.toHexString() ? (
              <>
                <TextInput
                  style={styles.input}
                  value={editName}
                  onChangeText={setEditName}
                  placeholder="Name"
                />
                <TextInput
                  style={styles.input}
                  value={editEmail}
                  onChangeText={setEditEmail}
                  placeholder="Email"
                />
                <Button title="Save" onPress={() => saveEdit(item)} />
                <Button title="Cancel" onPress={() => setEditingId(null)} />
              </>
            ) : (
              <>
                <Text style={styles.text}>{item.name} ({item.email})</Text>
                <Button title="Edit" onPress={() => startEdit(item)} />
                <Button title="Delete" color="red" onPress={() => deleteUser(item)} />
              </>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  text: {
    fontSize: 18,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginRight: 8,
    flex: 1,
    backgroundColor: '#fff',
  },
});