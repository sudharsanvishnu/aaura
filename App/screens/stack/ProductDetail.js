import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Colors, CommonStyle, fonts, hp, wp } from '../../utils/Constant';
import Button from '../../components/Button';
import RenderHTML from 'react-native-render-html';
import Card from '../../components/Card';
const ProductDetail = ({ route, navigation }) => {

    const [item, setItem] = useState(route.params);


    const HtmlSource = { html: item.description };

    const [related, setRelated] = useState(null);

    useEffect(() => {
        const productData = () => {
            fetch(String(item.links.related))
                .then(res => res.json())
                .then(res => {
                    setRelated(res.data)
                })
                .catch(err => console.log(err))
        }
        productData()
    }, [])

    useEffect(() => {

    }, [])

    return (
        <View style={styles.container} >
            <ScrollView stickyHeaderIndices={[7]}>
                <Header title={route.params.name.substring(0, 17) + '...'} navigation={navigation} backArrow={true} />
                <Image source={{ uri: item.thumbnail_image }} style={styles.img} resizeMode='contain' />
                {/* <View style={{ marginHorizontal: wp(3) }} > */}
                <Text style={styles.title} >{item.name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: wp(3) }} >
                    <Text style={styles.title} >Price</Text>
                    <Text style={styles.strike} >{item.base_price}</Text>
                    <Text style={styles.price}>{item.base_discounted_price}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: wp(3) }} >
                    <View style={CommonStyle.shadow} >
                        <Button title='add to waishlist' style={styles.wishButton} buttontext={{ color: Colors.violet, textTransform: 'uppercase', }} />
                    </View>
                    <View style={CommonStyle.shadow} >
                        <Button title='add to cart' style={styles.cartButton} buttontext={{ textTransform: 'uppercase', }}

                            onPress={() => {
                                let headers = new Headers();
                                headers.append("Authorization", "Bearer " + global.token.trim());

                                let formdata = new FormData();
                                formdata.append("user_id", global.userId);
                                formdata.append("id", item.id);

                                const requestOptions = {
                                    method: 'POST',
                                    headers: headers,
                                    body: formdata,
                                };

                                fetch('https://theaaura.com/api/v1/carts/add', requestOptions).then(res => res.json())
                                    .then(response => {
                                        if (response.message === "Product added to cart successfully") {
                                            Alert.alert(
                                                'Success',
                                                'Product added to cart successfully',
                                                [
                                                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                                                ],
                                                { cancelable: false }
                                            );
                                        } else {
                                            alert(response.message)
                                        }
                                    })
                                    .catch(err => console.log(err))
                            }}
                        />
                    </View>
                </View>
                <Text style={[styles.title, { marginTop: hp(2) }]} >Description</Text>
                <View style={{ marginHorizontal: wp(3) }} >
                    <RenderHTML
                        style={styles.content}
                        source={HtmlSource}
                    />
                </View>
                {/* </View> */}
                <View style={CommonStyle.shadow} >
                    <Button title="RELATED PRODUCTS" style={{ height: hp(6), borderRadius: 0 }} />
                </View>
                <FlatList
                    data={related}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.replace('Product detail', item)} >
                                <Card item={item} />
                            </TouchableOpacity>
                        )
                    }
                    }
                />
            </ScrollView>
        </View>
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: hp(100),
        backgroundColor: '#fff',
    },
    img: {
        width: wp(100),
        height: hp(45),
        marginTop: hp(2),
    },
    title: {
        color: Colors.black,
        marginHorizontal: wp(3),
        marginVertical: hp(1),
        fontFamily: fonts.PSB,
        fontSize: 14
    },
    stickyTitle: {
        color: Colors.white,
        fontFamily: fonts.PM,
        fontSize: 14,
        height: hp(6),
        backgroundColor: Colors.violet
    },
    strike: {
        fontFamily: fonts.PL,
        // marginHorizontal: wp(5),
        color: Colors.grey,
        textDecorationLine: 'line-through',
    },
    price: {
        fontFamily: fonts.PM,
        color: 'green',
        fontSize: 14,
    },
    wishButton: {
        backgroundColor: Colors.white,
        borderColor: Colors.violet,
        borderWidth: wp(0.4),
        width: wp(40),
        height: hp(6),
    },
    cartButton: {
        width: wp(40),
        height: hp(6),
        textTransform: 'uppercase',
    },
    content: {
        backgroundColor: 'red',
        width: wp(100),
    }
})