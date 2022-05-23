import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Colors, CommonStyle, fonts, hp, wp } from '../utils/Constant';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CartItem = ({ item, onPressDelete, wishlist }) => {

    // console.log(item., 'cart item')

    const removeItem = (item) => {
        return (

            console.log('item removed', item.id)
        )
    }

    const decreaseItem = () => {
        const requestOptions = {
            method: 'POST',
        }

        fetch('https://theaaura.com/api/v1/carts/change-quantity' + item.id, requestOptions).then(response => response.json()).then(response => {
            console.log(response.data, 'this is cart items')
        }
        ).catch(err => console.log(err))
    }
    return (
        <View style={styles.cardView} >
            <View style={CommonStyle.shadow} >
                <View style={{ backgroundColor: Colors.white, borderRadius: wp(2) }} >
                    <Image source={{ uri: wishlist ? item.product.thumbnail_image : item.product.image }} resizeMode='cover' style={styles.image} />
                    <Text numberOfLines={1} style={styles.title} >{item.product.name}</Text>
                    <View style={styles.contentView} >
                        <Text style={styles.actualPrice} >Rs {item.price}</Text>
                        <Text style={styles.actualPrice} >Quantity {item.quantity}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', backgroundColor: Colors.visible }} >
                        <Text style={{ color: Colors.black, marginHorizontal: wp(2), fontFamily: fonts.PSB }} >-</Text>
                        <Text style={{ color: Colors.violet }} >{item.quantity}</Text>
                        <Text style={{ color: Colors.black, marginHorizontal: wp(2), fontFamily: fonts.PSB }} >+</Text>
                    </View>
                    <View style={{ marginHorizontal: wp(2) }} >
                        <Text style={styles.content} >{item.date}</Text>
                    </View>
                    <View style={styles.contentView} >
                        <Text style={styles.content} >Remove item</Text>
                        <TouchableOpacity onPress={() => removeItem(item)} >
                            <AntDesign name='delete' size={wp(5)} color={Colors.violet} style={styles.heart} />
                        </TouchableOpacity>
                        {/* <EvilIcons name='cart' size={wp(7)} color={Colors.violet} style={styles.cart} /> */}
                    </View>
                </View>
            </View>
        </View >
    )
}

export default CartItem

const styles = StyleSheet.create({
    cardView: {
        width: wp(45),
        margin: wp(2),
        // borderRadius: wp(2),
        // height: hp(31),
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
        fontSize: wp(3),
        fontFamily: fonts.PSB,
        color: Colors.black,
    },
    content: {
        fontFamily: fonts.PL,
        fontSize: wp(3),
        color: Colors.black
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