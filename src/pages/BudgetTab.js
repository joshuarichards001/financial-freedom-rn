import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CategoryList from '../components/CategoryList';

export default function BudgetTab({transactionList}) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Budget</Text>
      <CategoryList transactionList={transactionList} />
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
