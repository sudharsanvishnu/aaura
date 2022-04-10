import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/splash/Login';
import Splash from './screens/splash/Splash';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './screens/drawer/Home';
import DrawerContent from './screens/drawer/DrawerContent';



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}
            screenOptions={{ headerShown: false }}
            initialRouteName='Home'
        >
            <Drawer.Screen name="Home" component={Home} />
        </Drawer.Navigator>
    );
}



const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }} initialRouteName='DrawerScreen' >
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="DrawerScreen" component={DrawerScreen} />
            </Stack.Navigator>
        </NavigationContainer >
    )
}

export default Navigation

const styles = StyleSheet.create({})