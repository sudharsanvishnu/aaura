import { StyleSheet, Image, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Colors, fonts, hp, wp } from '../utils/Constant'
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const Header = ({ navigation, backArrow, title }) => {

    return (
        <View style={styles.container} >
            {backArrow ?
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                    <EvilIcons name='chevron-left' size={wp(10)} color={Colors.white} style={styles.backArrow} onPress={() => navigation.goBack('')} />
                    <Text style={{ color: Colors.white, fontFamily: fonts.PSB, fontSize: 18, marginTop: hp(0.5) }} >{title}</Text>
                </View>
                : < >
                    <Image source={require('../assets/image/newlogo.png')} style={styles.logo} resizeMode='contain' />
                    <EvilIcons name='navicon' size={wp(8)} color={Colors.white} style={styles.navIcon} onPress={() => navigation.openDrawer()} />
                </>
            }
            <View style={styles.container2} >
                <EvilIcons name='bell' size={wp(7)} color={Colors.white} style={styles.bell} />
                <Pressable onPress={() => navigation.navigate('Wishlist')}>
                    <EvilIcons name='heart' size={wp(7)} color={Colors.white} style={styles.heart} />
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Cart')}>
                    <EvilIcons name='cart' size={wp(7)} color={Colors.white} style={styles.cart} />
                </Pressable>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: wp(100),
        height: hp(6),
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.violet,
    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
        width: wp(30),
        justifyContent: 'space-evenly',
        // backgroundColor: 'green',
    },
    firstRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    navIcon: {
        // backgroundColor: 'green',
        marginTop: wp(4),
        alignItems: 'center',
        height: hp(4),
        marginLeft: wp(-102)
    },
    logo: {
        width: wp(50),
        height: hp(4),
        marginLeft: wp(-4),
        marginTop: hp(0.8),
        tintColor: Colors.white,
        // backgroundColor: 'red',
    },

})