import { StyleSheet, Image, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Colors, CommonStyle, hp, wp } from '../../utils/Constant'

const Splash = ({ navigation }) => {


    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Login')
        }, 2000)
    })

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