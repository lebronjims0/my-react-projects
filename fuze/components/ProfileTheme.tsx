import { StyleSheet, Image, View as RNView, TouchableOpacity, Button, Alert } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { useQuery, useRealm } from '@realm/react';
import { Users } from "../app/auth/models/Users";
import { Profile } from "../app/auth/models/Profile";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

// Placeholder profile image
const profilePic = require('../assets/images/icon.png');

export default function ProfileTheme() {
  const realm = useRealm();
  const user = useQuery(Users)[0];
  const profile = useQuery(Profile)[0];
  const navigation = useNavigation();

  // Example: Add a user (for demo purposes)
  const handleAddUser = () => {
    try {
      realm.write(() => {
        realm.create('Users', {
          name: 'Bron JIMS',
          email: 'bron@example.com',
          password: 'password',
          createdAt: new Date(),
        });
      });
      Alert.alert('User added!');
    } catch (e) {
      Alert.alert('Error', (e as Error).message);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>No user found.</Text>
        <Button title="Add Demo User" onPress={handleAddUser} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RNView style={styles.profilePicWrapper}>
        <Image source={profilePic} style={styles.profilePic} />
      </RNView>
      <Text style={styles.name}>
        {user.name?.split(' ')[0]}
        {profile && <Text style={styles.tag}> {profile.tag}</Text>}
      </Text>
      <Text style={styles.realName}>
        {profile ? profile.realName : ''}
      </Text>
      <RNView style={styles.row}>
        <Ionicons name="flag" size={16} color="#ffd700" style={{ marginRight: 4 }} />
        <Text style={styles.country}>
          {profile ? profile.country : 'No country'}
        </Text>
        <Text style={styles.dot}> • </Text>
        <Text style={styles.age}>
          {profile ? `${profile.age} years` : ''}
        </Text>
      </RNView>
      <RNView style={styles.row}>
        <MaterialCommunityIcons name="gamepad-variant" size={18} color="#00bfff" style={{ marginRight: 4 }} />
        <Text style={styles.game}>
          {profile ? profile.game : 'No game'}
        </Text>
        <Text style={styles.dot}> • </Text>
        <Text style={styles.joined}>
          Joined {user.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
        </Text>
      </RNView>
        <Link href="/auth/EditProfile" asChild>
        <Button title='Edit Profile'/>
        </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#18191A',
    paddingVertical: 24,
    borderRadius: 12,
    margin: 16,
    elevation: 2,
  },
  profilePicWrapper: {
    borderWidth: 3,
    borderColor: '#00bfff',
    borderRadius: 50,
    padding: 3,
    marginBottom: 8,
    backgroundColor: '#222',
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
  tag: {
    color: '#ffd700',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 4,
  },
  realName: {
    color: '#b0b3b8',
    fontSize: 16,
    marginTop: 2,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  country: {
    color: '#fff',
    fontSize: 15,
  },
  age: {
    color: '#fff',
    fontSize: 15,
  },
  dot: {
    color: '#fff',
    fontSize: 15,
    marginHorizontal: 6,
  },
  game: {
    color: '#00bfff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  joined: {
    color: '#b0b3b8',
    fontSize: 15,
    marginLeft: 4,
  },
  editButton: {
    marginTop: 18,
    backgroundColor: '#00bfff',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});