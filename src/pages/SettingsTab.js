import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

export default function SettingsTab({onLogoutClick}) {
  return (
    <View style={styles.screen}>
      <Text>Options</Text>
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
    margin: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
