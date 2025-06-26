import { StyleSheet, TextInput, Button, Alert, FlatList, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import React, { useState } from 'react';
import { useQuery, useRealm } from '@realm/react';
import { Users } from "../auth/models/Users";
import { Profile } from "../auth/models/Profile";

export default function Test() {
  const realm = useRealm();
  const users = useQuery(Users);
  const profiles = useQuery(Profile);

  // Join users and profiles by userId
  const joinedData = users.map(user => {
    const profile = profiles.find(p => p.userId?.toHexString() === user.userId.toHexString());
    return { user, profile };
  });

  // User editing state
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editUserName, setEditUserName] = useState('');
  const [editUserEmail, setEditUserEmail] = useState('');

  // Profile editing state
  const [editingProfileId, setEditingProfileId] = useState<string | null>(null);
  const [editTag, setEditTag] = useState('');
  const [editRealName, setEditRealName] = useState('');
  const [editCountry, setEditCountry] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editGame, setEditGame] = useState('');

  // User handlers
  const startEditUser = (user: Users) => {
    setEditingUserId(user.userId.toHexString());
    setEditUserName(user.name);
    setEditUserEmail(user.email);
  };

  const saveEditUser = (user: Users) => {
    try {
      realm.write(() => {
        user.name = editUserName;
        user.email = editUserEmail;
      });
      setEditingUserId(null);
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

  // Profile handlers
  const startEditProfile = (profile: Profile) => {
    setEditingProfileId(profile.profileId.toHexString());
    setEditTag(profile.tag);
    setEditRealName(profile.realName);
    setEditCountry(profile.country);
    setEditAge(profile.age);
    setEditGame(profile.game);
  };

  const saveEditProfile = (profile: Profile) => {
    try {
      realm.write(() => {
        profile.tag = editTag;
        profile.realName = editRealName;
        profile.country = editCountry;
        profile.age = editAge;
        profile.game = editGame;
      });
      setEditingProfileId(null);
    } catch (e) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const deleteProfile = (profile: Profile) => {
    Alert.alert('Delete', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: () => {
          realm.write(() => {
            realm.delete(profile);
          });
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>  
      <Text style={styles.title}>User and Profile Management</Text>

      {/* User Editing */}
      <FlatList
        data={joinedData}
        keyExtractor={item => item.user.userId.toHexString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.text}>
              {item.user.name} ({item.user.email})
              {item.profile
                ? ` | ${item.profile.tag} | ${item.profile.realName} | ${item.profile.country} | ${item.profile.age} | ${item.profile.game}`
                : ' | No profile'}
            </Text>
            {/* Add edit/delete buttons for user and profile as needed */}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginRight: 8,
    marginBottom: 4,
    flex: 1,
    backgroundColor: '#fff',
    minWidth: 100,
  },
});