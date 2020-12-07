import React from 'react';
import { View, Text, Button } from 'react-native';

export default function LoginScreen({ navigation }) {
    return(
      <View>
        <Text>Login</Text>
        <Button
            title="Go to map"
            onPress={() => navigation.navigate('Map')}
        />
      </View>
    )
  }