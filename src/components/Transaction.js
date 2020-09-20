import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export default function Transaction({transaction, deleteTransaction}) {
  return (
    <View style={styles.transaction}>
      <Text style={styles.text}>{transaction.category}</Text>
      <Text
        style={{color: transaction.income ? 'green' : 'red', paddingTop: 8}}>
        {transaction.amount}
      </Text>
      <Button
        title="X"
        onPress={() => {
          deleteTransaction(transaction.id);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
  },
  text: {
    paddingTop: 8,
    paddingLeft: 8,
    textAlign: 'center',
    fontSize: 15,
  },
});
