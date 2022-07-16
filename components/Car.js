import {Card, Paragraph, Title, Button, Avatar} from "react-native-paper";
import {StyleSheet, Image, View, Text, TouchableNativeFeedback, Alert} from "react-native";
import Toast from 'react-native-toast-message'

import {Ionicons} from "@expo/vector-icons";
import colors from "../constants/colors";
import {styles as mainStyles} from "../constants/styles";

const Car = (props) => {

    const { car, navigation } = props;

    const confirmDelete = () =>
        Alert.alert("Remove Car Warning", "Do you want to hide this car?", [
            {
                text: "Cancel",
                onPress: () => {
                    Toast.show({
                        type: 'error',
                        text1: 'not deleted'
                    })
                },
                style: "cancel",
            },
            { text: "OK", onPress: () => props.onHide(props.index) },
        ]);

    return (
        <View style={[styles.carWrapper,
                        car.status === 'new'? styles.newCarWrapperColor : styles.usedCarWrapperColor]}>
            <View style={styles.car}>
                <Text style={[styles.model,
                    car.status === 'new'? styles.newCarModel : styles.usedCarModel]}>{car.model}</Text>
                <Image
                    source={{
                        uri: car.brand,
                    }}
                    style={styles.brand}
                />
                <Image
                    source={{
                        uri: car.image,
                    }}
                    style={styles.carImage}
                />

                <TouchableNativeFeedback
                    onPress={() => {
                        confirmDelete();
                    }}
                >
                    <View
                        style={{
                            ...styles.buttonWrapper,
                            ...{ top: 25, backgroundColor: colors.error },
                        }}
                    >
                        <Text style={styles.buttonText}>
                            {" "}
                            <Ionicons name={"remove-circle"} color={colors.text} size={26} />{" "}
                        </Text>
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback
                    onPress={() => {
                        navigation.navigate("CarDetails", {
                            car: car
                        });
                    }}
                >
                    <View style={{ ...styles.buttonWrapper, ...{ start: 0 } }}>
                        <Text style={styles.buttonText}> View </Text>
                    </View>
                </TouchableNativeFeedback>

                <View style={styles.infoWrapper}>
                    <Text style={styles.carTitle}>{`${car.name} (${car.status})`}</Text>
                    <Text style={styles.carDescription} numberOfLines={2}>
                        {car.description}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    carWrapper: {
        marginVertical: 5,
        marginHorizontal: 10,
        borderWidth: 3,
        borderRadius: 7,
        position: "relative",
        overflow: "hidden",
    },
    newCarWrapperColor: {
        borderColor: colors.new,
    },
    usedCarWrapperColor: {
        borderColor: colors.used,
    },
    car: {
        position: "relative",
    },
    carImage: {
        width: "100%",
        height: 200,
        resizeMode: "contain",
    },
    carTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.primary,
        marginBottom: 5,
    },
    carDescription: {
        fontSize: 15,
        color: colors.text,
    },
    infoWrapper: {
        paddingTop: 0,
        paddingBottom: 5,
        paddingHorizontal: 5,
    },
    model: {
        fontSize: 15,
        color: colors.text,
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 5,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 0,
        textAlign: "center",
        position: "absolute",
        top: 0,
        end: 0,
        zIndex: 1,
    },
    newCarModel: {
        backgroundColor: colors.new,
    },
    usedCarModel: {
        backgroundColor: colors.used,
    },
    brand: {
        backgroundColor: colors.text,
        width: 60,
        height: 60,
        position: "absolute",
        top: 0,
        start: 0,
        zIndex: 1,
        resizeMode: "contain",
    },
    buttonWrapper: {
        backgroundColor: colors.primary,
        position: "absolute",
        end: 0,
        zIndex: 1,
        top: 170,
        minWidth: 30,
        minHeight: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        ...mainStyles.text,
        fontSize: 20,
    },
});


export default Car
