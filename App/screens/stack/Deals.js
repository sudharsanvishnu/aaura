import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { hp } from '../../utils/Constant'
import Header from '../../components/Header'

const Deals = () => {
    return (
        <View style={styles.container} >
            <Text>Deals</Text>
        </View>
    )
}

export default Deals

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: hp(100)
    }
})