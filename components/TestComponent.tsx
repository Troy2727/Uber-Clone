import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TestComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is a test component with direct styles</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TestComponent;
