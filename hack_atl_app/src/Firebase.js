import * as firebase from 'firebase';

firebase.initializeApp({
    databaseURL: "https://hackatl-77712.firebaseio.com/",
    projectId: "hackatl-77712"
})

export default firebase;