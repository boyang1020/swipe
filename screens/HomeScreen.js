import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Deck from '../src/Deck';

export default class HomeScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Deck />
      </View>
    );
  
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
