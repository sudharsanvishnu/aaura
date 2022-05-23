import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, CommonStyle } from '../../utils/Constant'
import Header from '../../components/Header'
import Card from '../../components/Card'

const SeeAll = ({ navigation, route }) => {

    console.log(route.params, 'item')

    const [data, setData] = useState(route.params)

    useEffect(() => {
        setData(route.params);
        setLoader(false);
    }, [])

    const [loader, setLoader] = useState(true);

    return (
        <View style={CommonStyle.container2} >
            <Header navigation={navigation} backArrow={true} />
            {loader ? <ActivityIndicator size="large" color={Colors.violet} /> :
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={data}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Product detail', item)} >
                                <Card item={item} navigation={navigation} />
                            </TouchableOpacity >
                        )
                    }}
                    // horizontal={true}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                />
            }
        </View>
    )
}

export default SeeAll

const styles = StyleSheet.create({})