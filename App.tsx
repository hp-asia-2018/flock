import * as React from 'react';

import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { EventService } from './backend/EventService'
import { Repository } from './backend/Repository'
import { Event } from './backend/Event'
import { EventList } from './components/EventList';
import { EventCreateDialog } from './components/EventCreateDialog';

const repository = new Repository();
const backend = new EventService(repository);

type State = {
    events: Event[],
    showCreateDialog: boolean,
}

export default class App extends React.Component<{}, State> {

  constructor(props: any) {
    super(props);

    this.state = {
      events: [],
      showCreateDialog: false,
    };
    this.createEvent = this.createEvent.bind(this);
    repository.onSnapshot((events) => {
      this.setState({
        events: events.sort((eventA: Event, eventB: Event) => 
          eventA.datetime.toMillis() - eventB.datetime.toMillis()),
      });
    });
  }

  render() {
    return (

      <View style={styles.container}>
        {this.renderList()}
        <EventCreateDialog
          show={this.state.showCreateDialog}
          createEvent={this.createEvent}
          onDismiss={() => this.setState({ showCreateDialog: false }) }
        />
        <View
          style={[styles.createButton]}
        >
          <Button
            title="Create event"
            onPress={() => {
              this.setState({ showCreateDialog: true });
              // this.popupDialog = ref;
            }}
          />
          

        </View>

      </View>
    );
  }
  createEvent(event: Event) {
    backend.postNewEvent(event);
    this.setState({ showCreateDialog: false })
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

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f6f6',
  },

  createButton: {
    position: 'absolute',
    bottom: 50,
    right: 50,
  },
  
});