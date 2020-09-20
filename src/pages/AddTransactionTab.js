import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AddTransaction from '../components/AddTransaction';

export default function AddTransactionTab({addTransaction}) {
  return (
    <View style={styles.screen}>
      <AddTransaction addTransaction={addTransaction} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    margin: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});
