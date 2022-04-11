import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import Circle from '../../components/Circle'
import Header from '../../components/Header'
import { CommonStyle } from '../../utils/Constant'

const Category = ({ navigation }) => {

    const car = [
        { imgUrl: require('../../assets/image/icon.jpg'), title: ' shopping shopping  ', price: 'Rs.99999', actualPrice: 'Rs 99999' },
        { imgUrl: require('../../assets/image/icon.jpg'), title: ' shopping shopping ', price: 'Rs.99999', actualPrice: 'Rs 99999' },
        { imgUrl: require('../../assets/image/icon.jpg'), title: ' shopping shopping ', price: 'Rs.99999', actualPrice: 'Rs 99999' },
        { imgUrl: require('../../assets/image/icon.jpg'), title: ' shopping shopping ', price: 'Rs.99999', actualPrice: 'Rs 99999' },
        { imgUrl: require('../../assets/image/icon.jpg'), title: ' shopping shopping ', price: 'Rs.99999', actualPrice: 'Rs 99999' },
        { imgUrl: require('../../assets/image/icon.jpg'), title: ' shopping shopping ', price: 'Rs.99999', actualPrice: 'Rs 99999' },
    ]

    return (
        <View style={CommonStyle.container2} >
            <Header navigation={navigation} />
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={car}
                renderItem={({ item, index }) => {
                    return (
                        <Circle item={item} />
                    )
                }}
                numColumns={3}
            />
        </View>
    )
}

export default Category

const styles = StyleSheet.create({})