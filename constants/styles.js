import {StyleSheet} from "react-native";
import colors from "./colors";
import {DefaultTheme} from "react-native-paper";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: colors.text,
    },
    line: {
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    button: {
        ...DefaultTheme,
        roundness: 12,
        padding: 2,
        version: 3,
        colors: {
            ...DefaultTheme.colors,
            primary: colors.primary,
            secondary: colors.secondary,
            tertiary: colors.tertiary
        },
    },
});
