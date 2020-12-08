import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import ColoredButton from '../components/ColoredButton';
import { requestOID, signInAsync, providers, getCachedAuthAsync } from '../functionality/OAuth';
import { globalStyle } from '../GlobalStyle';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [inputStyle, setInputStyle] = useState(globalStyle.nuetralTextInput);

    return(
      <View style={globalStyle.centerView}>
        <View style={globalStyle.form}>
            <TextInput 
                style={inputStyle}
                placeholder="Username"
                onChangeText={text => onChangeUsername(text, setUsername, setInputStyle)}
                value={username}
            />
            <ColoredButton
                text="Login"
                onPress={() => login(username)}
                color="green"
            />
            <ColoredButton
                text="Create Account"
                onPress={() => createAccount(username)}
                color="blue"
            />
        </View>
      </View>
    )
}

function onChangeUsername(username, setUsername, setInputSyle) {
    setUsername(username);
    
    if (username.length > 0 && username.length < 4) {
        setInputSyle(globalStyle.badTextInput);
    } else {
        setInputSyle(globalStyle.nuetralTextInput);
    }
}

async function login(username) {
    // check if username is taken
    console.log(await requestOID(await signInAsync(providers.google), providers.google));
}

async function createAccount(username) {
    console.log(`Creating account as ${username}`);
}