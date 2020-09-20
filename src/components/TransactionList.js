import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Transaction from './Transaction';

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
