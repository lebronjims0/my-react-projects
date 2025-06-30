import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import FunctionCamera from '../auth/FunctionCamera';
export default function Function() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Function</Text>
      <FunctionCamera />
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
