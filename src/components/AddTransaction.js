import React, {useEffect, useState, useRef} from 'react';
import {Button} from 'react-native-elements';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import Picker from 'react-native-picker-select';
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
      INCOME_CATEGORIES.map((c) => {
        categoryOptionsList.push({
          label: c,
          value: c,
        });
      });
    } else {
      EXPENSE_CATEGORIES.map((c) => {
        categoryOptionsList.push({
          label: c,
          value: c,
        });
      });
    }
    console.log(categoryOptionsList);
    setCategoryOptions(categoryOptionsList);
  }, [income]);

  return (
    <View styles={styles.screen}>
      <View style={{flexDirection: 'row'}}>
        <Button
          style={styles.button}
          title="Income"
          onPress={() => {
            setColor(incomeColor);
            setIncome(true);
          }}
        />
        <Button
          style={styles.button}
          title="Expense"
          onPress={() => {
            setColor(expenseColor);
            setIncome(false);
          }}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Text>Amount</Text>
          <TextInput
            keyboardType="number-pad"
            value={amount}
            style={styles.input}
            onChangeText={(text) => {
              setAmount(text);
            }}
          />
        </View>
        <View>
          <Text>Category</Text>
          <Picker
            placeholder={{
              label: 'Select a Category...',
              value: null,
            }}
            items={categoryOptions}
            style={pickerStyle}
            onValueChange={(itemValue) => {
              setCategory(itemValue);
            }}
          />
        </View>
      </View>
      <Button
        title="Add Transaction"
        style={styles.addButton}
        onPress={() => {
          addTransaction(income, amount, category);
          setAmount(0.0);
          setCategory('');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 95,
    borderRadius: 5,
    margin: 5,
  },
  addButton: {
    width: 200,
    borderRadius: 5,
    margin: 5,
    marginBottom: 40,
  },
  input: {
    height: 40,
    width: 100,
    margin: 10,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

const pickerStyle = {
  inputIOS: {
    height: 40,
    width: 100,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
};
