import { StyleSheet, Text, View, Image, ActivityIndicator, Modal, TextInput, FlatList, KeyboardAvoidingView, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, CommonStyle, fonts, hp, wp } from '../../utils/Constant'
import Header from '../../components/Header'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../../components/Button';

const Profile = ({ navigation }) => {

    // for rendering address
    const [address, setAddress] = useState(null);

    useEffect(() => {

        getAddress();
    }, [address])

    const getAddress = () => {
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + global.token.trim());

        const requestOptions = { method: 'GET', headers: headers, redirect: 'follow' };

        fetch('https://theaaura.com/api/v1/user/shipping/address', requestOptions).then(response => response.json()).then(response => {
            // console.log(response.data, 'response from api')
            setAddress(response.data)
            console.log(address, 'thsi is get add')
        }
        ).catch(err => console.log(err))
    }

    /// for modal
    const [editAddress, setEditAddress] = useState(false);
    const [showAddress, setShowAddress] = useState(false);

    // for new address post req
    const [newAddress, setNewAddress] = useState(null);
    const [newCity, setNewCity] = useState(null);
    const [newCountry, setNewCountry] = useState(null);
    const [newPhone, setNewPhone] = useState(null);
    const [newPincode, setNewPincode] = useState(null);

    return (
        <View style={CommonStyle.container2}>
            <Header navigation={navigation} />
            <View style={styles.profileView} >
                <View style={styles.proPic} >
                    <View style={[styles.circleView2, CommonStyle.shadow]} >
                        <Image source={require('../../assets/image/user.png')} resizeMode='contain' style={styles.circleView} />
                    </View>
                    <Text style={styles.name} >Profile</Text>
                </View>
                {/* // for pencil */}
            </View>
            <View style={{ flexDirection: 'row' }} >
                {address === null ? <ActivityIndicator size="large" color={Colors.violet} /> :
                    <View>
                        <View style={[styles.box, CommonStyle.shadow]} >
                            <View style={{ flexDirection: 'row', width: wp(40), justifyContent: 'space-between' }} >
                                <View>
                                    <Text style={styles.address} >Address</Text>
                                    <View style={styles.line} />
                                </View>
                                <TouchableOpacity activeOpacity={0.5} onPress={() => setEditAddress(true)} >
                                    <AntDesign name='edit' size={wp(6)} color={Colors.violet} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity activeOpacity={0.6} style={{ alignItems: 'center' }} onPress={() => setShowAddress(true)} >
                                <Text style={styles.contentText} numberOfLines={2} >{address[0]?.address}</Text>
                                <Text style={styles.contentText} numberOfLines={1} >{address[0]?.city}</Text>
                                <Text style={styles.contentText} numberOfLines={1} >{address[0]?.country}</Text>
                            </TouchableOpacity>
                        </View>
                        <Modal transparent={true} visible={showAddress} animationType='fade' onRequestClose={() => setShowAddress(false)} >
                            <View style={[styles.modalContainer, { backgroundColor: 'rgba(0,0,0,0.7)', }]} >
                                <View style={styles.modelView} >
                                    <Text style={styles.address} >SHIPPING ADDRESS</Text>
                                    <View style={styles.line} />
                                    <FlatList
                                        data={address}
                                        keyExtractor={(item, index) => index.toString()}
                                        numColumns={2}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <View style={[styles.cards, { width: wp(40), margin: wp(2), padding: wp(2) }]} >
                                                    <Text style={styles.contentText} numberOfLines={5} >{item.address}</Text>
                                                    <Text style={styles.contentText} numberOfLines={1} >{item.phone}</Text>
                                                    <Text style={styles.contentText} numberOfLines={1} >{item.city}</Text>
                                                    <Text style={styles.contentText} numberOfLines={1} >{item.postal_caode}</Text>
                                                    <Text style={styles.contentText} numberOfLines={1} >{item.country}</Text>
                                                </View>
                                            )
                                        }}
                                    />
                                    <Button title="CLOSE" style={[styles.cartButton, { width: wp(77), margin: hp(2) }]} onPress={() => setShowAddress(false)} />
                                </View>
                            </View>
                        </Modal>
                        <Modal transparent={true} visible={editAddress} >
                            <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', }} behavior="padding" enabled>
                                <View style={styles.modalContainer} >
                                    <View style={styles.modelView} >
                                        <Text style={styles.address} >SHIPPING ADDRESS</Text>
                                        <View style={styles.line} />
                                        <FlatList
                                            data={address}
                                            keyExtractor={(item, index) => index.toString()}
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                                        <View style={[styles.cards, { padding: wp(2), height: hp(18) }]} >
                                                            <Text style={styles.contentText} numberOfLines={3} >{item.address}</Text>
                                                            <Text style={styles.contentText} numberOfLines={1} >{item.phone}</Text>
                                                            <Text style={styles.contentText} numberOfLines={1} >{item.city}</Text>
                                                            <Text style={styles.contentText} numberOfLines={1} >{item.postal_caode}</Text>
                                                            <Text style={styles.contentText} numberOfLines={1} >{item.country}</Text>
                                                        </View>
                                                        <View style={{ marginTop: hp(1) }} >
                                                            <Pressable activeOpacity={0.5} style={{ backgroundColor: 'red' }} onPress={() => {
                                                                console.log('pressed delete', item.city);

                                                                var formdata = new FormData();
                                                                formdata.append("id", item.id);

                                                                let headers = new Headers();
                                                                headers.append("Authorization", "Bearer " + global.token.trim());

                                                                const requestOptions = {
                                                                    method: 'POST',
                                                                    headers: headers,
                                                                    body: formdata
                                                                }
                                                                fetch('https://theaaura.com/api/v1/user/shipping/delete', requestOptions)
                                                                    .then(res => res.json())
                                                                    .then(response => {
                                                                        if (response.message === "Shipping information has been deleted") {
                                                                            // setAddress(response.data);
                                                                            setEditAddress(false);
                                                                            Alert.alert('', 'Shipping information has been deleted', [{ text: 'OK', onPress: () => { } }]);
                                                                            // setEditAddress(false);
                                                                            getAddress();
                                                                        } else {
                                                                            Alert.alert('Please try again later!');
                                                                        }
                                                                    }
                                                                    ).catch(err => { console.log(err); })
                                                            }} >
                                                                <AntDesign name="delete" size={wp(6)} color={Colors.violet} />
                                                            </Pressable>
                                                        </View>
                                                    </View>
                                                )
                                            }}
                                        />
                                        <View style={{ height: hp(2) }} />
                                        <Text style={styles.address} >ADD NEW SHIPPING ADDRESS</Text>
                                        <View style={styles.line} />
                                        <View style={{ height: hp(1) }} />
                                        <Text style={styles.contentText} >Enter Address</Text>
                                        <TextInput
                                            placeholder='Enter Address'
                                            style={styles.textInput}
                                            onChangeText={(text) => setNewAddress(text)}
                                        />
                                        <Text style={styles.contentText} >Enter City</Text>
                                        <TextInput
                                            placeholder='Enter City'
                                            style={styles.textInput}
                                            onChangeText={(text) => setNewCity(text)}
                                        />
                                        <Text style={styles.contentText} >Enter Country</Text>
                                        <TextInput
                                            placeholder='Enter Country'
                                            style={styles.textInput}
                                            onChangeText={(text) => setNewCountry(text)}
                                        />
                                        <Text style={styles.contentText} >Enter Phone</Text>
                                        <TextInput
                                            placeholder='Enter Phone'
                                            maxLength={10}
                                            style={styles.textInput}
                                            onChangeText={(text) => setNewPhone(text)}
                                        />
                                        <Text style={styles.contentText} >Enter Pincode</Text>
                                        <TextInput
                                            placeholder='Enter Pincode'
                                            maxLength={10}
                                            style={styles.textInput}
                                            onChangeText={(text) => setNewPincode(text)}
                                        />
                                        <View style={{ height: hp(2) }} />
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                            <Button title='cancel' style={styles.wishButton} buttontext={{ color: Colors.violet, textTransform: 'uppercase', }}
                                                onPress={() => {
                                                    setEditAddress(false)
                                                    setNewAddress(null)
                                                    setNewCity(null)
                                                    setNewCountry(null)
                                                    setNewPhone(null)
                                                    setNewPincode(null)
                                                }}
                                            />
                                            <Button title='save' style={styles.cartButton} buttontext={{ textTransform: 'uppercase', }}
                                                onPress={() => {
                                                    var formdata = new FormData();

                                                    formdata.append("user_id", global.userId);
                                                    formdata.append("address", newAddress);
                                                    formdata.append("city", newCity);
                                                    formdata.append("country", newCountry);
                                                    formdata.append("phone", newPhone);
                                                    formdata.append("postal_code", newPincode);


                                                    let headers = new Headers();
                                                    headers.append("Authorization", "Bearer " + global.token.trim());

                                                    const requestOptions = { method: 'POST', headers: headers, body: formdata };

                                                    fetch('https://theaaura.com/api/v1/user/shipping/create', requestOptions).then(res => res.json())
                                                        .then(response => {
                                                            if (response.message) {
                                                                setAddress(null);
                                                                setEditAddress(false);
                                                            } else {
                                                                console.log(response, 'this is res');
                                                            }
                                                        }
                                                        )
                                                        .catch(err => console.log(err))
                                                }}
                                            />
                                        </View>

                                    </View>
                                </View>
                            </KeyboardAvoidingView>
                        </Modal>
                    </View>
                }
                <View style={[styles.box, CommonStyle.shadow]} >
                    <Text style={styles.address} >Orders</Text>
                </View>
            </View>
            <View style={[styles.box, CommonStyle.shadow, { width: wp(95) }]} >
                <Text style={styles.address} >Wishlist</Text>
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    profileView: {
        width: wp(100),
        height: wp(50),
        backgroundColor: Colors.violet,
    },
    proPic: {
        height: hp(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleView: {
        width: wp(30),
        height: hp(15),
    },
    circleView2: {
        marginTop: hp(5),
        width: wp(37),
        height: hp(16),
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: wp(4),
        fontFamily: fonts.PL,
        color: Colors.white,
    },
    box: {
        width: wp(46),
        padding: wp(2),
        height: hp(15),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(2),
        borderWidth: wp(0.2),
        margin: wp(2),
        borderColor: Colors.greyLight,
        backgroundColor: Colors.white,
    },
    address: {
        fontFamily: fonts.PSB,
        fontSize: 16,
        color: Colors.black,
    },
    line: {
        height: hp(0.5),
        width: wp(15),
        backgroundColor: Colors.violet,
        borderRadius: wp(2),
        marginTop: hp(-0.4),
        marginBottom: hp(1)
    },
    contentText: {
        fontFamily: fonts.PL,
        fontSize: 13,
        color: Colors.black,
    },
    /// for modal
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modelView: {
        backgroundColor: Colors.white,
        width: wp(90),
        borderRadius: wp(3),
        paddingHorizontal: wp(2),
        paddingVertical: hp(2),
        borderWidth: wp(0.4),
        borderColor: Colors.violet,
    },
    textInput: {
        borderWidth: wp(0.3),
        borderColor: Colors.violet,
        color: Colors.black,
        paddingHorizontal: wp(3),
        borderRadius: wp(2),
        marginVertical: hp(0.5),
        height: hp(5),
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
    cards: {
        borderRadius: wp(2),
        borderWidth: wp(0.5),
        width: wp(30),
        marginHorizontal: wp(1),
    }
})