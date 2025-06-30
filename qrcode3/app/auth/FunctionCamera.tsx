import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { db } from '../../FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function FunctionCamera() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const onScan = async ({ data }: { data: string }) => {
    setScanned(true);
    if (!user) {
      Alert.alert('No user logged in.');
      return;
    }
    try {
      const friendData = JSON.parse(data);
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

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : onScan}
        style={StyleSheet.absoluteFillObject}
      />
      <Text style={styles.text}>Scan a friend's QR code</Text>
      {scanned && <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  text: { fontSize: 18, textAlign: 'center', margin: 16, color: '#fff', backgroundColor: 'rgba(0,0,0,0.5)' },
});