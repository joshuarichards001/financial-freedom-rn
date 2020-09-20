/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-gesture-handler';
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

/**
 * The class where all the tabs are stored an based on where the user
 * presses they will be routed to a different tab.
 *
 * @param token the users token.
 * @param setIsLoggedIn if the user is logged in or not.
 * @param setLoading used to turn off the loading happening in the App file.
 */
export default function Home({token, setIsLoggedIn, setLoading}) {
  const [userId, setUserId] = useState(-1);
  const [transactionList, setTransactionList] = useState([]);
  const Tab = createBottomTabNavigator();
  token = {token: token};

  // fetches user data on render
  useEffect(() => {
    setLoading(false);
    handleFetchUserData();
  }, []);

  // fetches users transactions once user data is fetched
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

  // Logs out user
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
