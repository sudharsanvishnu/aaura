import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { fonts, hp, wp } from '../utils/Constant'

const Circle = ({ item }) => {
    return (
        <View style={styles.circleView} >
            <Image source={item.imgUrl} style={styles.circle} />
            <Text style={styles.catSubTitle} >{item.title}</Text>
        </View>
    )
}

export default Circle

const styles = StyleSheet.create({
    circleView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(31),
        height: hp(16),
        margin: wp(1),
    },
    circle: {
        width: wp(22),
        height: wp(22),
        borderRadius: wp(11.5),
    },
    catSubTitle: {
        fontFamily: fonts.PM,
        fontSize: wp(3),
    }
})