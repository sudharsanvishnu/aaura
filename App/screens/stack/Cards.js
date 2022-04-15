import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Card from '../../components/Card'
import { Colors, CommonStyle, hp } from '../../utils/Constant'

const Cards = ({ route, navigation }) => {

    const [apiLink, setApiLink] = useState(null);
    const [apiData, setApiData] = useState(null);


    useEffect(() => {
        setApiLink(route.params.links.products);

        const productData = () => {
            fetch(apiLink)
                .then(res => res.json())
                .then(res => {
                    setApiData(res?.data)
                })
                .catch(err => console.log(err))
        }
        productData()
    }, [apiData, apiLink])


    return (
        <View style={styles.container} >
            <Header title={route.params.name} navigation={navigation} backArrow={true} />
            {apiData === null ? <ActivityIndicator size="large" color={Colors.violet} style={{ justifyContent: 'center', alignItems: 'center', height: hp(100) }} /> :
                <FlatList
                    data={apiData}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Product detail', item)} >
                                <Card item={item} />
                            </TouchableOpacity>
                        )
                    }
                    }
                />
            }
        </View>
    )
}

export default Cards

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    }
})