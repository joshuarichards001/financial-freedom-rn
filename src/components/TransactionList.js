import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Transaction from './Transaction';

export default function TransactionList({transactionList, deleteTransaction}) {
  return (
    <View>
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

const styles = StyleSheet.create({});
