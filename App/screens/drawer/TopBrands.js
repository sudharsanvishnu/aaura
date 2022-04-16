import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { hp, wp } from '../../utils/Constant'

const TopBrands = ({ navigation }) => {

    return (
        <View style={styles.container} >
            <Header navigation={navigation} />
            <Text>TopBrands</Text>
        </View>
    )
}

export default TopBrands

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: wp(100),
        height: hp(100),
    }
})