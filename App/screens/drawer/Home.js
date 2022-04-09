import { StyleSheet, ScrollView, TextInput, Text, Image, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Header from '../../components/Header'
import { Colors, CommonStyle, hp, wp } from '../../utils/Constant'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const Home = ({ navigation }) => {


    const isCarousel = useRef(null)
    const [index, setIndex] = useState(0);


    const car = [
        { imgUrl: require('../../assets/image/icon.jpg') },
        { imgUrl: require('../../assets/image/icon.jpg') },
        { imgUrl: require('../../assets/image/icon.jpg') },
        { imgUrl: require('../../assets/image/icon.jpg') },
        { imgUrl: require('../../assets/image/icon.jpg') },
        { imgUrl: require('../../assets/image/icon.jpg') },
        { imgUrl: require('../../assets/image/icon.jpg') },
    ]

    const CarouselCardItem = ({ item, index }) => {
        return (
            <View key={index}>
                <Image
                    source={item.imgUrl}
                    style={styles.img}
                    resizeMode='contain'
                />
            </View>
        )
    }
    return (
        <View style={CommonStyle.container2} >
            <Header navigation={navigation} />
            <ScrollView>
                <View style={styles.searchView} >
                    <View style={styles.searchBar} >
                        <EvilIcons name="search" size={wp(5)} color={Colors.violet} style={styles.searchIcon} />
                        <TextInput
                            placeholder='Search'
                            placeholderTextColor={Colors.violet}
                            style={styles.search}
                        />
                        <EvilIcons name="camera" size={wp(6)} color={Colors.violet} style={styles.cameraIcon} />
                        <Feather name="mic" size={wp(3.9)} color={Colors.violet} style={styles.micIcon} />
                    </View>
                </View>
                <Carousel
                    data={car}
                    useScrollView={true}
                    ref={isCarousel}
                    sliderWidth={wp(100)}
                    itemWidth={wp(100)}
                    renderItem={CarouselCardItem}
                    onSnapToItem={(index) => setIndex(index)}
                />

                <Pagination
                    dotsLength={car.length}
                    activeDotIndex={index}
                    carouselRef={isCarousel}
                    dotStyle={{
                        width: wp(5),
                        height: hp(0.5),
                        borderRadius: wp(2),
                        marginBottom: hp(2),
                        backgroundColor: Colors.violet
                    }}
                    inactiveDotStyle={{ color: Colors.grey }}
                    inactiveDotColor={{ backgroundColor: Colors.grey }}
                    inactiveDotOpacity={0.3}
                    inactiveDotScale={1}
                    tappableDots={true}
                />
            </ScrollView>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    searchView: {
        backgroundColor: Colors.violet,
        height: hp(6.5),
    },
    search: {
        // backgroundColor: 'red',
        width: wp(70),
        textAlignVertical: 'center',
    },
    searchBar: {
        backgroundColor: Colors.white,
        margin: wp(2),
        paddingHorizontal: wp(2),
        borderRadius: wp(3),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    img: {
        width: wp(93),
        height: hp(30),
        margin: wp(3),
        borderRadius: wp(2),
        backgroundColor: 'green'
    },
})