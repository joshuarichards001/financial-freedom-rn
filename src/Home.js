/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-gesture-handler';
//import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BudgetTab from './pages/BudgetTab';
import DataVisualisationTab from './pages/DataVisualisationTab';
import TransactionsTab from './pages/TransactionsTab';
import SettingsTab from './pages/SettingsTab';
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
} from './helper/transactionAPI';
import {userDetails, logoutUser} from './helper/userAPI';

export default function Home({token, setIsLoggedIn, setLoading}) {
  const [userId, setUserId] = useState(-1);
  const [transactionList, setTransactionList] = useState([]);
  const Tab = createBottomTabNavigator();
  token = {token: token};

  useEffect(() => {
    setLoading(false);
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

  const onLogoutClick = async function () {
    logoutUser(token)
      .then()
      .catch((err) => console.log(err));
    setIsLoggedIn(false);
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Error clearing app data.');
    }
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Transactions"
          children={() => (
            <TransactionsTab
              addTransaction={handleAddTransaction}
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
        <Tab.Screen
          name="Options"
          children={() => <SettingsTab onLogoutClick={onLogoutClick} />}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

//const styles = StyleSheet.create({});
