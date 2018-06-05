import * as React from 'react';
import moment from 'moment';
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
        const { name, datetime, location } = this.props.event;
        const timeDisplay = moment(datetime.toDate()).format('LT');
        return (
            <View style={[styles.container]}>
                <Text>{name}</Text>
                <Text>{timeDisplay}</Text>
                <Text>{location}</Text>
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