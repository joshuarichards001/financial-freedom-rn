import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Transaction from './Transaction';

/**
 * Displays a list of the users transactions
 *
 * @param transactionList list of users transactions
 * @param deleteTransaction function to delete a transaction from users list
 */
export default function TransactionList({transactionList, deleteTransaction}) {
  return (
    <View style={styles.section}>
      {transactionList.map((transaction) => (
        <Transaction
          key={transaction.id}
          transaction={transaction}
          deleteTransaction={deleteTransaction}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    borderWidth: 1,
  },
});
