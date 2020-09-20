import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CategoryList from '../components/CategoryList';

export default function BudgetTab({transactionList}) {
  return (
    <View style={styles.screen}>
      <Text>Budget</Text>
      <CategoryList transactionList={transactionList} />
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