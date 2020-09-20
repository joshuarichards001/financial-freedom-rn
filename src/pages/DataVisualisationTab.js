import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FlowPieChart from '../components/FlowPieChart';
import CategoryPieChart from '../components/CategoryPieChart';

export default function DataVisualisationTab({transactionList}) {
  return (
    <View style={styles.screen}>
      <Text>Data</Text>
      <FlowPieChart transactionList={transactionList} />
      <CategoryPieChart transactionList={transactionList} />
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
