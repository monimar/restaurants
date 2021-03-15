import React, { useState }from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { map } from 'lodash';
import { Icon, ListItem } from 'react-native-elements';

import Modal from '../Modal';

export default function AccountOptions({user, toasRef}) {
    const menuOptions = generateOptions();
    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)

    return (
        <View>
            {
                map(menuOptions, (menu, index) =>(
                    <ListItem
                        key={index}
                        style={styles.menuItem}
                        onPress={menu.onPress}
                    >
                        <Icon
                            type="material-community"
                            name={menu.iconNameLeft}
                            color={menu.iconColorLeft}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{menu.title}</ListItem.Title>
                        </ListItem.Content>
                        <Icon
                            type="material-community"
                            name={menu.iconNameRight}
                            color={menu.iconColorRight}
                        />
                    </ListItem>
                ))
            }
            <Modal isVisible={showModal} setVisible={setShowModal}/>
            
        </View>
    )
}

const generateOptions= () => {
    return [
        {
            title: "Cambiar Nombres y Apellidos",  
            iconNameLeft: "account-circle", 
            iconColorLeft: "#a7bfd3",
            iconNameRight: "chevron-right", 
            iconColorRight: "#a7bfd3",
            onPress: () => selectedComponenet("displayName")
        },
        {
            title: "Cambiar Email",  
            iconNameLeft: "at", 
            iconColorLeft: "#a7bfd3",
            iconNameRight: "chevron-right",     
            iconColorRight: "#a7bfd3",
            onPress: () => selectedComponenet("email")
    
        },
        {
            title: "Cambiar Contraseña",  
            iconNameLeft: "lock-reset", 
            iconColorLeft: "#a7bfd3",
            iconNameRight: "chevron-right", 
            iconColorRight: "#a7bfd3",
            onPress: () => selectedComponenet("password")
    
        }
]
}

const selectedComponenet = (key) => {
    
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#a7bfd3"
    }
})
