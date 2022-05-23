import { TextInput, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Colors, CommonStyle, fonts, hp, wp } from '../../utils/Constant'
import ThreeTab from '../../components/ThreeTab';
import Button from '../../components/Button';
import Card from '../../components/Card';
import CartItem from '../../components/CartItem';
import AllInOneSDKManager from 'paytm_allinone_react-native';

const Cart = ({ navigation }) => {

    const [tab, setTab] = useState(0);

    const [editAdd, setEditAdd] = useState(false);

    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [country, setCountry] = useState();
    const [pincode, setPincode] = useState();


    // for cart items
    const [cartItems, setCartItems] = useState();

    useEffect(() => {
        // let headers = new Headers();
        // headers.append("Authorization", "Bearer " + global.token.trim());

        // const requestOptions = {
        //     method: 'GET',
        //     headers: headers,
        // };
        //          if (!isOrderIdUpdated) {
        //   generateOrderId();
        //   setOrderIdUpdated(true);
        // }

        //  startRawTransaction();

        // fetch('https://theaaura.com/api/v1/cartlist', requestOptions)
        //     .then(res => res.json())
        //     .then(response => {
        //         setCartItems(response.data)
        //         console.log(response.data, 'this is cart items')
        //     }
        //     ).catch(err => console.log(err))
    }, [])

    // Merchant id : VBieSA30751492066952

    // Merchant Key: pwXD0SypcdRAuAPw

    const [data, setData] = useState();

    let headers = new Headers();
    headers.append("Authorization", "Bearer " + global.token.trim());

    const requestOptions = {
        method: 'GET',
        headers: headers,
    }

    let [isOrderIdUpdated, setOrderIdUpdated] = useState(false);

    useEffect(() => {

        //     if (!isOrderIdUpdated) {
        generateOrderId();

        //      if(orderId!='ORDER1234'){
        // startRawTransaction();    
        // }

        //   setOrderIdUpdated(true);
        // }

        //     // fetch('https://theaaura.com', requestOptions).then(res => res.json())
        //     //     .then(response => {
        //     //         console.log(response, 'this is response')
        //     //         setData(response)
        //     //         console.log(data, 'this is res')
        //     //     }
        //     //     ).catch(err => console.log(err))


    }, [])

    // let [mid, setMid] = useState('PyFMbI23122449162864');
    let [mid, setMid] = useState('VBieSA30751492066952');
    let [orderId, setOrderId] = useState('ORDER1234');
    let [amount, setAmount] = useState('1.00');
    let [urlScheme, setURLScheme] = useState('');
    let [tranxToken, setTranxToken] = useState('');
    let [showToast, setShowToast] = useState('');
    let [isStaging, setIsStaging] = useState(false);
    let [appInvokeRestricted, setIsAppInvokeRestricted] = useState(true);
    let [result, setResult] = useState('');
    //let [callbackUrl,setcallbackUrl] = useState('https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=');
    let [callbackUrl, setcallbackUrl] = useState('https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=');

    const generateOrderId = () => {
        const r = Math.random() * new Date().getMilliseconds();
        setOrderId(
            'ORDER' +
            (1 + Math.floor(r % 2000) + 10000) +
            'b' +
            (Math.floor(r % 100000) + 10000),
        );




    };

    const startRawTransaction = async () => {


        fetch('https://theaaura.com/api/v1/paytmtoken/' + orderId + '/' + amount, requestOptions)
            .then(res => res.json())
            .then(response => {

                console.log('response-->', response);

                setTranxToken(response.head.signature);
                setcallbackUrl(callbackUrl + orderId);

                console.log(orderId,
                    mid,
                    response.body.txnToken,
                    amount,
                    //'https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID='+orderId,
                    'https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=' + orderId,
                    isStaging,
                    appInvokeRestricted,
                    urlScheme, '---->');
                AllInOneSDKManager.startTransaction(
                    orderId,
                    mid,
                    response.body.txnToken,
                    amount,
                    // 'https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID='+orderId,
                    'https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=' + orderId,
                    isStaging,
                    appInvokeRestricted,
                    urlScheme,
                )
                    .then((result) => {
                        console.log("result", result);
                        setShowToast(JSON.stringify(result));
                        setOrderIdUpdated(false);
                    })
                    .catch((err) => {
                        setResult(err);
                        setShowToast("Error: " + err);
                        setOrderIdUpdated(false);
                    });

                // setCartItems(response.data)
                // console.log(response.data, 'this is cart items')
            }
            ).catch(err => console.log(err))
        // setShowToast('');
        // setResult('');

    }

    const payNow = () => {

        let orderId = Math.floor(Math.random() * 100000);
        let amount = '250';
        mid = 'VBieSA30751492066952';
        callbackUrl = 'https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=' + orderId;
        let tranxToken = 'eJxVUtkPwjAUhf8q';

        console.log(orderId, amount, mid, callbackUrl, tranxToken, 'this is order id')


        // let newMid = 'PyFMbI23122449162864';
        // 1. orderId
        // 2. merchantId
        // 3. txnToken
        // 4. Amount
        // 5. callbackUrl
        // 6. isStaging
        // 7. appInvokeRestricted

        const orderDetails = {
            orderId: "Aaura031@#!",
            amount: "100.00",
            mid: "PyFMbI23122449162864",
            callbackUrl: "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=Aaura031",
            tranxToken: "WADE0003567887",
            isStaging: true,
            appInvokeRestricted: true,
            urlScheme: 'paytmMIDVBieSA30751492066952',
        };

        AllInOneSDKManager.startTransaction(
            orderDetails.orderId,
            orderDetails.mid,
            orderDetails.tranxToken,
            orderDetails.amount,
            orderDetails.callbackUrl,
            orderDetails.isStaging,
            orderDetails.appInvokeRestricted,
            orderDetails.urlScheme
        )
            .then((result) => {
                console.log(result, 'this is result');
            })
            .catch((err) => {
                handleError(err);
            });

    }


    const renderComponent = () => {
        if (tab === 0) {
            return (
                <>
                    <FlatList
                        data={cartItems}
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    {/* <Card item={item} /> */}
                                    <CartItem item={item} />
                                </View>
                            )
                        }}
                        ListFooterComponent={() => {
                            return (
                                <View style={{ height: hp(10) }} >
                                    {/* <Button title={'checkout'} onPress={() =>startRawTransaction()} /> */}
                                </View>
                            )
                        }}
                    />
                </>
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
                    <Text style={styles.textContent} >Order hsitory is empty</Text>
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
                        // { name: 'Address', value: 1 },
                        { name: 'Order History', value: 2 },
                    ]}
                />
            </View>
            {renderComponent()}
            <View style={{ flex: 1 }} />
            <TouchableOpacity onPress={() => startRawTransaction()} style={{ marginBottom: 20, alignSelf: "center" }}>
                <Text>Place Order</Text>
            </TouchableOpacity>
            <Button title="PLACE ORDER" style={{ height: hp(6), marginHorizontal: wp(3), marginBottom: hp(5) }} onPress={() => startRawTransaction()} />
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