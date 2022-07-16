import {Text, View, StyleSheet} from "react-native";
import {useState} from "react";
import {Button, Dialog, Paragraph, Portal, Provider, TextInput} from "react-native-paper";

import {styles as mainStyles} from "../constants/styles";
import colors from "../constants/colors";

export const Contact = ({navigation, route}) => {

    const [contactInfo, setContactInfo] = useState({
        name: '',
        phone: '',
        message: '',
    })
    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState('please fill all fields')

    const sendMessage = () => {
        if (contactInfo.name === '' || contactInfo.phone === '' || contactInfo.message === '') {
            setMessage('please fill all the fields')
            dialog(message)
        } else {
            navigation.navigate("Cars")
            setMessage('message sent')
            dialog(message)
            setContactInfo({
                name: '',
                phone: '',
                message: '',
            })
        }
    }

    const hideDialog = () => setVisible(false)

    const dialog = (message) => {
        return (
            <Provider>
                <View>
                    <Portal>
                        <Dialog visible={visible} onDismiss={hideDialog}>
                            <Dialog.Title>Alert</Dialog.Title>
                            <Dialog.Content>
                                <Paragraph>{message}</Paragraph>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={hideDialog}>Done</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </View>
            </Provider>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Send us a message ! </Text>
            <TextInput label="Enter your name here"
                       style={styles.textInput}
                       type={'outlined'}
                       value={contactInfo.name}
                       left={<TextInput.Icon name="account"/>}
                       onChangeText={text =>
                           setContactInfo({
                               ...contactInfo,
                               name: text,
                           })}
            />
            <TextInput label="Enter phone number here"
                       style={{...styles.textInput, ...{height: 30}}}
                       type={'outlined'}
                       value={contactInfo.phone}
                       left={<TextInput.Icon name="phone"/>}
                       render={props =>
                           <TextInput {...props} keyboardType={'numeric'}/>
                       }
                       onChangeText={text =>
                           setContactInfo({
                               ...contactInfo,
                               phone: text,
                           })}
            />
            <TextInput label="Enter your message"
                       style={{...styles.textInput, ...{height: 80}}}
                       type={'outlined'}
                       value={contactInfo.message}
                       left={<TextInput.Icon name="message-draw"/>}
                       onChangeText={text =>
                           setContactInfo({
                               ...contactInfo,
                               message: text,
                           })}
            />
            <Button theme={mainStyles.button} icon="cart" mode="contained" onPress={() => sendMessage()}>
                Send
            </Button>
            {dialog(message)}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        backgroundColor: colors.background,
        height: "100%",
        padding: 15,
    },
    title: {
        ...mainStyles.text,
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 25,
        marginVertical: 30
    },
    textInput: {
        borderRadius: 15,
        marginVertical: 5
    },
})
