import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
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

    const [today, setToday] = useState(null);


    useEffect(() => {
        const deal = () => {
            fetch('https://theaaura.com/api/v1/products/todays-deal').then(response => response.json()).then(response => {
                setToday(response.data)
            }).catch(err => console.log(err))
        }
        return deal()
    }, [today, setToday])

    return (
        <View style={CommonStyle.container2} >
            <Header navigation={navigation} />
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={today}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Product detail', item)} >
                            <Card item={item} />
                        </TouchableOpacity >
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