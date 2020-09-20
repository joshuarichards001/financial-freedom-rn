import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Category from './Category';
import {EXPENSE_CATEGORIES} from '../helper/Constants';

export default function CategoryList({transactionList}) {
  const categoryList = EXPENSE_CATEGORIES;
  const categories = expenseCategories();

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
    return map;
  }

  return (
    <View style={styles.section}>
      {categoryList.map((category) => {
        for (let [key, value] of categories) {
          if (key === category) {
            return (
              <Category key={category} category={category} amount={value} />
            );
          }
        }
        return <Category key={category} category={category} amount={0} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    borderWidth: 1,
  },
});
