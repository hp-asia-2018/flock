import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { EventService } from './backend/EventService'
import { Repository } from './backend/Repository'
import { Event } from './backend/Event'
import { EventList } from './components/EventList';

const repository = new Repository();
const backend = new EventService(repository);

type State = {
  events: Event[];
}

export default class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      events: [],
    }

    repository.onSnapshot((events) => {
      this.setState({
        events,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderList()}

        <View
          style={[styles.createButton]}
        >
          <Button
            title="Create event"
            onPress={this.createEvent}
          />
        </View>
      </View>
    );
  }

  renderList() {
    if (!this.state.events.length) {
      return (
        <Text>No Events</Text>
      );
    }

    return (
      <EventList events={this.state.events} />
    )
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

  createButton: {
    position: 'absolute',
    bottom: 50,
    right: 50,
  }
});
