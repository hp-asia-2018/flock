
import * as firebase from 'firebase';
require('firebase/firestore');
import { Event } from './Event'

export class Repository {
    private db: firebase.firestore.Firestore
    
    constructor() {
        var config = {
            apiKey: "AIzaSyCpD25V_AO7uzF6fu3QdX9Q_YmLdTq6wyc",
            authDomain: "flock-532e5.firebaseapp.com",
            databaseURL: "https://flock-532e5.firebaseio.com",
            projectId: "flock-532e5",
            storageBucket: "flock-532e5.appspot.com",
            messagingSenderId: "355951263214"
        };
        
        firebase.initializeApp(config);
        this.db = firebase.firestore();
        this.db.settings({
            timestampsInSnapshots: true
        });
    }

    createEvent(event: Event) {
        this.db.collection("events").add(Object.assign({}, event))
        .then(function(docRef: firebase.firestore.DocumentReference) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error: any) {
            console.error("Error adding document: ", error);
        });
    }
}