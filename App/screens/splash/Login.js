import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable, TouchableOpacity, Alert, Modal, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, CommonStyle, fonts, height, hp, wp } from '../../utils/Constant'
import Button from '../../components/Button';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { baseURL } from '../../apiConstant.js';
import { Icon } from 'react-native-elements';
import { isValidPhoneNo } from '../../utils/Helper';
import AsynchStoragekey from '../../local storage/AsyncStorage';
import { Storage } from '../../local storage/index';

const Login = ({ navigation }) => {

    const otpGenerate = (Math.floor(100000 + Math.random() * 900000));


    const [verifyOtp, setVerifyOtp] = useState(true);

    // for login
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showLogin, setShowLogin] = useState(true);

    // for register
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);

    // for reset password
    const [reset, setReset] = useState(false);
    const [resetEmail, setResetEmail] = useState('');


    const EnterPhone = () => {
        return (
            <View style={[styles.register, CommonStyle.shadow]} >
                <Text style={styles.text} >Register</Text>
                <Text style={styles.title} >Name</Text>
                <TextInput
                    placeholder='Enter your name '
                    onChangeText={text => setName(text)}
                    style={styles.textInput}
                    maxLength={10}
                />
                <Text style={styles.title} >Email</Text>
                <TextInput
                    placeholder='Enter your email address'
                    onChangeText={text => setEmail(text)}
                    style={styles.textInput}
                />
                <Text style={styles.title} >Mobile</Text>
                <TextInput
                    placeholder='Enter your mobile number '
                    onChangeText={(text) => setPhone(text)}
                    style={styles.textInput}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                    <Text style={styles.title} >Password </Text>
                    <Text style={styles.lastline} >{password.length < 6 ? 'must be 6 chatacters' : ''}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <TextInput
                        placeholder='Enter your password'
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={showPassword}
                        style={styles.textInput}
                        maxLength={10}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ alignItems: 'center', height: hp(4), marginLeft: wp(-10), width: wp(10) }} >
                        <Icon color={Colors.violet} name='eye' type='font-awesome' size={wp(5)} style={{ marginTop: hp(0.5) }} />
                    </TouchableOpacity>
                </View>
                <View style={{ height: hp(2) }} />
                <TextInput
                    placeholder='Enter your password again'
                    style={[styles.textInput, {
                        borderColor: password === confirmPassword ? Colors.violet : 'red',
                    }]}
                    onChangeText={text => setConfirmPassword(text)} secureTextEntry={true} />
                <Button title='REGISTER' style={[styles.button, CommonStyle.shadow]} press={password === confirmPassword ? false : true} buttontext={styles.buttontext} onPress={() => {
                    var formdata = new FormData();

                    formdata.append("name", name);
                    formdata.append("email", email);
                    formdata.append("password", password);
                    formdata.append('phone', phone);

                    const requestOptions = {
                        method: 'POST',
                        body: formdata,
                        redirect: 'follow'
                    };

                    fetch('https://theaaura.com/api/v1/auth/signup', requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            console.log(result, 'register')
                            if (result.message === 'Registration Successful. Please verify and log in to your account.') {
                                setVerifyOtp(true);
                            } else {
                                Alert.alert(result.message);
                            }
                        }
                        )
                        .catch(error => console.log('error', error));
                }} />
                <TouchableOpacity activeOpacity={0.6} style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp(2) }}
                    onPress={() => {
                        setVerifyOtp(true);
                    }}
                >
                    <Text style={styles.lastline} >Already have an account ?<Text style={styles.title} > LOGIN</Text> </Text>
                </TouchableOpacity>
            </View>
        )
    }

    const VerifyOtpScreen = () => {
        return (
            <View style={[styles.loginView, CommonStyle.shadow]} >
                <View style={{ marginTop: hp(5) }} />
                <Text style={styles.text} >LOGIN</Text>
                <Text style={styles.title} >Email</Text>
                <TextInput
                    placeholder='Enter your email address'
                    onChangeText={text => setLoginEmail(text)}
                    style={styles.textInput}
                />
                <Text style={[styles.title, { marginTop: hp(2) }]} >Password</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <TextInput
                        placeholder='Enter your password'
                        onChangeText={text => setLoginPassword(text)}
                        style={styles.textInput}
                        secureTextEntry={showLogin}
                    />
                    <TouchableOpacity onPress={() => setShowLogin(!showLogin)} style={{ alignItems: 'center', height: hp(4), marginLeft: wp(-10), width: wp(10) }} >
                        <Icon color={Colors.violet} name='eye' type='font-awesome' size={wp(5)} style={{ marginTop: hp(0.5) }} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }} onPress={() => setReset(true)} >
                    <Text style={[styles.lastline, { marginTop: hp(1) }]} >Reset Password ?</Text>
                </TouchableOpacity>
                <Button title="LOGIN" style={[styles.button, { marginTop: hp(3) }, CommonStyle.shadow3]} onPress={() => {
                    // navigation.replace('DrawerScreen')
                    var formdata = new FormData();

                    formdata.append("email", loginEmail);
                    formdata.append("password", loginPassword);

                    const requestOptions = {
                        method: 'POST',
                        body: formdata,
                        redirect: 'follow'
                    };

                    fetch('https://theaaura.com/api/v1/auth/login', requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            if (result.access_token) {
                                global.userId = result.user.id;
                                global.token = result.access_token;
                                Storage.setItem(AsynchStoragekey.bearer, result);
                                Storage.setItem(AsynchStoragekey.userId, result.user.id);
                                navigation.replace('DrawerScreen');
                            } else {
                                Alert.alert(result.message, 'Username or password is incorrect');
                            }
                        }
                        )
                        .catch(error => console.log('error', error));
                }} />
                <TouchableOpacity activeOpacity={0.6} onPress={() => setVerifyOtp(false)} style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} >
                    <Text style={styles.lastline} >New to Aaura ?<Text style={styles.title} > Register here..</Text> </Text>
                </TouchableOpacity>
                {/* for reset password */}
                <Modal animationType="fade" transparent={true} visible={reset}>
                    <View style={styles.modalContainer} >
                        <View style={styles.modal} >
                            <View style={styles.contentText}  >
                                <Text style={styles.added} >Enter your Registered Email ID</Text>
                            </View>
                            <TextInput
                                placeholder='Enter your email address'
                                onChangeText={text => setResetEmail(text)}
                                selectionColor={Colors.violet}
                                style={styles.textInput}
                            />
                            <Button title="SEND RESET LINK" style={styles.button} onPress={() => {
                                var formdata = new FormData();
                                formdata.append("email", resetEmail);

                                const requestOptions = {
                                    method: 'POST',
                                    body: formdata,
                                };

                                fetch('https://theaaura.com/api/v1/auth/password/create', requestOptions).then(response => response.json()).then(result => {
                                    if (result.message === 'Password reset link sent to your email address.') {
                                        setReset(false);
                                        Alert.alert(result.message);
                                    } else {
                                        setReset(false);
                                        Alert.alert(result.message);
                                    }
                                }).catch(error => console.log('error', error));
                            }} />
                        </View>
                    </View>
                </Modal >
            </View >
        )
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"} >
            <View style={[CommonStyle.container, styles.container]} >
                <Image source={require('../../assets/image/new.png')} style={styles.logo} resizeMode="contain" />
                {verifyOtp ? VerifyOtpScreen() : EnterPhone()}
            </View>
        </KeyboardAvoidingView>
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
        // height: hp(100),
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: wp(10),
        borderTopLeftRadius: wp(20),
        // borderTopRightRadius: wp(40),
        borderWidth: wp(1.4),
        borderColor: Colors.violet
    },
    register: {
        width: wp(100),
        // height: hp(100),
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: wp(10),
        marginTop: hp(-4),
        borderTopLeftRadius: wp(20),
        // borderTopRightRadius: wp(40),
        borderWidth: wp(1.4),
        borderColor: Colors.violet
    },
    text: {
        color: Colors.violet,
        fontSize: wp(5),
        fontFamily: fonts.PSB,
        marginTop: hp(4),
    },
    title: {
        color: Colors.violet,
        fontSize: 14,
        marginVertical: hp(0.5),
        fontFamily: fonts.PSB,
    },
    text2: {
        color: Colors.violet,
        fontSize: wp(5),
        marginVertical: hp(1),
    },
    textInput: {
        borderWidth: wp(0.3),
        borderColor: Colors.violet,
        color: Colors.black,
        paddingHorizontal: wp(3),
        borderRadius: wp(2),
        width: wp(80),
        height: hp(6),
    },
    button: {
        width: wp(80),
        height: hp(6),
        marginTop: hp(3),
    },
    buttontext: {
        fontSize: wp(4),
    },
    lastline: {
        fontFamily: fonts.PL,
        color: Colors.violet,
        fontSize: 12,
    },

    // for reset pass
    // for logout
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modal: {
        width: wp(90),
        borderRadius: 11,
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
    },
    added: {
        fontFamily: fonts.PSB,
        color: Colors.black,
        width: wp(70),
        fontSize: 16,
        marginBottom: hp(2),
        margin: wp(2),
        textAlign: 'center',
    },
})