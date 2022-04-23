import { TextInput, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Colors, CommonStyle, fonts, hp, wp } from '../../utils/Constant'
import ThreeTab from '../../components/ThreeTab';
import Button from '../../components/Button';

const Cart = ({ navigation }) => {

    const [tab, setTab] = useState(0);

    const [editAdd, setEditAdd] = useState(false);

    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [country, setCountry] = useState();
    const [pincode, setPincode] = useState();


    useEffect(() => {

        let headers = new Headers();
        headers.append("Authorization", "Bearer " + global.token.trim());

        const requestOptions = {
            method: 'GET',
            headers: headers,
        };

        fetch('https://theaaura.com/api/v1/carts/91' + global.userId, requestOptions)
            .then(res => res.json())
            .then(response => {
                console.log(response, 'this is cart items')
            }
            ).catch(err => console.log(err))
    }, [])

    const renderComponent = () => {
        if (tab === 0) {
            return (
                <View style={styles.center} >
                    <Text style={styles.textContent} >  Your cart is empty</Text>
                </View>
            )
        } else if (tab === 1) {
            return (
                <View>
                    {editAdd ?
                        <View style={styles.EditView} >
                            <Text style={styles.addTitle} >Name</Text>
                            <TextInput placeholder='' onChangeText={(text) => setName(text)} style={styles.addInput} />
                            <Text style={styles.addTitle} >Address Line</Text>
                            <TextInput placeholder='' onChangeText={(text) => setAddress(text)} style={styles.addInput} />
                            <Text style={styles.addTitle} >City</Text>
                            <TextInput placeholder='' onChangeText={(text) => setCity(text)} style={styles.addInput} />
                            <Text style={styles.addTitle} >State</Text>
                            <TextInput placeholder='' onChangeText={(text) => setState(text)} style={styles.addInput} />
                            <Text style={styles.addTitle} >Country</Text>
                            <TextInput placeholder='' onChangeText={(text) => setCountry(text)} style={styles.addInput} />
                            <Text style={styles.addTitle} >Pincode</Text>
                            <TextInput placeholder='' onChangeText={(text) => setPincode(text)} style={styles.addInput} />
                            <View style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: hp(3), flexDirection: 'row' }} >
                                <Button title="CANCEL" style={styles.inverButton} buttontext={{ color: Colors.violet }} />
                                <Button title="SAVE" style={styles.button} onPress={() => setEditAdd(false)} />
                            </View>
                        </View>
                        :
                        <View style={styles.center} >
                            <Text style={styles.textContent} >Shipping address</Text>
                            <Button title="ADD ADDRESS" style={styles.button} onPress={() => setEditAdd(true)} />
                        </View>
                    }
                </View>
            )
        } else {
            return (
                <View style={styles.center} >
                    <Text style={styles.textContent} >Payment is empty</Text>
                </View>
            )
        }
    }


    return (
        <View style={CommonStyle.container2} >
            <Header navigation={navigation} />
            <View style={styles.topTab} >
                <ThreeTab
                    currentTab={tab}
                    setCurrentTab={index => setTab(index)}
                    data={[
                        { name: 'Cart', value: 0 },
                        { name: 'Address', value: 1 },
                        { name: 'Payment', value: 2 },
                    ]}
                />
            </View>
            {renderComponent()}
        </View>
    )
}

export default Cart

const styles = StyleSheet.create({
    topTab: {
        flexDirection: 'row',
        marginTop: hp(1),
        marginHorizontal: wp(7),
        // alignItems: 'center',
        justifyContent: 'space-between',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(100)
    },
    textContent: {
        fontSize: 16,
        fontFamily: fonts.PSB,
        color: Colors.black
    },
    button: {
        width: wp(30),
        height: hp(4),
    },
    inverButton: {
        width: wp(30),
        height: hp(4),
        backgroundColor: Colors.white,
        borderRadius: wp(2),
        borderColor: Colors.violet,
        borderWidth: wp(0.2),
    },
    EditView: {
        paddingHorizontal: wp(4),
        marginTop: hp(2)
    },
    addTitle: {
        fontFamily: fonts.PR,
        fontSize: 14,
        color: Colors.black,
        marginTop: hp(2)
    },
    addInput: {
        borderRadius: wp(2),
        borderWidth: wp(0.2),
        borderColor: Colors.greyLight,
        height: hp(4),
        // width: wp()
    }
})