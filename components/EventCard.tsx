import * as React from 'react';
import { View, Text } from 'react-native';
import { Event } from '../Event';


export type Props = {
    event: Event;
}

export class EventCard extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>{this.props.event.name}</Text>
                <Text>Description</Text>
            </View>
        );
    }
}