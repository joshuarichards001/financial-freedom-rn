import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

/**
 * An individual transaction in a users list.
 *
 * @param transaction An individual transaction from the users list
 * @param deleteTransaction function to delete the transaction from the list.
 */
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
