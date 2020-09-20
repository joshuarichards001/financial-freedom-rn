import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Balance from '../components/Balance';
import TransactionList from '../components/TransactionList';
import AddTransaction from '../components/AddTransaction';

export default function TransactionsTab({
  transactionList,
  deleteTransaction,
  addTransaction,
}) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Add Transaction</Text>
      <AddTransaction addTransaction={addTransaction} />
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
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
  },
});
