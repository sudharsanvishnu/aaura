import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import Card from '../../components/Card'
import Header from '../../components/Header'
import { CommonStyle } from '../../utils/Constant'

const TodayDeals = ({ navigation }) => {

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
                        <View >
                            <Card item={item} />
                        </View>
                    )
                }}
                // horizontal={true}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default TodayDeals

const styles = StyleSheet.create({})