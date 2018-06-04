import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Backend } from './Backend'
import { Repository } from './Repository'
import { Event } from './Event'

const repository = new Repository();
const backend = new Backend(repository);

export default class App extends React.Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.ts to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Button title="Create event" onPress={this.createEvent} />
      </View>
    );
  }
  createEvent() {
    backend.postNewEvent(new Event("text"))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
