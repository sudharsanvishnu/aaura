import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { CommonStyle } from '../../utils/Constant'

const Cart = ({ navigation }) => {
    return (
        <View style={CommonStyle.container2} >
            <Header navigation={navigation} />

        </View>
    )
}

export default Cart

const styles = StyleSheet.create({})