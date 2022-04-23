import { StyleSheet, Image, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Colors, CommonStyle, hp, wp } from '../../utils/Constant'
import { Storage } from '../../local storage';
import AsynchStoragekey from '../../local storage/AsyncStorage';

const Splash = ({ navigation }) => {


    useEffect(() => {

        setTimeout(() => {
            isUserLogin();
        }, 3000)
    }, [])

    useEffect(() => {
        CHECK_USER();
    }, []);

    const CHECK_USER = async () => {
        const account_info = await Storage.getItem(AsynchStoragekey.bearer);
        global.token = account_info.access_token;

        const userId = await Storage.getItem(AsynchStoragekey.userId);
        global.userId = userId;
    }


    const isUserLogin = async () => {
        if (global.token === '') {
            navigation.replace('Login')
        } else {
            // console.log('drawer')
            navigation.replace('DrawerScreen')
        }
    }

    return (
        <View style={styles.container} >
            <Image source={require('../../assets/image/new.png')} style={styles.logo} resizeMode="contain" />
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.violet,
    },
    logo: {
        width: wp(70),
        height: hp(70),
    }
})