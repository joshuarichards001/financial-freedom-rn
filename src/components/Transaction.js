import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export default function Transaction({transaction, deleteTransaction}) {
  return (
    <View style={styles.transaction}>
      <Text>
        {transaction.category} {transaction.amount}
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
    borderWidth: 1,
  },
});
