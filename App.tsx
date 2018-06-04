import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { EventService } from './backend/EventService'
import { Repository } from './backend/Repository'
import { Event } from './backend/Event'
import { EventList } from './components/EventList';
import PopupDialog from 'react-native-popup-dialog';

const repository = new Repository();
const backend = new EventService(repository);

type State = {
  events: Event[];
}

export default class App extends React.Component<{}, State> {
  private popupDialog: any;

  constructor(props: any) {
    super(props);

    this.state = {
      events: [],
    };

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
            onPress={() => {
              this.popupDialog.show();
              // this.popupDialog = ref;
            }}
          />
        </View>

          <PopupDialog
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          >
            <View
              style={[styles.createEventModal]}
            >
              <Text>Title</Text>
              <Text>Date</Text>
              <Text>Time</Text>
              <Text>Location</Text>
              <Button
                title="Save event"
                onPress={() => {
                  this.createEvent();
                  this.popupDialog.dismiss();
                }}
              />
            </View>
          </PopupDialog>
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
  createEventModal: {
    position: 'relative'
  }
});