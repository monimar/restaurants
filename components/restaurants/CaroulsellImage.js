import React from 'react'
import { render } from 'react-dom'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { Image } from 'react-native-elements'

export default function CaroulsellImage({ images, height, width }) {

    const renderItem = ({ item }) => { 
        
        return (
            <Image
            style={{ width, height }}
            PlaceholderContent = {<ActivityIndicator color="#fff"/>}
            source={{ uri: item }}
            />
        )
    }
    return (
        <Caroulsell
            layout={"default"}
            data={images}
            sliderWidth={width}
            itemHeigt={height}
            renderItem={renderItem}
        />
        
    )
}

const styles = StyleSheet.create({})
