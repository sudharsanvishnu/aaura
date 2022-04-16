import { ActivityIndicator, FlatList, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Colors, CommonStyle, fonts, hp, wp } from '../../utils/Constant'
import Card from '../../components/Card'
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Shop = ({ navigation }) => {

    const [shopDetails, setShopDetails] = useState(null)

    useEffect(() => {
        const API_CALL = () => {
            fetch('https://theaaura.com/api/v1/shops').then(response => response.json()).then(response => {
                setShopDetails(response.data)
            }).catch(err => console.log(err))
        }
        API_CALL()
    }, [])

    const [api, setApi] = useState(null)
    const [viewAll, setViewAll] = useState(null)
    const [compare, setCompare] = useState(null)
    useEffect(() => {
        const API_CALL = () => {
            fetch(String(api)).then(response => response.json()).then(response => {
                setViewAll(response.data)
            }).catch(err => console.log(err))
        }
        API_CALL()
    }, [api])

    const space = "  "
    const Link = '-- DOWNLOAD Aarua AT PLAY STORE'


    return (
        <View style={[CommonStyle.container2, { backgroundColor: Colors.visible }]} >
            <Header navigation={navigation} />
            {shopDetails === null ? <ActivityIndicator size='large' color={Colors.violet} /> :
                <FlatList
                    data={shopDetails}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={[styles.container, CommonStyle.shadow]} >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                    <Text style={styles.title} >{item?.name}</Text>
                                    <TouchableOpacity onPress={() => {
                                        Linking.openURL(`whatsapp://send?text=` + item?.name + space + item?.user.email + space + item?.address + Link)
                                    }} >
                                        <FontAwesome name='whatsapp' size={wp(5)} color={Colors.violet} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.content} >{item?.user.email}</Text>
                                <Text style={styles.content}>{item?.address}</Text>
                                <TouchableOpacity onPress={() => {
                                    setApi(item?.links.all)
                                    setCompare(item?.name)
                                }} style={{ flexDirection: 'row', justifyContent: 'space-between' }}  >
                                    <Text style={styles.click} >Click to view all products</Text>
                                    <Feather name='arrow-down-right' size={20} color={Colors.violet} />
                                </TouchableOpacity>
                                {compare === item?.name ?
                                    <FlatList
                                        data={viewAll}
                                        keyExtractor={(item, index) => index.toString()}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({ item }) => {
                                            return (
                                                <View >
                                                    <Card item={item} />
                                                </View>
                                            )
                                        }}
                                    />
                                    : null
                                }
                            </View>
                        )
                    }
                    }
                    ListFooterComponent={() => {
                        return (
                            <View style={{ height: hp(10) }} />
                        )
                    }}
                />
            }
        </View>
    )
}

export default Shop

const styles = StyleSheet.create({
    container: {
        margin: wp(2),
        paddingHorizontal: wp(2),
        paddingVertical: hp(1),
        borderRadius: wp(2),
        backgroundColor: Colors.white,
        borderWidth: wp(0.4),
        borderColor: Colors.violet,
    },
    title: {
        fontSize: wp(4),
        fontFamily: fonts.PM,
        color: Colors.black,
    },
    content: {
        fontSize: wp(3),
        fontFamily: fonts.PL,
        color: Colors.black,
    },
    click: {
        fontSize: wp(3),
        fontFamily: fonts.PSB,
        color: Colors.violet,
    }
})