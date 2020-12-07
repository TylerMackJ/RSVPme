import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

function LoginScreen() {
  return(
    <View>
      <Text>Login</Text>
    </View>
  )
}

function MapScreen() {
  return(
    <View>
      <Text>Map</Text>
    </View>
  )
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

