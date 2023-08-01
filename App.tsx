import { NavigationContainer } from '@react-navigation/native';
import React from 'react'


import 'react-native-gesture-handler';
import { MainStack } from './src/navigation/MainStackNav';
import { PermissionsProvider } from './src/context/PermissionsContext';

const AppState = ({ children }: any) => {
  return(
    <PermissionsProvider>
      { children }
    </PermissionsProvider>
  )
}

const App = () => {
   return (
      <NavigationContainer>
        <AppState>
          <MainStack/>
        </AppState>
      </NavigationContainer>
   )
}

export default App;