import {Text, View, StyleSheet, ScrollView, Image} from "react-native";
import {useEffect, useState} from "react";
import Toast from "react-native-toast-message";

import axios from "axios";

import Car from "../components/Car";
import {styles as mainStyles} from "../constants/styles";
import colors from "../constants/colors";

import tesla from '../assets/Tesla.jpg'

let AvailableCars = ({navigation}) => {
    let [cars, setCars] = useState([])

    useEffect(() => {
        axios
            .get('http://192.168.1.3:3000/cars')
            .then( response => {
                if (response.status === 200){
                    setCars(response.data)
                }else {
                    console.log('response')
                    console.log(response)
                }
            })
            .catch( err => console.log(err))
    }, [])

    const renderCars = () => {
        return (
            <View style={mainStyles.container}>
                <ScrollView ShowVerticalScrollIndicator={false}>
                    {cars.map((car, index) => {
                        return (
                            <Car
                                car={car}
                                index={index}
                                key={index}
                                navigation={navigation}
                                onHide={hideCar}
                            />
                        )
                    })}
                </ScrollView>
            </View>
        )
    }

    let noCarsAvailable = () => {
        return (
            <View style={styles.emptyWrapper}>
                <Image style={styles.emptyImage} source={tesla} />
                <Text style={styles.emptyViewText}>No cars added </Text>
            </View>
        )
    }

    const hideCar = (index) => {
        let temp = [...cars]
        temp.splice(index, 1)
        setCars([...temp])
        Toast.show({
            type: 'success',
            text1: 'hidden'
        })
    }

    return (
        <>
            {cars.length > 0 ? (
                renderCars()
            ) : (
                noCarsAvailable()
            )}
        </>
    )

}

const styles = StyleSheet.create({
    emptyWrapper: {
        height: "100%",
        backgroundColor: colors.background,
    },
    emptyImage: {
        alignSelf: "center",
        resizeMode: "cover",
        position: 'absolute',
        zIndex: -1,
    },
    emptyViewText: {
        ...mainStyles.text,
        textShadowColor: colors.textShadow,
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        padding: 20,
        fontWeight: 'bold',
        fontSize: 45,
        zIndex: 1,
    },
})

export default AvailableCars
