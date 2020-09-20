import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

export default function Category({category, amount}) {
  const [budget, setBudget] = useState(0);

  return (
    <View style={{flexDirection: 'row'}}>
      <Text>{category}</Text>
      <TextInput
        value={budget}
        style={styles.input}
        onChangeText={(text) => setBudget(text)}
      />
      <Text style={{color: amount <= budget ? 'green' : 'red'}}>{amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 20,
    width: 50,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
