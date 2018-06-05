
import * as firebase from 'firebase';
export class Event {
    constructor(public name: string, public datetime: firebase.firestore.Timestamp, public location: string) {

    }
}