import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, fonts, hp, wp } from '../utils/Constant';

const Button = ({ title, style, buttontext, onPress, press, onPressOut }) => {


    return (
        <Pressable disabled={press} onPressOut={onPressOut} onPress={onPress} style={press ? [styles.buttonDisabled, style] : [styles.button, style]}>
            <Text style={[styles.title, buttontext]} numberOfLines={1} >{title}</Text>
        </Pressable >
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.violet,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
    },
    buttonDisabled: {
        backgroundColor: Colors.border2,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
    },
    title: {
        fontFamily: fonts.PSB,
        color: Colors.white
    },
})
