import React, {useState, useEffect} from 'react'
import { Alert, StyleSheet, Text, ScrollView, Dimensions } from 'react-native'
import { Rating } from 'react-native-elements'

import Loading from '../../components/Loading'
import CaroulselImage from '../../components/CaroulselImage'
import { getDocumentById } from '../../utils/actions'
import { View } from 'react-native'


const widthScreen = Dimensions.get("window").width

export default function Restaurant({ navigation, route }) {
    const { id, name} = route.params
    const [restaurant, setRestaurant] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)

    navigation.setOptions({ title: name })

    useEffect(() => {
        (async() => {
            const response = await getDocumentById("restaurants", id)
            if (response.statusResponse){
                setRestaurant(response.document)
        } else {
            setRestaurant({})
            Alert.alert("Ocurrio un problema cargando el restaurante. Intente más tarde.")
        }
        })()
    }, [])

if (!restaurant){
    return <Loading isVisible={true} text="Cargando..."/>
}

return (
        <ScrollView style={styles.viewBody}>
            <CaroulselImage
            images={restaurant.images}
            height={250}
            width={widthScreen}
            activeSlide={activeSlide}
            setActiveSlide={setActiveSlide}
            />
            <TitleRestaurant
                name={restaurant.name}
                description={restaurant.description}
                rating={restaurant.rating}
            />
        </ScrollView>
    )
}

function TitleRestaurant ({ name, description, rating }){
    return(
        <View style={styles.viewRestaurantTitle}>
            <View style={styles.viewRestaurantContainer}>
                <Text style={styles.nameRestaurant}>{name}</Text>
                <Rating
                    style={styles.rating}
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(rating)}
                />
            </View>
            <Text style={styles.descriptionRestaurant}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex: 1
    },
    viewRestaurantTitle: {
        padding: 15,
    },
    viewRestaurantContainer:{
        flexDirection: "row"
    },
    descriptionRestaurant: {
        marginTop: 8,
        color: "gray",
        textAlign: "justify"
    },
    rating: {
        position: "absolute",
        right: 0
    },
    nameRestaurant: {
        fontWeight: "bold"
    },
})
