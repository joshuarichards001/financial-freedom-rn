import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {VictoryPie} from 'victory-native';

export default function FlowPieChart({transactionList}) {
  const inc = incomeExpense()[0];
  const exp = incomeExpense()[1];

  // calculates how much the user earns vs how much they spend
  function incomeExpense() {
    var income = 0;
    var expense = 0;
    for (let transaction of transactionList) {
      const amount = Number(transaction.amount);
      if (transaction.income) {
        income = income + amount;
      } else {
        expense = expense + amount;
      }
    }
    return [income, expense];
  }

  return (
    <View style={{borderWidth: 1}}>
      <VictoryPie
        colorScale={['green', 'red', 'gold', 'cyan', 'navy']}
        data={[
          {x: 'Income', y: inc},
          {x: 'Expense', y: exp},
        ]}
        width={250}
        height={250}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
