import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>It works </Text>
      <Text>And its nice </Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#111111',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
