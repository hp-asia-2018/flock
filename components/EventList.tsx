import * as React from 'react';
import { ListView } from 'react-native';
import { Event } from '../Event';
import { EventCard } from './EventCard';

export type Props = {
  events: Event[],
}

export type State = {
  ds: any;
}

export class EventList extends React.Component<Props, State> {
  private ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  constructor(props: Props) {
    super(props);

    this.state = {
      ds: this.ds.cloneWithRows(props.events),
    }
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    return {
      ds: state.ds.cloneWithRows(props.events),
    }
  }

  render() {
    return (
      <ListView
        dataSource={this.state.ds}
        renderRow={(r) => <EventCard event={r} />}
      />
    );
  }
}