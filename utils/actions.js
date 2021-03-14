import { firebaseApp } from './firebase'
import firebase from 'firebase'
require('firebase/firestore')

const db = firebase.firestore(firebaseApp)

export const isUserLogged = () => {
    let isLogged = false
    firebase.auth().onAuthStateChanged((user) => {
        user !== null && (isLogged = true)
    })
    return isLogged
}

export const getCurrentUser = () => {
    return firebase.auth().currentUser
}

export const closeSession = () => {
    return firebase.auth().signOut()
}

export const registerUser = async(email,pasword) => {
    const result = { statusResponse: true, error: null}
    try {
        await firebase.auth().createUserWithEmailAndPassword(email,pasword)
    } catch (error) {
        result.statusResponse = false
        result.error = "Este correo ya ha sido registrado"
    }
    return result
}

export const loginWithEmailAndPassword = async(email,pasword) => {
    const result = { statusResponse: true, error: null}
    try {
        await firebase.auth().signInWithEmailAndPassword(email,pasword)
    } catch (error) {
        result.statusResponse = false
        result.error = "Usuario o contraseña invalida"
    }
    return result
}

