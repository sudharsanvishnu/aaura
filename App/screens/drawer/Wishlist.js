import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Colors, CommonStyle, hp } from '../../utils/Constant'
import CartItem from '../../components/CartItem'

const Wishlist = ({ navigation }) => {


    const [wishlist, setWishlist] = useState();
    const [loader, setLoader] = useState(true);
    const [user, setUser] = useState(null);
    useEffect(() => {
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + global.token.trim());

        const requestOptions = { method: 'GET', headers }

        fetch('https://theaaura.com/api/v1/user/info/', requestOptions).then(response => response.json()).then(response => {
            // console.log(response.data, 'this is user profile');
            setUser(response.data[0].id);
            getWishlist();
        }).catch(err => console.log(err))

    }, [])

    const getWishlist = () => {
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + global.token.trim());

        const requestOptions = {
            method: 'GET',
            headers: headers,
        };
        console.log(user)
        fetch('https://theaaura.com/api/v1/wishlists/' + user, requestOptions)
            .then(res => res.json())
            .then(response => {
                setWishlist(response.data);
                setLoader(false);
                console.log(response.data, 'this is cart items')
            }
            ).catch(err => console.log(err))
    }


    return (
        <View style={CommonStyle.container2} >
            <Header title="Wishlist" navigation={navigation} />
            {loader ? <ActivityIndicator size='large' color={Colors.violet} style={{ flex: 1, alignSelf: 'center' }} /> :
                <FlatList
                    data={wishlist}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <Pressable >
                                <CartItem item={item} wishlist={true} />
                            </Pressable>
                        )
                    }}
                    ListFooterComponent={() => {
                        return (
                            <View style={{ height: hp(10) }} >
                            </View>
                        )
                    }}
                />
            }
        </View>
    )
}

export default Wishlist

const styles = StyleSheet.create({})