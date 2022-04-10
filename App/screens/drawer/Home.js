import { StyleSheet, ScrollView, Pressable, TextInput, Text, Image, View, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import Header from '../../components/Header'
import { Colors, CommonStyle, fonts, hp, wp } from '../../utils/Constant'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Card from '../../components/Card';


const Home = ({ navigation }) => {


    const isCarousel = useRef(1)
    const [index, setIndex] = useState(0);


    const car = [
        { imgUrl: require('../../assets/image/icon.jpg'), title: ' shopping shopping  ', price: 'Rs.99999', actualPrice: 'Rs 99999' },
        { imgUrl: require('../../assets/image/icon.jpg'), title: ' shopping shopping ', price: 'Rs.99999', actualPrice: 'Rs 99999' },
        { imgUrl: require('../../assets/image/icon.jpg'), title: ' shopping shopping ', price: 'Rs.99999', actualPrice: 'Rs 99999' },
        { imgUrl: require('../../assets/image/icon.jpg'), title: ' shopping shopping ', price: 'Rs.99999', actualPrice: 'Rs 99999' },
        { imgUrl: require('../../assets/image/icon.jpg'), title: ' shopping shopping ', price: 'Rs.99999', actualPrice: 'Rs 99999' },
        { imgUrl: require('../../assets/image/icon.jpg'), title: ' shopping shopping ', price: 'Rs.99999', actualPrice: 'Rs 99999' },
    ]

    const CarouselCardItem = ({ item, index }) => {
        return (
            <View style={styles.imgContainer} key={index}>
                <Image
                    source={item.imgUrl}
                    style={styles.img}
                // resizeMode='cover'
                />
            </View>
        )
    }

    const Separator = ({ title, onPress }) => {
        return (
            <View style={styles.separator} >
                <Text style={styles.title} >{title}</Text>
                <Pressable onPress={onPress}>
                    <Text style={styles.seeAll}  >SEE ALL</Text>
                </Pressable>
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
                    autoplay={true}
                    loop={true}
                    autoplayDelay={1000}
                    sliderWidth={wp(100)}
                    itemWidth={wp(100)}
                    renderItem={CarouselCardItem}
                    layout={'stack'}
                    onSnapToItem={(index) => setIndex(index)}
                />
                <Separator title="category" />
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={car}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.circleView} >
                                <Image source={item.imgUrl} style={styles.circle} />
                                <Text style={styles.catSubTitle} >{item.title}</Text>
                            </View>
                        )
                    }}
                    numColumns={3}
                />
                <Separator title="today's deal" />
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={car}
                    renderItem={({ item, index }) => {
                        return (
                            <View >
                                <Card item={item} />
                            </View>
                        )
                    }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
                <Carousel
                    data={car}
                    useScrollView={true}
                    ref={isCarousel}
                    autoplay={true}
                    loop={true}
                    autoplayDelay={1000}
                    sliderWidth={wp(100)}
                    itemWidth={wp(100)}
                    renderItem={CarouselCardItem}
                    layout={'tinder'}
                    onSnapToItem={(index) => setIndex(index)}
                />
                <Separator title='featured products' />
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={car}
                    renderItem={({ item, index }) => {
                        return (
                            <View >
                                <Card item={item} />
                            </View>
                        )
                    }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
                <Separator title='best selling' />
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={car}
                    renderItem={({ item, index }) => {
                        return (
                            <View >
                                <Card item={item} />
                            </View>
                        )
                    }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
                <Separator title="women's fashion" />

                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={car}
                    renderItem={({ item, index }) => {
                        return (
                            <View >
                                <Card item={item} />
                            </View>
                        )
                    }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
                <Separator title='accessories' />
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={car}
                    renderItem={({ item, index }) => {
                        return (
                            <View >
                                <Card item={item} />
                            </View>
                        )
                    }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
                <Separator title='snacks' />

                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={car}
                    renderItem={({ item, index }) => {
                        return (
                            <View >
                                <Card item={item} />
                            </View>
                        )
                    }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
                <View style={{ height: hp(40) }} />
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
    imgContainer: {
        width: wp(93),
        height: hp(30),
        marginBottom: hp(3)
    },
    img: {
        width: wp(93),
        height: hp(30),
        margin: wp(3),
        borderRadius: wp(2),
    },
    separator: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp(5)
    },
    title: {
        fontFamily: fonts.PM,
        fontSize: 16,
        color: Colors.black,
        textTransform: 'uppercase',
    },
    seeAll: {
        fontFamily: fonts.PM,
        color: Colors.violet
    },
    circleView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(31),
        height: hp(16),
        margin: wp(1),
    },
    circle: {
        width: wp(22),
        height: wp(22),
        borderRadius: wp(11.5),
    },
    catSubTitle: {
        fontFamily: fonts.PM,
        fontSize: wp(3),
    }
})