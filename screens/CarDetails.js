import {Image, Text, View, StyleSheet} from "react-native";

import {styles as mainStyles} from '../constants/styles'
import colors from "../constants/colors";
import {Button} from "react-native-paper";

let CarDetails = ({navigation, route}) => {
    const { car } = route.params

    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: car.image,
                }}
                style={styles.image}
            />
            <Text style={styles.descriptionHeader}> Description: </Text>
            <View style={mainStyles.line}/>
            <Text style={styles.description}> {car.description} </Text>
            <Button theme={mainStyles.button} icon="cart" mode="contained" onPress={() => console.log('buy')}>
                Buy
            </Button>
            <Button theme={mainStyles.button} icon="camera" mode="outlined" onPress={() => console.log('rent')}>
                Rent
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      height: "100%",
      paddingHorizontal: 15,
    },
    image: {
        height: 200,
        width: "100%",
        alignSelf: "center",
        resizeMode: "contain",
    },
    descriptionHeader: {
        ...mainStyles.text,
        fontSize: 40,
        paddingBottom: 10,
    },
    description: {
        ...mainStyles.text,
        fontSize: 20,
        alignSelf: "center",
        padding: 15,
    },
})

export default CarDetails
