import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { PermissionsContext } from '../context/PermissionsContext'
import { BlackButton } from '../components/BlackButton';

export const PermissionsScreen = () => {

    const { permissions, askLocationPermission } = useContext( PermissionsContext );


   return (
       <View style={ stylesScreen.container }>
            <Text style={stylesScreen.title}>Please authorize the GPS permission to use the application</Text>

            <BlackButton 
                title='Permission'
                onPress={ askLocationPermission }
            />

            <Text style= { stylesScreen.subtitle }>
                { JSON.stringify(permissions, null, 5 )}
            </Text>
       </View>
   )
}

const stylesScreen = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        width: 200,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20
    },
    subtitle: {
        width: 200,
        fontSize: 16,
        marginTop: 20
    },
});