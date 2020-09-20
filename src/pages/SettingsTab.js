import React from 'react';
import {Button} from 'react-native-elements';
import {StyleSheet, View, Text} from 'react-native';

export default function SettingsTab({onLogoutClick}) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Options</Text>
      <Button
        title="Logout"
        onPress={() => {
          onLogoutClick();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    marginBottom: 50,
  },
});
