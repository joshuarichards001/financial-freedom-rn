import axios, {AxiosResponse} from 'axios';
import {baseUrl} from '../Constants';

export const getTransactions = async (token) => {
  try {
    const transactions = await axios.get(
      baseUrl + '/transactions/',
      tokenConfig(token),
    );
    return transactions;
  } catch (error) {
    throw new Error(error);
  }
};

export const addTransaction = async (token, income, amount, category) => {
  try {
    const transaction = {
      income: income,
      amount: amount,
      category: category,
    };
    const saveTransaction = await axios.post(
      baseUrl + '/transactions/',
      transaction,
      tokenConfig(token),
    );
    return saveTransaction;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTransaction = async (token, id) => {
  try {
    const deleteTransaction = await axios.delete(
      `${baseUrl}/transactions/${id}/`,
      tokenConfig(token),
    );
    return deleteTransaction;
  } catch (error) {
    throw new Error(error);
  }
};

export const tokenConfig = (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  config.headers['Authorization'] = `Token ${token}`;
  return config;
};
