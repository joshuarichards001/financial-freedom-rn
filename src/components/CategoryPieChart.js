import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {VictoryPie} from 'victory-native';

export default function CategoryPieChart({transactionList}) {
  let categoryMap = expenseCategories();

  // calculates how much the user has spent on each category
  function expenseCategories() {
    let map = new Map();
    for (let transaction of transactionList) {
      if (!transaction.income) {
        const amount = Number(transaction.amount);
        if (map.has(transaction.category)) {
          map.set(
            transaction.category,
            Number(map.get(transaction.category)) + amount,
          );
        } else {
          map.set(transaction.category, amount);
        }
      }
    }
    let output = [];
    for (let [key, value] of map) {
      output.push({x: key, y: value});
    }
    return output;
  }

  return (
    <View>
      <VictoryPie
        colorScale={[
          'red',
          'green',
          'gold',
          'cyan',
          'navy',
          'teal',
          'maroon',
          'purple',
          'pink',
        ]}
        data={categoryMap}
        width={250}
        height={250}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
