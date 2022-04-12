import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Colors, CommonStyle, fonts, hp, wp } from '../../utils/Constant'
import Header from '../../components/Header'

const Profile = ({ navigation }) => {
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
                <View style={[styles.box, CommonStyle.shadow]} >
                    <Text style={styles.address} >Address</Text>
                    <Text>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</Text>
                </View>
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
    }
})