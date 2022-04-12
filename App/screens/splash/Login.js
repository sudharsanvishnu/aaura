import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, CommonStyle, fonts, hp, wp } from '../../utils/Constant'
import Button from '../../components/Button';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { baseURL } from '../../apiConstant.js';
import { isValidPhoneNo } from '../../utils/Helper';

const Login = ({ navigation }) => {

    const otpGenerate = (Math.floor(100000 + Math.random() * 900000));

    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [verifyOtp, setVerifyOtp] = useState(false);
    const [alert, setAlert] = useState(false);

    const API_CALL = () => {
        if (isValidPhoneNo(mobile)) {
            setAlert(false);

            const requestOptions = { method: 'POST' };
            fetch(baseURL + `api/v1/auth/mobile-login?phone=${mobile}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result) {
                        POPULATE_OTP();
                        setVerifyOtp(true)
                        console.log(result, 'this is result')
                        // Toast.showWithGravity('OTP request sent successfully!', Toast.LONG, Toast.BOTTOM);
                    } else {
                        // Toast.showWithGravity('please enter valid phone number', Toast.LONG, Toast.BOTTOM);
                        console.log('error invalid number')
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        } else {
            setAlert(true);
        }
    }

    const POPULATE_OTP = () => {
        fetch(`http://sms.kitkatsoftwaretechnologies.com/api/smsapi?key=e41a88a3f0792d262521edfdab0fcda1&route=1&sender=AAURAA&number=${mobile}&sms=${otpGenerate} is your AAURA code and is valid for 10 minutes. Do not share the OTP with anyone. www.theaaura.com Thanks for registering&templateid=1207161961868440043`, {
            method: "POST"
        })
        return POPULATE_OTP;
    }


    const EnterPhone = () => {
        return (
            <View style={[styles.loginView, CommonStyle.shadow]} >
                <Text style={styles.text} >Login with Mobile</Text>
                <TextInput
                    placeholder='Enter your Mobile Number'
                    onChangeText={text => setMobile(text)}
                    keyboardType='number-pad'
                    style={styles.textInput}
                    maxLength={10}
                />
                <Button title='SEND OTP' style={styles.button} press={mobile.length === 10 ? false : true} buttontext={styles.buttontext} onPress={() => {
                    API_CALL();
                }} />
            </View>
        )
    }

    const VerifyOtpScreen = () => {
        return (
            <View style={[styles.loginView, CommonStyle.shadow]} >
                <View style={{ marginTop: hp(5) }} />
                <Text style={styles.text2} >Enter OTP</Text>
                <Text style={styles.text2} >OTP sent successfully to {mobile} </Text>
                <SmoothPinCodeInput
                    codeLength={6}
                    value={otp}
                    autoFocus={true}
                    onTextChange={code => setOtp(code)}
                    cellStyle={{
                        borderRadius: hp(1),
                        backgroundColor: Colors.white,
                        borderColor: Colors.border,
                        borderWidth: wp(0.5),
                        height: hp(6.5),
                        width: wp(12.5),
                        marginTop: hp(5),
                    }}
                    cellStyleFocused={{
                        borderColor: Colors.black,
                    }}
                    keyboardType={'number-pad'}
                    cellSpacing={wp(2)}
                    textStyle={{
                        fontFamily: fonts.PR,
                        fontSize: hp(2.5),
                        color: Colors.black,
                    }}
                    onFulfill={code => {
                        Keyboard.dismiss();
                    }}
                />
                <Button title="LOGIN" style={[styles.button, { marginTop: hp(7) }]} onPress={() => navigation.replace('DrawerScreen')} />
            </View>
        )
    }

    return (
        <SafeAreaView>
            <View style={[CommonStyle.container, styles.container]} >
                <Image source={require('../../assets/image/new.png')} style={styles.logo} resizeMode="contain" />
                {verifyOtp ? VerifyOtpScreen() : EnterPhone()}
            </View>
        </SafeAreaView >
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    logo: {
        width: wp(50),
        height: hp(30),
        // backgroundColor: 'red',
    },
    loginView: {
        width: wp(100),
        height: hp(100),
        backgroundColor: '#fff',
        alignItems: 'center',
        borderTopLeftRadius: wp(20),
        // borderTopRightRadius: wp(20),
    },
    text: {
        color: Colors.violet,
        fontSize: wp(5),
        marginVertical: hp(5),
    },
    text2: {
        color: Colors.violet,
        fontSize: wp(5),
        marginVertical: hp(1),
    },
    textInput: {
        borderWidth: wp(0.3),
        borderColor: Colors.border2,
        paddingHorizontal: wp(3),
        borderRadius: wp(2),
        width: wp(60),
        height: hp(6),
    },
    button: {
        width: wp(30),
        height: hp(6),
        marginTop: hp(3),
    },
    buttontext: {
        fontSize: wp(4),
    }
})