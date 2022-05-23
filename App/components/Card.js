import { StyleSheet, Image, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { Colors, CommonStyle, fonts, hp, wp } from '../utils/Constant'
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const Card = ({ item, navigation }) => {

    // console.log(item, 'cart item')
    const [loader, setLoader] = useState(false);
    const AddWish = () => {
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
    }

    const [attributes, setAttributes] = useState('');
    const [qty, setQty] = useState(1);
    const AddToCart = () => {
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
    }

    return (
        <View style={styles.cardView} >
            <View style={CommonStyle.shadow} >
                <View style={{ backgroundColor: Colors.white, borderRadius: wp(2) }} >
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Product detail', item)} >
                        <Image source={{ uri: item.thumbnail_image }} resizeMode='cover' style={styles.image} />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={styles.title} >{item.name}</Text>
                    <View style={styles.contentView} >
                        <Text style={styles.price} >{item.base_price}</Text>
                        <Text style={styles.actualPrice} >{item.actualPrice}</Text>
                    </View>
                    <View style={styles.contentView} >
                        {loader ? <ActivityIndicator size='small' color={Colors.violet} style={{ flex: 1, alignSelf: 'center' }} /> :
                            <>
                                <EvilIcons name='heart' size={wp(7)} color={Colors.violet} style={styles.heart} onPress={AddWish} />
                                <EvilIcons name='cart' size={wp(7)} color={Colors.violet} style={styles.cart} onPress={AddToCart} />
                            </>
                        }
                    </View>
                </View>
            </View>
        </View >
    )
}

export default Card

const styles = StyleSheet.create({
    cardView: {
        width: wp(45),
        margin: wp(2),
        // borderRadius: wp(2),
        height: hp(31),
        backgroundColor: Colors.white,
    },
    image: {
        width: wp(45),
        height: hp(20),
        borderTopLeftRadius: wp(2),
        borderTopRightRadius: wp(2),
    },
    title: {
        fontSize: 14,
        fontFamily: fonts.PL,
        color: Colors.black
    },
    price: {
        fontSize: wp(4),
        fontFamily: fonts.PM,
        textDecorationLine: 'line-through',
        color: Colors.grey,
    },
    actualPrice: {
        fontSize: wp(4),
        fontFamily: fonts.PSB,
        color: Colors.black,
    },
    contentView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp(2)
    },
    cart: {
        marginBottom: hp(0.3)
    }
})