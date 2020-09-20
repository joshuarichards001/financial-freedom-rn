/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
//import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BudgetTab from '../pages/BudgetTab';
import DataVisualisationTab from '../pages/DataVisualisationTab';
import TransactionsTab from '../pages/TransactionsTab';
import SettingsTab from '../pages/SettingsTab';
import AddTransactionTab from '../pages/AddTransactionTab';
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
} from '../helper/transactionAPI';
import {userDetails} from '../helper/userAPI';

export default function Home(token) {
  const [userId, setUserId] = useState(-1);
  const [transactionList, setTransactionList] = useState([]);
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    handleFetchUserData();
  }, []);

  useEffect(() => {
    if (userId !== -1) {
      handleFetchTransactions();
    }
  }, [userId]);

  // Gets the users data
  const handleFetchUserData = () => {
    userDetails(token)
      .then(({data}) => {
        setUserId(data.id);
      })
      .catch((err) => console.log(err));
  };

  // Gets a list of all transactions from API
  const handleFetchTransactions = () => {
    getTransactions(token)
      .then(({data}) => {
        setTransactionList(data.reverse());
      })
      .catch((err) => console.log(err));
  };

  // Adds the given transaction to the API
  const handleAddTransaction = (income, amount, category) => {
    addTransaction(token, income, amount, category)
      .then(() => {
        handleFetchTransactions();
      })
      .catch((err) => console.log(err));
  };

  // Deletes the given transaction from the API
  const handleDeleteTransaction = (id) => {
    deleteTransaction(token, id)
      .then(() => {
        handleFetchTransactions();
      })
      .catch((err) => console.log(err));
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Add Transaction"
          children={() => (
            <AddTransactionTab addTransaction={handleAddTransaction} />
          )}
        />
        <Tab.Screen
          name="Transactions"
          children={() => (
            <TransactionsTab
              transactionList={transactionList}
              deleteTransaction={handleDeleteTransaction}
            />
          )}
        />
        <Tab.Screen
          name="Data"
          children={() => (
            <DataVisualisationTab transactionList={transactionList} />
          )}
        />
        <Tab.Screen
          name="Budget"
          children={() => <BudgetTab transactionList={transactionList} />}
        />
        <Tab.Screen name="Settings" children={() => <SettingsTab />} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

//const styles = StyleSheet.create({});
