import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/splash/Login';
import Splash from './screens/splash/Splash';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './screens/drawer/Home';
import DrawerContent from './screens/drawer/DrawerContent';
import Category from './screens/drawer/Category';
import TodayDeals from './screens/drawer/TodayDeals';
import Chats from './screens/drawer/Chats';
import Help from './screens/drawer/Help';
import Notification from './screens/drawer/Notification';
import Sell from './screens/drawer/Sell';
import Wishlist from './screens/drawer/Wishlist';
import Orders from './screens/drawer/Orders';
import Profile from './screens/drawer/Profile';
import Cart from './screens/drawer/Cart';
import Cards from './screens/stack/Cards';
import ProductDetail from './screens/stack/ProductDetail';
import Deals from './screens/stack/Deals';
import Privacy from './screens/drawer/Privacy';
import { LogBox } from 'react-native';
import Reset from './screens/splash/Reset';
import TopBrands from './screens/drawer/TopBrands';
import Shop from './screens/drawer/Shop';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

global.token = '';
global.userId = '';

const DrawerScreen = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}
            screenOptions={{ headerShown: false }}
            initialRouteName='Home'
        >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name='Shop' component={Category} />
            <Drawer.Screen name='TodayDeals' component={TodayDeals} />
            <Drawer.Screen name='Cart' component={Cart} />
            <Drawer.Screen name='Profile' component={Profile} />
            <Drawer.Screen name='Orders' component={Orders} />
            <Drawer.Screen name='Wishlist' component={Wishlist} />
            <Drawer.Screen name='Sell' component={Sell} />
            <Drawer.Screen name='Notification' component={Notification} />
            <Drawer.Screen name='Help' component={Help} />
            <Drawer.Screen name='Chats' component={Chats} />
            <Drawer.Screen name='Privacy' component={Privacy} />
            <Drawer.Screen name='TopBrands' component={TopBrands} />
            <Drawer.Screen name='Shop details' component={Shop} />
        </Drawer.Navigator>
    );
}



const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }} initialRouteName='Splash' >
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Reset" component={Reset} />
                <Stack.Screen name="DrawerScreen" component={DrawerScreen} />
                <Stack.Screen name="Cards" component={Cards} />
                <Stack.Screen name="Product detail" component={ProductDetail} />
                <Stack.Screen name="Deals" component={Deals} />
            </Stack.Navigator>
        </NavigationContainer >
    )
}

export default Navigation

const styles = StyleSheet.create({})