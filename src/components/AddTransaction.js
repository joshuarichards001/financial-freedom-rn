/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Picker} from 'react-native';
import {EXPENSE_CATEGORIES, INCOME_CATEGORIES} from '../helper/Constants';

export default function AddTransaction({addTransaction}) {
  const expenseColor = '#f5dfdf';
  const incomeColor = '#e5ffe7';
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [income, setIncome] = useState(false);
  const [amount, setAmount] = useState(0.0);
  const [category, setCategory] = useState('');
  const [color, setColor] = useState(expenseColor);

  useEffect(() => {
    var categoryOptionsList = [];
    if (income) {
      INCOME_CATEGORIES.map((c, i) => {
        categoryOptionsList.push(<Picker.Item key={i} value={c} label={c} />);
      });
    } else {
      EXPENSE_CATEGORIES.map((c, i) => {
        categoryOptionsList.push(<Picker.Item key={i} value={c} label={c} />);
      });
    }
    setCategoryOptions(categoryOptionsList);
  }, [income]);

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Button
          style={{color: incomeColor}}
          title="Income"
          onPress={() => {
            setColor(incomeColor);
            setIncome(true);
          }}
        />
        <Button
          style={{color: expenseColor}}
          title="Expense"
          onPress={() => {
            setColor(expenseColor);
            setIncome(false);
          }}
        />
      </View>
      <Text>Amount</Text>
      <TextInput
        keyboardType="number-pad"
        value={amount}
        style={{backgroundColor: color}}
        onChangeText={(text) => {
          setAmount(text);
        }}
      />
      <Text>Category</Text>
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => {
          setCategory(itemValue);
        }}>
        {categoryOptions}
      </Picker>
      <Button
        title="Add Transaction"
        onPress={() => {
          addTransaction(income, amount, category);
          setAmount(0.0);
          setCategory('');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
