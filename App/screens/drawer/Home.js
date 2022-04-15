import { StyleSheet, ScrollView, Pressable, TextInput, Text, Image, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import Header from '../../components/Header'
import { Colors, CommonStyle, fonts, hp, wp } from '../../utils/Constant'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Card from '../../components/Card';
import { acc } from 'react-native-reanimated';


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

    // for api data
    const [banner, setBanner] = useState(null);
    const [category, setCategory] = useState(null);
    const [today, setToday] = useState(null);
    const [featured, setFeatured] = useState(null);
    const [bestSelling, setBestSelling] = useState(null);
    const [womens, setWomens] = useState(null);
    const [snack, setSnack] = useState(null);
    const [acc, setAcc] = useState(null);
    // for view all
    const [todayView, setTodayView] = useState(2);
    const [featuredView, setFeaturedView] = useState(2);
    const [bestSellingView, setBestSellingView] = useState(2);
    const [womensView, setWomensView] = useState(2);
    const [snackView, setSnackView] = useState(2);
    const [accView, setAccView] = useState(2);
    // banner
    useEffect(() => {
        const bannerData = () => {
            fetch('https://theaaura.com/api/v1/banners').then(response => response.json()).then(response => {
                setBanner(response.data)
            }).catch(err => console.log(err))
        }

        return bannerData()
    }, [banner, setBanner,])
    // category
    useEffect(() => {
        const category = () => {
            fetch('https://theaaura.com/api/v1/home-categories').then(response => response.json()).then(response => {
                setCategory(response.data)
            }).catch(err => console.log(err))
        }
        return category()
    }, [category, setCategory])

    // deals
    useEffect(() => {
        const deal = () => {
            fetch('https://theaaura.com/api/v1/products/todays-deal').then(response => response.json()).then(response => {
                setToday(response.data)
            }).catch(err => console.log(err))
        }
        return deal()
    }, [today, setToday])

    // featured
    useEffect(() => {
        const featured1 = () => {
            fetch('https://theaaura.com/api/v1/products/featured').then(response => response.json()).then(response => {
                setFeatured(response.data)
            }).catch(err => console.log(err))
        }
        return featured1()
    }, [featured, setFeatured])

    // best selling
    useEffect(() => {
        const bestSelling1 = () => {
            fetch('https://theaaura.com/api/v1/products/best-seller').then(response => response.json()).then(response => {
                setBestSelling(response.data)
            }).catch(err => console.log(err))
        }
        return bestSelling1()
    }, [bestSelling, setBestSelling])

    useEffect(() => {
        const fashion = () => {
            fetch('https://theaaura.com/api/v1/category/products').then(response => response.json()).then(response => {
                setWomens(response.data[1].products)
                setAcc(response.data[11].products)
                setSnack(response.data[15].products)
            }).catch(err => console.log(err))
        }
        return fashion()
    }, [womens, setWomens, setAcc, setSnack, snack, acc])


    const CarouselCardItem = ({ item, index }) => {
        return (
            <View style={styles.imgContainer} key={index}>
                <Image source={{ uri: item.photo }} style={styles.img} />
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
                {banner === null ? <ActivityIndicator size="large" color={Colors.violet} /> :
                    <Carousel
                        data={banner}
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
                }
                <Separator title="category" />
                {category === null ? <ActivityIndicator size="large" color={Colors.violet} /> :
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={category}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.circleView} >
                                    <Pressable onPress={() => navigation.navigate('Cards', item)} >
                                        <Image source={{ uri: item.icon }} style={styles.circle} />
                                        <Text style={styles.catSubTitle} >{item.name}</Text>
                                    </Pressable>
                                </View>
                            )
                        }}
                        numColumns={3}
                    />
                }
                <Separator title="today's deal" onPress={() => setTodayView(todayView + 4)} />
                {today === null ? <ActivityIndicator size="large" color={Colors.violet} /> :
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={today?.slice(0, todayView)}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Product detail', item)} >
                                    <Card item={item} />
                                </TouchableOpacity>
                            )
                        }}
                        numColumns={2}
                    />
                }
                <Carousel
                    data={banner}
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
                <Separator title='featured products' onPress={() => setFeaturedView(featuredView + 4)} />
                {featured === null ? <ActivityIndicator size="large" color={Colors.violet} /> :
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={featured?.slice(0, featuredView)}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Product detail', item)} >
                                    <Card item={item} />
                                </TouchableOpacity>
                            )
                        }}
                        numColumns={2}
                    />
                }
                <Separator title='best selling' onPress={() => setBestSellingView(bestSellingView + 4)} />
                {bestSelling === null ? <ActivityIndicator size="large" color={Colors.violet} /> :

                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={bestSelling?.slice(0, bestSellingView)}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Product detail', item)} >
                                    <Card item={item} />
                                </TouchableOpacity>
                            )
                        }}
                        numColumns={2}

                    />
                }
                <Separator title="women's fashion" onPress={() => setWomensView(womensView + 4)} />
                {womens === null ? <ActivityIndicator size="large" color={Colors.violet} /> :
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={womens?.slice(0, womensView)}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Product detail', item)} >
                                    <Card item={item} />
                                </TouchableOpacity>
                            )
                        }}
                        numColumns={2}
                    />
                }
                <Separator title='accessories' onPress={() => setAccView(accView + 4)} />
                {acc === null ? <ActivityIndicator size="large" color={Colors.violet} /> :
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={acc?.slice(0, accView)}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Product detail', item)} >
                                    <Card item={item} />
                                </TouchableOpacity>
                            )
                        }}
                        numColumns={2}
                    />
                }
                <Separator title='snacks' onPress={() => setSnackView(snackView + 4)} />
                {snack === null ? <ActivityIndicator size="large" color={Colors.violet} /> :
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={snack?.slice(0, snackView)}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Product detail', item)} >
                                    <Card item={item} />
                                </TouchableOpacity>
                            )
                        }}
                        numColumns={2}
                    />
                }
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
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: hp(1),
        // backgroundColor: 'white'
    }
})