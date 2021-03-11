import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import Loading from '../../components/Loading'

export default function UserGuest() {
    return (
        <ScrollView 
            centerContent
            style={styles.viewBody}
        > 
            <Image
                source={require("../../assets/restaurant-logo.png")}
                resizeMode="contain"
                style={styles.image}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        marginHorizontal: 30
    },
    image:{
        height:300,
        widht:"100%",
        marginBottom: 10,
        textAling:"center"
    }
})
