import { StyleSheet } from 'react-native';

export const globalStyle = StyleSheet.create({
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "25%",
    },

    title: {
        textAlign: "center",
        fontSize: 40,
        padding: 10,
    },

    form: {
        alignContent: "center",
        width: "100%",
        paddingHorizontal: "15%",
        paddingVertical: 5,
    },

    nuetralTextInput: {
        textAlign: "center",
        fontSize: 25,
        padding: 5,
        width: "100%",
        borderColor: "#999",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 5,
    },

    badTextInput: {
        textAlign: "center",
        fontSize: 25,
        padding: 5,
        width: "100%",
        borderColor: "red",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 5,
    },
})