import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import { StyleSheet } from 'react-native';

import VistaInicio from './views/VistaInicio.js';
import VistaFlex from './views/VistaFlex.js';
import VistaGrafica from './views/VistaGrafica.js';
import VistaLogin from './views/VistaLogin.js';
import VistaMenuDrawer from './views/VistaMenuDrawer.js';

const Stack = createStackNavigator();

function MyStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen name='login' component={VistaLogin} options={{title: 'Iniciar Sesion'}} />
            <Stack.Screen name='menuDrawer' component={VistaMenuDrawer} options={{headerShown:false}} />
        </Stack.Navigator>
    );
}

const App = () => {
    return (
            <NavigationContainer>
                <MyStack />
            </NavigationContainer>
    );
}

export default App;