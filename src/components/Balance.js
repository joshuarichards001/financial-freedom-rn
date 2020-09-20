import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Balance({transactionList}) {
  const calculateTotal = () => {
    var total = 0.0;
    for (const transaction of transactionList) {
      var amount = Number(transaction.amount);
      total = transaction.income ? total + amount : total - amount;
    }
    return Number(total).toFixed(2);
  };

  return (
    <View>
      <Text style={styles.text}>
        Balance: ${calculateTotal(transactionList)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    marginBottom: 20,
  },
});
