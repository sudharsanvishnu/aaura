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
    const [loader, setLoader] = useState(false);
    // for product details
    const [productDetail, setProductDetail] = useState(null);
    const [variant, setVariant] = useState([]);
    const [qty, setQty] = useState(1);
    const [itemPrice, setItemPrice] = useState(null);
    // for storing the size
    const [attributes, setAttributes] = useState(null);
    const [priceLoader, setPriceLoader] = useState(false);

    console.log(item?.links?.details, 'this is detail')
    useEffect(() => {
        fetch(item?.links?.details)
            .then(res => res.json())
            .then(res => {
                setProductDetail(res.data);
            })
            .catch(err => {
                console.log(err, 'errpr');
            })
    }, [])

    useEffect(() => {
        priceVariant();
    }, [attributes])

    useEffect(() => {
        priceVariant();

        // setPriceLoader(true);

        // let headers = new Headers();
        // headers.append("Authorization", "Bearer " + global.token.trim());


        // var formdata = new FormData();
        // formdata.append("id", productDetail?.id);
        // formdata.append("attribute_id_1", attributes);
        // formdata.append("quantity", qty);

        // console.log(attributes, 'canflknasknf')
        // const requestOptions = {
        //     method: 'POST',
        //     headers: headers,
        //     body: formdata,
        // }


        // fetch("https://theaaura.com/api/v1/products/variant/price", requestOptions).then(res => res.json())
        //     .then(res => {
        //         setItemPrice(res.price);
        //         setPriceLoader(false);
        //     })
        //     .catch(err => {
        //         setPriceLoader(false);
        //         console.log(err, 'error');
        //     }
        //     )
    }, [qty])
    const priceVariant = () => {
        setPriceLoader(true);

        let headers = new Headers();
        headers.append("Authorization", "Bearer " + global.token.trim());


        var formdata = new FormData();
        formdata.append("id", productDetail?.id);
        formdata.append("attribute_id_1", attributes);
        formdata.append("quantity", qty);

        console.log(formdata, 'canflknasknf');
        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: formdata,
        }


        fetch("https://theaaura.com/api/v1/products/variant/price", requestOptions).then(res => res.json())
            .then(res => {
                setItemPrice(res.price);
                setPriceLoader(false);
            })
            .catch(err => {
                setPriceLoader(false);
                console.log(err, 'error');
            }
            )
        console.log(attributes, itemPrice, 'this is from price var')
        // setAttributes(null);
    }

    // console.log(productDetail, 'product detail')
    useEffect(() => {
        fetch(String(item.links.related))
            .then(res => res.json())
            .then(res => {
                setRelated(res.data)
            })
            .catch(err => console.log(err))
    }, [])




    return (
        <View style={styles.container} >
            <Header title={productDetail === null ? 'loading...' : productDetail?.name.substring(0, 17) + '...'} navigation={navigation} backArrow={true} />
            {productDetail === null ? <ActivityIndicator size="large" color={Colors.violet} style={{ flex: 1, alignSelf: 'center' }} /> : <>
                <ScrollView >
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
                                    setQty(qty - 1);
                                } else {
                                    Alert.alert('Minimum order quantity is one')
                                }
                            }} >-</Text>
                            <Text style={styles.qtyView} > {qty}</Text>
                            <Text style={styles.minus} onPress={() => {
                                if (productDetail.available_qty > qty) {
                                    setQty(qty + 1);
                                } else {
                                    console.log(qty)
                                    Alert.alert('Out of stock')
                                }
                            }} > +</Text>
                        </View>
                    </View>
                    <FlatList
                        horizontal
                        data={productDetail.product_variants}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: hp(1) }}>
                                    <Pressable onPress={() => {
                                        setVariant(index);
                                        setAttributes(item.value);
                                    }}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginLeft: wp(3),
                                            borderRadius: wp(2),
                                            borderWidth: wp(0.4),
                                            borderColor: variant === index ? Colors.violet : Colors.greyLight,
                                            padding: wp(0.5),
                                            justifyContent: 'center',
                                        }}>
                                        <Text style={[styles.contentText, { color: variant === index ? Colors.black : Colors.greyLight }]} > {item.value}</Text>
                                    </Pressable>
                                </View>
                            )
                        }}
                    />
                    {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap' }} >
                        {productDetail.product_variants.map((item, index) => {
                            return (
                                // item.label === 'Size' ?
                                <>
                                    <Pressable key={index}
                                        onPress={() => {
                                            setVariant(index);
                                            setAttributes(item.value);
                                        }}
                                        onPressOut={() => {
                                            setAttributes(item.value);
                                            priceVariant();
                                        }}
                                        style={
                                            {
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginLeft: wp(3),
                                                borderRadius: wp(2),
                                                borderWidth: wp(0.4),
                                                borderColor: variant === index ? Colors.violet : Colors.greyLight,
                                                padding: wp(0.5),
                                                justifyContent: 'center',
                                            }}>
                                        <Text style={[styles.contentText, { color: variant === index ? Colors.black : Colors.greyLight }]} > {item.value}</Text>
                                    </Pressable>
                                </>
                            )
                        })}
                    </View> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: wp(3) }} >
                        <Text style={styles.title} >Price</Text>
                        <Text style={styles.strike} >{item.base_price}</Text>
                        {priceLoader ? <ActivityIndicator size='small' color={Colors.violet} style={{ alignSelf: 'center' }} /> :
                            <Text style={styles.price}>{itemPrice}</Text>
                        }
                    </View>
                    {loader ? <ActivityIndicator size="small" color={Colors.violet} style={{ alignSelf: 'center' }} /> :
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: wp(3) }} >
                            <View style={CommonStyle.shadow} >
                                <Button title='add to wishlist' style={styles.wishButton} buttontext={{ color: Colors.violet, textTransform: 'uppercase', }}
                                    onPress={() => {
                                        setLoader(true);
                                        let headers = new Headers();
                                        headers.append("Authorization", "Bearer " + global.token.trim());

                                        let formdata = new FormData();
                                        formdata.append("product_id", item.id);
                                        // formdata.append("variant_id", attributes);
                                        // formdata.append("quantity", qty);


                                        const requestOptions = {
                                            method: 'POST',
                                            headers: headers,
                                            body: formdata,
                                            redirect: 'follow',
                                        };

                                        fetch('https://theaaura.com/api/v1/wishlists/add', requestOptions).then(res => res.json()).then(response => {
                                            console.log(response, 'added to wishlist')
                                            if (response.message === "Product is successfully added to your wishlist") {
                                                setLoader(false);
                                                Alert.alert(
                                                    'Success',
                                                    'Product is successfully added to your wishlist',
                                                    [
                                                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                                                    ],
                                                    { cancelable: false }
                                                );
                                            } else {
                                                setLoader(false);
                                                alert(response.message)
                                            }

                                        }).catch(err => {
                                            setLoader(false);
                                            console.log(err, 'error wishlist')
                                        }
                                        )
                                    }}
                                />
                            </View>
                            <View style={CommonStyle.shadow} >
                                <Button title='add to cart' style={styles.cartButton} buttontext={{ textTransform: 'uppercase', }}

                                    onPress={() => {
                                        setLoader(true);
                                        let headers = new Headers();
                                        headers.append("Authorization", "Bearer " + global.token.trim());

                                        let formdata = new FormData();
                                        formdata.append("id", item.id);
                                        formdata.append("attribute_id_1", attributes);
                                        formdata.append("quantity", qty);
                                        console.log('add to cart pressed');

                                        const requestOptions = {
                                            method: 'POST',
                                            headers: headers,
                                            body: formdata,
                                            redirect: 'follow',
                                        };

                                        fetch('https://theaaura.com/api/v1/carts/add', requestOptions).then(res => res.json())
                                            .then(response => {
                                                console.log(response, 'add to cart res');
                                                if (response.message === "Product added to cart successfully") {
                                                    setLoader(false);
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
                                                    setLoader(false);
                                                }
                                            })
                                            .catch(err => {
                                                setLoader(false);
                                                console.log(err, 'this is error blocker of add to cart')
                                            }
                                            )
                                    }}
                                />
                            </View>
                        </View>
                    }
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