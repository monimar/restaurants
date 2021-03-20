import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Restaurants from '../screens/restaurants/Restaurants'
import AddRestaurants from '../screens/restaurants/AddRestaurant'
import AddRestaurant from '../screens/restaurants/AddRestaurant'

const Stack = createStackNavigator()

export default function RestaurantsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="restaurants"
                component={Restaurants}
                options={{ title: "Restaurantes"}}
            />
            <Stack.Screen
                name="add-restaurant"
                component={AddRestaurant}
                options={{ title: "Crear Restaurante"}}
            />
        </Stack.Navigator>
        


    )
}
