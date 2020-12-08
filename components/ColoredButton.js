import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function ColoredButton({ text, onPress, color }) {
    let styles = StyleSheet.create({
        view: {
            width: "100%",
            backgroundColor: color,
            borderRadius: 5,
            borderColor: "black",
            borderWidth: 1,
            marginVertical: 5,
        },
    
        touchable: {
            width: "100%",
            padding: 5,
        },
    
        text: {
            fontSize: 25,
            textAlign: "center",
            color: "black"
        }
    })
    
    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.touchable} onPress={onPress}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}