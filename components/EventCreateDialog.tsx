import * as React from 'react';
import * as firebase from 'firebase';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import moment from 'moment';
import { Event } from '../backend/Event';
import PopupDialog from 'react-native-popup-dialog';
import DateTimePicker from 'react-native-modal-datetime-picker';

export type Props = {
  createEvent: (event: Event) => void,
  onDismiss: () => void,
  show: boolean,
}
type State = {
    title: string,
    datetime: firebase.firestore.Timestamp,
    location: string,
    showTimePicker: boolean,
}
export class EventCreateDialog extends React.Component<Props, State> {
  private popupDialog: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      title: '',
      datetime: firebase.firestore.Timestamp.fromDate(new Date()),
      location: '',
      showTimePicker: false,
    }
  }
  _showDateTimePicker = () => this.setState({ showTimePicker: true });

  _hideDateTimePicker = () => this.setState({ showTimePicker: false });

  _handleDatePicked = (time: any) => {
    this.setState({ datetime: time });
    this._hideDateTimePicker();
  }
  render() {
    const { title, datetime, location } = this.state;
    const timeDisplay = moment(datetime.toDate()).format('LT');
    return (
      <PopupDialog
        show={this.props.show}
        onDismissed={this.props.onDismiss}
      >
        <View
          style={[styles.createEventModal]}
        >
          <Text>Title</Text>
          <TextInput
            editable = {true}
            maxLength = {40}
            onChangeText={(title) => this.setState({title})}
            value={title}
            placeholder="Coffee"
          />
          <Text>Time</Text>
          <Text>{timeDisplay}</Text>
          <Button title={'Pick Time'} onPress={this._showDateTimePicker}></Button>
          <Text>Location</Text>
          <TextInput
            editable = {true}
            maxLength = {40}
            onChangeText={(location) => this.setState({location})}
            value={location}
            placeholder="Somewhere on earth"
          />
          <Button
            title="Save event"
            onPress={() => {
              const event = new Event(this.state.title, this.state.datetime, this.state.location);
              this.props.createEvent(event)
            }}
          />
        </View>
        <DateTimePicker
          isVisible={this.state.showTimePicker}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode={'time'}
          is24Hour={false}
        />
      </PopupDialog>
    );
  }
}

const styles = StyleSheet.create({
  createEventModal: {
    position: 'relative'
  }
 });
