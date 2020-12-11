import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import ColoredButton from '../components/ColoredButton';
import { requestOID, signInAsync, providers, getCachedAuthAsync } from '../functionality/OAuth';
import { backendUrl, globalStyle } from '../Globals';

var axios = require('axios');
var qs = require('qs')

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
                onPress={async () => {
                    if(await login(username)) {
                        console.log("Account created");
                    } else {
                        console.log("Failed to create account");
                    }
                }}
                color="green"
            />
            <ColoredButton
                text="Create Account"
                onPress={async () => {
                    if(await createAccount(username)) {
                        console.log("Account created");
                    } else {
                        console.log("Failed to create account");
                    }
                }}
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
    return requestOID(await signInAsync(providers.google), providers.google)
    .then(oid => {
        if (oid) {
            var data = qs.stringify({
                'username': username,
                'oid': oid 
            });
            var config = {
                method: 'get',
                url: `${backendUrl}/users`,
                headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            };
               
            axios(config)
            .then(function (response) {
                return response.data._id ? true : false;
            })
            .catch(function (error) {
                console.log(error);
            });
        } else {
            return false
        }
    })    
}

async function createAccount(username) {
    return requestOID(await signInAsync(providers.google), providers.google)
    .then(oid => {
        if (oid) {
            var data = qs.stringify({
                'username': username,
                'oid': oid
            });
            var config = {
                method: 'post',
                url: `${backendUrl}/users`,
                headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            };
            
            return axios(config)
            .then(function (response) {
                return response.data._id ? true : false;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            });
        } else {
            return false;
        }
    })
}