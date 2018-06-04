import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Event } from '../backend/Event';


export type Props = {
    event: Event;
}

export class EventCard extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={[styles.container]}>
                <Text>{this.props.event.name}</Text>
                <Text>{this.props.event.datetime}</Text>
                <Text>{this.props.event.location}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        margin: 8,
        flex: 1,
        // width: '100%',
        alignSelf: 'stretch',
        padding: 20,
    },
});