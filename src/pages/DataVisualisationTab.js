import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FlowPieChart from '../components/FlowPieChart';
import CategoryPieChart from '../components/CategoryPieChart';

/**
 * Displays the pie charts that visualise the users data.
 *
 * @param transactionList users list of transactions.
 */
export default function DataVisualisationTab({transactionList}) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Data</Text>
      <Text style={styles.text}>Income vs. Expense</Text>
      <FlowPieChart transactionList={transactionList} />
      <Text style={styles.text}>Categories</Text>
      <CategoryPieChart transactionList={transactionList} />
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
  text: {
    fontSize: 20,
    marginTop: 20,
  },
});
