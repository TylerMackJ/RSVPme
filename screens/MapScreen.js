import React from 'react';
import { View, Text, Button } from 'react-native';

export default function MapScreen({ navigation }) {
    return(
      <View>
        <Text>Map</Text>
        <Button
            title="Go to Login" 
            onPress={() => navigation.navigate('Login')}
        />
      </View>
    )
  }