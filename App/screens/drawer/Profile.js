import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity, Modal, TextInput, FlatList, KeyboardAvoidingView, Pressable, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, CommonStyle, fonts, hp, wp } from '../../utils/Constant'
import Header from '../../components/Header'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from '../../components/Button';
import { launchImageLibrary } from 'react-native-image-picker';


const Profile = ({ navigation }) => {

    // for rendering address
    const [address, setAddress] = useState(null);
    const [deleteAdd, setDeleteAdd] = useState(false);

    // https://theaaura.com/api/v1/user/info/91

    // for profile image
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const imageGalleryLaunch = () => {
        launchImageLibrary({ noData: true, mediaType: 'photo', includeBase64: true }, (response) => {
            if (response.assets) {
                setCoverPhoto(response.assets[0].uri);
                let chosenPhoto = response.assets[0];
                // setProfileBase64(response.assets[0].base64);
                let newFile = {
                    uri: Platform.OS === "android" ? chosenPhoto.uri : chosenPhoto.uri.replace("file://", ""),
                    type: chosenPhoto.type,
                    name: chosenPhoto.fileName,
                };
                let formdata = new FormData();
                formdata.append("file", newFile);
                // console.log(newFile, 'image type')

                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + global.token.trim());

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: formdata,
                    redirect: 'follow'
                };

                fetch('https://theaaura.com/api/v1/user/avatar/update', requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        console.log(result, 'this is result');
                        // console.log(result.id)
                    }
                    )
                    .catch(error => console.log('error', error));
            } else if (response.didCancel) {
                setCoverPhoto(null)
            }
        }
        )
    }

    const [user, setUser] = useState(null);
    useEffect(() => {
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + global.token.trim());

        const requestOptions = { method: 'GET', headers }

        fetch('https://theaaura.com/api/v1/user/info/', requestOptions).then(response => response.json()).then(response => {
            // console.log(response.data, 'this is user profile');
            setUser(response.data)
            console.log(response.data.shipping_address, 'user info');
        }).catch(err => console.log(err))

    }, [user])

    const userData = [
        { label: 'name', value: user?.name },
        { label: 'email', value: user?.email },
        { label: 'phone', value: user?.shipping_address?.phone },
        { label: 'address', value: user?.shipping_address?.address },
        { label: 'city', value: user?.shipping_address?.city },
        { label: 'country', value: user?.shipping_address?.country },
        { label: 'postal code', value: user?.shipping_address?.postal_code },
    ]

    useEffect(() => {
        getAddress();
    }, [address])

    const getAddress = () => {
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + global.token.trim());

        const requestOptions = { method: 'GET', headers: headers, redirect: 'follow' };

        fetch('https://theaaura.com/api/v1/user/shipping/address', requestOptions).then(response => response.json()).then(response => {
            setAddress(response.data)
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

    const [loader, setLoader] = useState(false);

    return (
        <View style={CommonStyle.container2}>
            <Header navigation={navigation} />
            <ScrollView>
                <View style={styles.profileView} >
                    <View style={styles.proPic} >
                        <View style={[styles.circleView2, CommonStyle.shadow]} >
                            <Pressable onPress={() => {
                                console.log('pressed profile icon');
                                imageGalleryLaunch();
                            }

                            } >
                                <Image source={
                                    coverPhoto === null ? require('../../assets/image/user.png') : { uri: coverPhoto }
                                } resizeMode='cover' style={styles.circleView} />
                            </Pressable>
                        </View>
                        <Text style={styles.name} >Profile</Text>
                    </View>
                    {/* // for pencil */}
                </View>
                <View style={{ marginHorizontal: wp(3), flexDirection: 'row' }} >
                    {user === null ? <ActivityIndicator size='large' color={Colors.violet} /> :
                        <FlatList
                            data={user}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ width: wp(100), marginHorizontal: wp(2), marginTop: hp(2), padding: wp(2), backgroundColor: Colors.visible }} >
                                        <View style={styles.contentView} >
                                            <Text style={styles.contentLeft} >Name</Text>
                                            <Text style={styles.contentRight} >{item.name}</Text>
                                        </View>
                                        <View style={styles.contentView} >
                                            <Text style={styles.contentLeft}  >Email</Text>
                                            <Text style={styles.contentRight}  >{item.email}</Text>
                                        </View>
                                        <View style={styles.contentView} >
                                            <Text style={styles.contentLeft}  >contact number</Text>
                                            <Text style={styles.contentRight}  >{item.phone}</Text>
                                        </View>
                                        <View style={styles.contentView} >
                                            <Text style={styles.contentLeft}  >Address</Text>
                                            <Text style={styles.contentRight} >{item.address}</Text>
                                        </View>
                                        <View style={styles.contentView} >
                                            <Text style={styles.contentLeft}  >city</Text>
                                            <Text style={styles.contentRight}  >{item.city}</Text>
                                        </View>
                                        <View style={styles.contentView} >
                                            <Text style={styles.contentLeft}  >country</Text>
                                            <Text style={styles.contentRight}  >{item.country}</Text>
                                        </View>
                                        <View style={styles.contentView} >
                                            <Text style={styles.contentLeft}  >post code</Text>
                                            <Text style={styles.contentRight}  >{item.postal_code}</Text>
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    }
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
                                                                {deleteAdd ? <ActivityIndicator size="small" color={Colors.violet} /> :
                                                                    <TouchableOpacity onPress={() => {
                                                                        console.log('pressed delete', item.city);
                                                                        setDeleteAdd(true);
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
                                                                                    // setEditAddress(false);
                                                                                    setDeleteAdd(false);
                                                                                    Alert.alert('', 'Shipping information has been deleted', [{ text: 'OK', onPress: () => { } }]);
                                                                                    // setEditAddress(false);
                                                                                    getAddress();
                                                                                } else {
                                                                                    setDeleteAdd(false);
                                                                                    Alert.alert('Please try again later!');
                                                                                }
                                                                            }
                                                                            ).catch(err => { console.log(err); })
                                                                    }} >
                                                                        <AntDesign name="delete" size={wp(6)} color={Colors.violet} />
                                                                    </TouchableOpacity>
                                                                }
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
                                                        console.log('pressed save')
                                                        setLoader(true);
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
                <View style={{ height: hp(10) }} />
            </ScrollView>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    contentView: {
        flexDirection: 'row',
        width: wp(90),
        // backgroundColor: 'green',
        marginVertical: hp(1),
        justifyContent: 'space-around'
    },
    contentLeft: {
        fontFamily: fonts.PM,
        color: Colors.black,
        // backgroundColor: 'yellow',
        width: wp(40),
        textTransform: 'uppercase',
        fontSize: 13,
    },
    contentRight: {
        fontFamily: fonts.PR,
        color: Colors.black,
        // backgroundColor: 'orange',
        fontSize: 13,
        width: wp(40)
    },
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