import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { db } from '../../FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function FunctionCamera() {
  const auth = getAuth();
  const user = auth.currentUser;

  const onScan = async (e: any) => {
    if (!user) {
      Alert.alert('No user logged in.');
      return;
    }
    try {
      const friendData = JSON.parse(e.data);
      await setDoc(doc(db, 'friend', user.uid), {
        userId: user.uid,
        ...friendData,
        createdAt: new Date()
      });
      Alert.alert('Friend added!');
    } catch (error) {
      Alert.alert('Invalid QR code or error saving friend.');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={onScan}
        topContent={<Text style={styles.text}>Scan a friend's QR code</Text>}
        showMarker={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  text: { fontSize: 18, textAlign: 'center', margin: 16 },
});