import * as React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { Notifications } from 'expo';
import { EventService } from './backend/EventService'
import { Repository } from './backend/Repository'
import { Event } from './backend/Event'
import { EventList } from './components/EventList';
import PopupDialog from 'react-native-popup-dialog';

const repository = new Repository();
const backend = new EventService(repository);

type State = {
    events: Event[],
    title: string,
    time: string,
    location: string
}

export default class App extends React.Component<{}, State> {
  private popupDialog: any;

  constructor(props: any) {
    super(props);

    this.state = {
        events: [],
        title: null,
        time: null,
        location: null,
		notification: {}
    };

    repository.onSnapshot((events) => {
      this.setState({
        events,
      });
    });
  }

  componentDidMount() {
    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    this.setState({notification: notification});
  };

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
                <TextInput
                    editable = {true}
                    maxLength = {40}
                    onChangeText={(title) => this.setState({title})}
                    value={this.state.title}
                    placeholder="Coffee"
                />
                <Text>Time</Text>
                <TextInput
                    editable = {true}
                    maxLength = {40}
                    onChangeText={(time) => this.setState({time})}
                    value={this.state.time}
                    placeholder="2:00pm"
                />
                <Text>Location</Text>
                <TextInput
                    editable = {true}
                    maxLength = {40}
                    onChangeText={(location) => this.setState({location})}
                    value={this.state.location}
                    placeholder="Somewhere on earth"
                />
              <Button
                title="Save event"
                onPress={() => this.createEvent()}
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
    backend.postNewEvent(new Event(this.state.title, this.state.time, this.state.location));
    this.popupDialog.dismiss();
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
