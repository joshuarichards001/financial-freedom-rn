import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Balance from '../components/Balance';
import AddTransaction from '../components/AddTransaction';
import TransactionList from '../components/TransactionList';

export default function TransactionsTab({
  transactionList,
  addTransaction,
  deleteTransaction,
}) {
  return (
    <View style={styles.screen}>
      <Balance transactionList={transactionList} />
      <TransactionList
        transactionList={transactionList}
        deleteTransaction={deleteTransaction}
      />
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
