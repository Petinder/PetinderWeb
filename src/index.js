import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//Credenciales de nuestra APP
firebase.initializeApp({
    apiKey: "AIzaSyAjQ9NwlAXj-C4Cj3MAw9s22asP91EGP7I",
    authDomain: "petinder-fc7b6.firebaseapp.com",
    databaseURL: "https://petinder-fc7b6.firebaseio.com",
    projectId: "petinder-fc7b6",
    storageBucket: "petinder-fc7b6.appspot.com",
    messagingSenderId: "331629175639"
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
