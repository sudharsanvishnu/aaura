import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ScrollView, Alert, Pressable, ActivityIndicator } from 'react-native'
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

    // for product details
    const [productDetail, setProductDetail] = useState(null);
    const [variant, setVariant] = useState(null);
    const [qty, setQty] = useState(1);
    const [itemPrice, setItemPrice] = useState(null);

    useEffect(() => {
        fetch(String(item?.links?.details))
            .then(res => res.json())
            .then(res => {
                setProductDetail(res.data);
                setItemPrice(productDetail.discounted_price.substring(3));
                console.log(res.data, 'pro deta')
            })
            .catch(err => {
                console.log(err);
            })
    }, [item, productDetail])


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

    // for storing the size
    const [attributes, setAttributes] = useState([]);

    return (
        <View style={styles.container} >
            {productDetail === null ? <ActivityIndicator size="large" color={Colors.violet} /> : <>
                <ScrollView stickyHeaderIndices={[9]}>
                    <Header title={productDetail?.name.substring(0, 17) + '...'} navigation={navigation} backArrow={true} />
                    <Image source={{ uri: productDetail.thumbnail_image }} style={styles.img} resizeMode='contain' />
                    {/* <View style={{ marginHorizontal: wp(3) }} > */}
                    <Text style={styles.title} >{productDetail.name}</Text>
                    <View style={{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-between', alignItems: 'center' }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Text style={styles.title}>{productDetail.availability}</Text>
                            <Text style={styles.contentText} >-  {productDetail.available_qty} left</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: wp(4) }} >
                            <Text style={styles.minus} onPress={() => {
                                if (qty > 1) {
                                    setQty(qty - 1)
                                    setItemPrice(productDetail.discounted_price.substring(3) * (qty - 1), 'minus discounted_price');
                                    console.log(productDetail.discounted_price.substring(3) * qty, 'minus discounted_price')
                                    console.log(itemPrice, 'this is item price')  // itemPrice - (itemPrice * (qty - 1))
                                } else {
                                    Alert.alert('Minimum order quantity is one')
                                }
                            }} >-</Text>
                            <Text style={styles.qtyView} > {qty}</Text>
                            <Text style={styles.minus} onPress={() => {
                                if (productDetail.available_qty > qty) {
                                    setQty(qty + 1);
                                    setItemPrice(productDetail.discounted_price.substring(3) * (qty + 1))
                                    console.log(productDetail.discounted_price.substring(3) * qty, 'this is item price')  // itemPrice + (itemPrice * (qty - 1))
                                } else {
                                    console.log(qty)
                                    Alert.alert('Out of stock')
                                }
                            }} > +</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }} >
                        {productDetail.product_variants.map((item, index) => {
                            return (
                                <Pressable key={index}
                                    onPress={() => {
                                        setVariant(item)
                                        setAttributes(item?.value)
                                        console.log(attributes, 'this is selected size')
                                    }}
                                    style={
                                        {
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginLeft: wp(3),
                                            borderRadius: wp(2),
                                            borderWidth: wp(0.4),
                                            borderColor: variant === item ? Colors.violet : Colors.greyLight,
                                            padding: wp(0.5),
                                            justifyContent: 'center',
                                        }}>
                                    <Text style={[styles.contentText, { color: variant === item ? Colors.black : Colors.greyLight }]} >{item.label}</Text>
                                    <Text style={[styles.contentText, { color: variant === item ? Colors.black : Colors.greyLight }]} > {item.value}</Text>
                                </Pressable>
                            )
                        })}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: wp(3) }} >
                        <Text style={styles.title} >Price</Text>
                        <Text style={styles.strike} >{item.base_price}</Text>
                        <Text style={styles.price}>Rs {itemPrice}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: wp(3) }} >
                        <View style={CommonStyle.shadow} >
                            <Button title='add to waishlist' press={variant === null ? true : false} style={styles.wishButton} buttontext={{ color: Colors.violet, textTransform: 'uppercase', }}
                                onPress={() => {

                                    let headers = new Headers();
                                    headers.append("Authorization", "Bearer " + global.token.trim());

                                    let formdata = new FormData();
                                    formdata.append("product_id", item.id);
                                    formdata.append("variant_id", attributes);

                                    const requestOptions = {
                                        method: 'POST',
                                        headers: headers,
                                        body: formdata,
                                    };

                                    fetch('https://theaaura.com/api/v1/wishlists/add', requestOptions).then(res => res.json()).then(response => {
                                        console.log(response, 'added to wishlist')


                                    }).catch(err => console.log(err))


                                }}

                            />
                        </View>
                        <View style={CommonStyle.shadow} >
                            <Button title='add to cart' press={variant === null ? true : false} style={styles.cartButton} buttontext={{ textTransform: 'uppercase', }}

                                onPress={() => {
                                    let headers = new Headers();

                                    headers.append("Authorization", "Bearer " + global.token.trim());

                                    let formdata = new FormData();
                                    formdata.append("product_id", item.id);

                                    const requestOptions = {
                                        method: 'POST',
                                        headers: headers,
                                        body: formdata,
                                    };

                                    fetch('https://theaaura.com/api/v1/carts/add', requestOptions).then(res => res.json())
                                        .then(response => {
                                            console.log(response, 'add to cart res')
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
            </>}
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
        width: wp(100),
    },
    contentText: {
        fontFamily: fonts.PM,
        fontSize: 13,
        color: Colors.black
    },
    qtyView: {
        width: wp(7),
        textAlign: 'center',
        fontFamily: fonts.PSB,
        color: Colors.black,
    },
    minus: {
        color: Colors.black,
        fontFamily: fonts.PSB,
        fontSize: wp(5)
    }
})