import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDf1gxpo0WBAaLUW8eub9VLZLTt5F8SSwM",
    authDomain: "projeto-park.firebaseapp.com",
    projectId: "projeto-park",
    storageBucket: "projeto-park.appspot.com",
    messagingSenderId: "831153940512",
    appId: "1:831153940512:web:b85a4ffbfe09165d77f445"
  };

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

const grCollection = db.collection('gerenciamento')
const htCollection = db.collection('historico')


export {
    db , auth , grCollection, htCollection
}