import {useContext} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { MapScreen } from '../screens/MapScreen';
import { PermissionsScreen } from '../screens/PermissionsScreen';
import { PermissionsContext } from '../context/PermissionsContext';
import { LoadingScreen } from '../screens/LoadingScreen';

const Stack = createStackNavigator();

export const MainStack = () => {

    const { permissions } = useContext( PermissionsContext )

    if( permissions.locationStatus === 'unavailable' ){
        return(
            <LoadingScreen/>
        )
    }

  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        {
            permissions.locationStatus === 'granted'
                ? <Stack.Screen name="MapScreen" component={ MapScreen } />
                : <Stack.Screen name="PermissionsScreen" component={ PermissionsScreen } />
        }
    </Stack.Navigator>
  );
}