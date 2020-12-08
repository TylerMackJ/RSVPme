import * as AppAuth from 'expo-app-auth';
import { AsyncStorage } from 'react-native';

export const providers = {
    google: {
        storageKey: '@RSVPme:GoogleOAuthKey',
        oidURL: "https://openidconnect.googleapis.com/v1/userinfo",
        config: {
            issuer: 'https://accounts.google.com',
            scopes: ['openid'],
            clientId: '910434515209-t5qe8ddpkoajdf2h7vd9ratsflaolgaj.apps.googleusercontent.com'
        }
    }
}

export async function signInAsync(provider) {
    let authState = await AppAuth.authAsync(provider.config);
    await cacheAuthAsync(authState, provider.storageKey);
    return authState;
}

async function cacheAuthAsync(authState, storageKey) {
    return await AsyncStorage.setItem(storageKey, JSON.stringify(authState));
}

export async function getCachedAuthAsync(provider) {
    let value = await AsyncStorage.getItem(provider.storageKey);
    let authState = JSON.parse(value);

    if (authState) {
        if (checkIfTokenExpired(authState)) {
            return refreshAuthAsync(authState, provider);
        } else {
            return authState;
        }
    }
    
    return null;
}

function checkIfTokenExpired({ accessTokenExpirationDate }) {
    return new Date(accessTokenExpirationDate) < new Date();
}

async function refreshAuthAsync({ refreshToken }, provider) {
    let authState = await AppAuth.refreshAsync(provider.config, refreshToken);
    await cacheAuthAsync(authState, provider.storageKey);
    return authState
}

export async function signOutAsync({ accessToken }, provider) {
    try {
        await AppAuth.revokeAsync(provider.config, {
            token: accessToken,
            isClientIdProvided: true,
        });
        await AsyncStorage.removeItem(StorageKey);
        return null;
    } catch(e) {
        console.log(`Failed to revoke token: ${e.message}`);
    }
}

export async function requestOID(authState, provider) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authState['accessToken']}`);
    
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    
    return await fetch("https://openidconnect.googleapis.com/v1/userinfo", requestOptions)
        .then(response => response.text())
        .then(result => JSON.parse(result)['sub'])
        .catch(error => console.log('error', error));
}