import React, {useState} from 'react'
import { StyleSheet, Text, View, ScrollView, Alert,Dimensions } from 'react-native'
import { Avatar, Button, Icon, Input, Image } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'
import { map, size, filter } from 'lodash'

import { loadImageFromGallery } from '../../utils/helpers'

const widthScreen = Dimensions.get("window").width

export default function AddRestaurantForm( toasRef, setLoading, navigation ) {
    const [formData, setFormData]= useState(defaultFormValues())
    const [errorName, setErrorName] = useState(null)
    const [errorDescription, setErrorDescription] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorAdress, setErrorAdress] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)
    const [imagesSelected, setImagesSelected] = useState([])
    

    const addRestaurant = () => {
        console.log("")
        console.log("Fuck yeah...")
    }
    
    return (
        <ScrollView style={styles.viewContainer}>
            <ImageRestaurant 
                imageRestaurant={imagesSelected[0]}
            />
            <FormAdd
                formData={formData}
                setFormData={setFormData}
                errorName={errorName}
                errorDescription={errorDescription}
                errorEmail={errorEmail}
                errorAdress={errorAdress}
                errorPhone={errorPhone}
            />
            <UploadImage
                toasRef={toasRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
            />
            <Button
                title="Crear Restaurante"
                onPress={addRestaurant}
                buttonStyle={styles.btnAddRestaurant}
            />
        </ScrollView>
    )
}

function ImageRestaurant({ imageRestaurant }) {
    return (
        <View style={styles.viewPhoto}>
            <Image
                style={{ width: widthScreen, height: 200}}
                source={ 
                    imageRestaurant ? {uri: imageRestaurant}
                    : require("../../assets/no-image.png")
                }
            />
        </View>
    )
}


function UploadImage({ toasRef, imagesSelected, setImagesSelected }){
    const imageSelected = async() => {
        const response = await loadImageFromGallery([4, 3])
        if (!response.status){
            toasRef.current.show("No has seleccionado ninguna imagen.", 3000)
            return
        }
        setImagesSelected([...imagesSelected, response.image])
    }

    const removeImage = (image) => { 
        Alert.alert(
            "Eliminar Imagen",
            "¿Estás seguro que quieres eliminar la imagen?",
            [
                {
                    text:"No",
                    style: "cancel"

                },
                {
                    text:"Si",
                    onPress: () => {
                        setImagesSelected(
                            filter(imagesSelected, (imageUrl) => imageUrl !== image)

                        )
                    }
                }

            ],
            { cancelable: false}
            
        )
    }

    return (
        <ScrollView
            horizontal
            style={styles.viewImage}
        >
            {
                size(imagesSelected ) <10 && (
                <Icon 
                    type="material-community"
                    name="camera"
                    color= "#7a7a7a"
                    containerStyle={styles.containerIco}
                    onPress={imageSelected}
                />  
                )
            }
            
            {
                map(imagesSelected, (imageRestaurant,index) => (
                    <Avatar
                        key={index}
                        style={styles.miniatureStyle}
                        source={{ uri: imageRestaurant }}
                        onPress={() => removeImage(imageRestaurant)}
                    />
                ))
            }
        </ScrollView>

    )
}

function FormAdd( {formData, setFormData, errorName, errorDescription, errorEmail, errorAdress, errorPhone}) {
    const[country,setCountry] = useState("CO")
    const[callingCode,setCallingCode] = useState("57")
    const[phone,setPhone] = useState("")
    
    const onChange = (e, type) => {
        setFormData({ ...formData, [type] : e.nativeEvent.text})

    }

    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del restaurante..."
                defaultValue={formData.name}
                onChange={(e) => onChange(e, "name") }
                errorMessage={errorName}
            />
            <Input
                placeholder="Dirección del restaurante..."
                defaultValue={formData.adress}
                onChange={(e) => onChange(e, "adress") }
                errorMessage={errorAdress}
            />
            <Input
                keyboardType="email-adress"
                placeholder="Email del restaurante"
                defaultValue={formData.email}
                onChange={(e) => onChange(e, "email") }
                errorMessage={errorEmail}
            />
            <View style={styles.phoneView}>
                <CountryPicker
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    containerSty={styles.countryPicker}
                    countryCode={country}
                    onSelect={(country) => {
                        setFormData({ 
                            ...formData, 
                            "country":country.cca2, 
                            "callingCode": country.callingCode[0]
                        })
                        setCountry(country.cca2)
                        setCallingCode(country.callingCode[0])
                    }}
                />
                <Input
                    placeholder="WhatsApp del restaurante..."
                    keyboardType="phone-pad"
                    containerStyle={styles.inputPhone}
                    defaultValue={formData.phone}
                    onChange={(e) => onChange(e, "phone") }
                    errorMessage={errorPhone}
                />
            </View>
            <Input
                    placeholder="Descripcion del restaurante..."
                    multiline
                    containerStyle={styles.textArea}
                    defaultValue={formData.descripction}
                    onChange={(e) => onChange(e, "description") }
                    errorMessage={errorDescription}
            />
        </View>
    )
}

const defaultFormValues = () =>{
    return {
        name:"",
        descripction: "",
        email: "",
        phone: "",
        adress: "",
        country: "CO",
        callingCode: "57"
    }

}

const styles = StyleSheet.create({
    viewContainer:{
        height: "100%"
    },
    viewForm:{
        marginHorizontal: 10,
    },
    textArea:{
        height:100,
        width: "100%"
    },
    phoneView:{
        width: "80%",
        flexDirection: "row"
    },
    inputPhone: {
        width: "80%"
    },
    btnAddRestaurant:{
        margin: 20,
        backgroundColor: "#442484"
    },
    viewImage: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 30,
    },
    containerIco: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10
    }, 
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20
    }
})
