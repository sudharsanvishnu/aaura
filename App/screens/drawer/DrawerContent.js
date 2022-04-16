import { StyleSheet, Text, View, Pressable, Image, ImageBackground, Modal } from 'react-native'
import React, { useState } from 'react'
import { Colors, fonts, hp, wp } from '../../utils/Constant'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Storage } from '../../local storage';
import AsynchStoragekey from '../../local storage/AsyncStorage';
import Button from '../../components/Button';

const DrawerContent = ({ props, navigation }) => {

    const [isVisible, setIsVisible] = useState(false);

    const [sideMenu, setSideMenu] = useState([
        { title: 'Home', icon: 'home', iconFamily: AntDesign, nav: 'Home', size: wp(5) },
        // { title: 'Shop by category', icon: 'shop', iconFamily: Entypo, nav: 'Shop', size: wp(5) },
        { title: "Today's Deals", icon: 'local-offer', iconFamily: MaterialIcons, nav: 'TodayDeals', size: wp(5) },
        { title: 'Top Brands', icon: 'local-offer', iconFamily: MaterialIcons, nav: 'TopBrands', size: wp(5) },
        { title: 'Shop Details', icon: 'shop', iconFamily: Entypo, nav: 'Shop details', size: wp(5) },
        { title: 'Cart', icon: 'cart', iconFamily: EvilIcons, nav: 'Cart', size: wp(5) },
        { title: 'Your Profile', icon: 'profile', iconFamily: AntDesign, nav: 'Profile', size: wp(5) },
        { title: 'Your Orders', icon: 'shopping-package', iconFamily: Fontisto, nav: 'Orders', size: wp(5) },
        { title: 'Wishlist', icon: 'heart', iconFamily: EvilIcons, nav: 'Wishlist', size: wp(5) },
        { title: 'Sell on Aaura', icon: 'money', iconFamily: MaterialIcons, nav: 'Sell', size: wp(5) },
        { title: 'Notification', icon: 'bell', iconFamily: EvilIcons, nav: 'Notification', size: wp(5) },
        { title: 'Help center', icon: 'help-outline', iconFamily: MaterialIcons, nav: 'Help', size: wp(5) },
        { title: 'Chats', icon: 'chat-bubble-outline', iconFamily: MaterialIcons, nav: 'Chats', size: wp(5) },
        { title: 'Privacy Policy', icon: 'privacy-tip', iconFamily: MaterialIcons, nav: 'Privacy', size: wp(5) },
        { title: 'Legal', icon: 'legal', iconFamily: FontAwesome, nav: 'Home', size: wp(5) },
        { title: 'Logout', icon: 'logout', iconFamily: MaterialIcons, nav: 'Home', size: wp(5) },
    ])

    const [selectedItem, setSelectedItem] = useState();

    return (
        <View style={{ flex: 1 }} >
            <DrawerContentScrollView  {...props} >
                <View style={{
                    height: hp(15),
                    marginHorizontal: wp(6)
                }} >
                    <ImageBackground source={require('../../assets/image/newlogo.png')}
                        resizeMode='contain'
                        style={styles.logo}
                    />
                </View>

                {
                    sideMenu.map((item, index) => {
                        return (
                            <Pressable key={item} onPress={() => {
                                setSelectedItem(item);
                                if (item.title === 'Logout') {
                                    setIsVisible(true);
                                } else if (item.title === 'Reviews') {
                                    setRatingVisible(true);
                                } else {
                                    navigation.navigate(item.nav);
                                }
                            }
                            } >
                                <View style={item === selectedItem ? styles.activeTabs : styles.inactiveTabs} >
                                    <item.iconFamily
                                        style={{
                                            width: wp(10),
                                            marginLeft: wp(2),
                                            justifyContent: 'center',
                                            alignSelf: 'center',
                                            // tintColor: item === selectedItem ? Colors.white : Colors.black
                                        }}
                                        size={item.size}
                                        name={item.icon}
                                        resizeMode='contain'
                                        color={item === selectedItem ? Colors.white : Colors.black}
                                    />
                                    <Text style={item === selectedItem ? styles.textWhite : styles.textOrange} >{item.title}</Text>
                                </View>
                            </Pressable>
                        )
                    })
                }
            </DrawerContentScrollView>
            {/* for logout */}
            <Modal animationType="fade" transparent={true} visible={isVisible}>
                <View style={styles.modalContainer} >
                    <View style={styles.modal} >
                        <View style={styles.contentText}  >
                            <Text style={styles.added} >Are you sure want to logout? </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }} >
                            <Button title="NO" style={styles.button1} buttontext={styles.buttontext} onPress={() => setIsVisible(false)} />
                            <Button title="YES" style={styles.button} onPress={() => {
                                setIsVisible(false)
                                Storage.removeItem(AsynchStoragekey.bearer);
                                global.token = '';
                                navigation.replace('Login')
                            }} />
                        </View>
                    </View>
                </View>
            </Modal >
        </View>
    )
}

export default DrawerContent;

const styles = StyleSheet.create({
    logo: {
        height: hp(15),
    },
    activeTabs: {
        backgroundColor: Colors.violet,
        flexDirection: 'row',
        height: hp(6),
        alignItems: 'center',
        marginHorizontal: wp(2),
        borderRadius: wp(2),
    },
    inactiveTabs: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        height: hp(6),
        marginHorizontal: wp(2),
        borderRadius: wp(2),
        alignItems: 'center',
    },
    textWhite: {
        fontFamily: fonts.PM,
        color: Colors.white,
        fontSize: 14,
    },
    textOrange: {
        fontFamily: fonts.PM,
        color: Colors.black,
        fontSize: 14,
    },

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
        margin: wp(2),
        textAlign: 'center',
    },
    reviewCount: {
        fontFamily: fonts.PL,
        color: Colors.black,
        fontSize: 12,
    },
    button1: {
        width: wp(30),
        margin: wp(2),
        height: hp(6),
        backgroundColor: Colors.white,
        borderRadius: 8,
        borderWidth: wp(0.4),
        borderColor: Colors.violet
    },
    buttontext: {
        color: Colors.violet,
        fontFamily: fonts.PSB
    },
    button: {
        width: wp(30),
        margin: wp(2),
        height: hp(6)
    },

})