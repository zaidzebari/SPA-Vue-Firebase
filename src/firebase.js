import { firebase } from '@firebase/app' //var firebase = require('firebase/app'); //import * as firebase from 'firebase/app'
import '@firebase/auth' //import 'firebase/auth'
import '@firebase/firestore' //import 'firebase/firestore'


// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "4",
    appId: ""
}
firebase.initializeApp(firebaseConfig)
//  databaseURL: '',


// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
    db,
    auth,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}