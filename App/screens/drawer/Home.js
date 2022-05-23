import { StyleSheet, ScrollView, Pressable, TextInput, Text, Image, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import Header from '../../components/Header'
import { Colors, CommonStyle, fonts, hp, wp } from '../../utils/Constant'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Card from '../../components/Card';
import { acc } from 'react-native-reanimated';
import { Storage } from '../../local storage';


const Home = ({ navigation }) => {

    const isCarousel = useRef(1)
    const [index, setIndex] = useState(0);


    // for search
    const [searchText, setSearchText] = useState('');
    const [loaderSearch, setLoaderSearch] = useState(false);
    const search = () => {
        setLoaderSearch(true);
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + global.token.trim());
        const requestOptions = {
            method: 'GET',
            headers: headers
        }
        fetch('https://theaaura.com/api/v1/products/search?key=' + searchText, requestOptions).then(res => res.json()).then(response => {
            console.log(response.data, 'this is search response');
            setLoaderSearch(false);
            navigation.navigate('Search', { data: response.data, text: searchText });
        }
        ).catch(err => console.log(err))
    }

    useEffect(() => {
        CHECK_USER();
    }, []);

    const CHECK_USER = async () => {
        const account_info = await Storage.getItem('fcmToken');
        console.log('fcmToken====================', account_info);
    }


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
    const [slider, setSlider] = useState(null);
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

    // home slider 
    useEffect(() => {
        fetch('https://theaaura.com/api/v1/sliders').then(res => res.json()).then(response => {
            setSlider(response.data);
        }).catch(err => { console.log(err) })
    }, [])
    // banner
    useEffect(() => {
        fetch('https://theaaura.com/api/v1/banners').then(response => response.json()).then(response => {
            setBanner(response.data);
        }).catch(err => console.log(err))
    }, [])
    // category
    useEffect(() => {
        fetch('https://theaaura.com/api/v1/home-categories').then(response => response.json()).then(response => {
            setCategory(response.data);
        }).catch(err => console.log(err))

    }, [])

    // deals
    useEffect(() => {
        fetch('https://theaaura.com/api/v1/products/todays-deal').then(response => response.json()).then(response => {
            setToday(response.data);
        }).catch(err => console.log(err))
    }, [])

    // featured
    useEffect(() => {
        fetch('https://theaaura.com/api/v1/products/featured').then(response => response.json()).then(response => {
            setFeatured(response.data);
            console.log(response.data);
        }).catch(err => console.log(err))
    }, [])

    // best selling
    useEffect(() => {
        fetch('https://theaaura.com/api/v1/products/best-seller').then(response => response.json()).then(response => {
            setBestSelling(response.data);
        }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        fetch('https://theaaura.com/api/v1/category/products').then(response => response.json()).then(response => {
            setWomens(response.data[1].products);
            setAcc(response.data[11].products);
            setSnack(response.data[15].products);
        }).catch(err => console.log(err))
    }, [])


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
                {loaderSearch ? <ActivityIndicator size='small' color={Colors.violet} /> :
                    <View style={styles.searchView} >
                        <View style={styles.searchBar} >
                            <TouchableOpacity onPress={search} >
                                <EvilIcons name="search" size={wp(5)} color={Colors.violet} style={styles.searchIcon} />
                            </TouchableOpacity>
                            <TextInput
                                placeholder='Search'
                                placeholderTextColor={Colors.violet}
                                style={styles.search}
                                onChangeText={(text) => setSearchText(text)}
                                onSubmitEditing={() => search()}
                            />
                            <EvilIcons name="camera" size={wp(6)} color={Colors.violet} style={styles.cameraIcon} />
                            <Feather name="mic" size={wp(3.9)} color={Colors.violet} style={styles.micIcon} />
                        </View>
                    </View>
                }
                {banner === null ? <ActivityIndicator size="large" color={Colors.violet} /> :
                    <View style={CommonStyle.shadow3} >
                        <Carousel
                            data={slider}
                            useScrollView={true}
                            ref={isCarousel}
                            autoplay={true}
                            loop={true}
                            autoplayDelay={1000}
                            sliderWidth={wp(100)}
                            itemWidth={wp(100)}
                            renderItem={CarouselCardItem}
                            layout={'default'}
                            onSnapToItem={(index) => setIndex(index)}
                        />
                    </View>
                }
                <Text></Text>
                <Separator title="category" />
                {category === null ? <ActivityIndicator size="large" color={Colors.violet} /> :
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={category}
                        // horizontal
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
                <Separator title="today's deal" onPress={() => navigation.navigate('TodayDeals')} />
                {today === null ? <ActivityIndicator size="large" color={Colors.violet} /> :
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={today}
                        horizontal
                        renderItem={({ item, index }) => {
                            return (
                                <>
                                    <Card item={item} navigation={navigation} />
                                </>
                            )
                        }}
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
                    layout={'default'}
                    onSnapToItem={(index) => setIndex(index)}
                />
                <Separator title='featured products' onPress={() => navigation.navigate('SeeAll', featured)} />
                {featured === null ? <ActivityIndicator size="large" color={Colors.violet} /> :
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={featured}
                        horizontal
                        renderItem={({ item, index }) => {
                            return (
                                // <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Product detail', item)} >
                                <>
                                    <Card item={item} navigation={navigation} />
                                </>
                                // </TouchableOpacity>
                            )
                        }}
                    />
                }
                <Separator title='best selling' onPress={() => navigation.navigate('SeeAll', bestSelling)} />
                {bestSelling === null ? <ActivityIndicator size="large" color={Colors.violet} /> :
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={bestSelling}
                        horizontal
                        renderItem={({ item, index }) => {
                            return (
                                <>
                                    <Card item={item} navigation={navigation} />
                                </>
                            )
                        }}
                    />
                }
                <Separator title="women's fashion" onPress={() => navigation.navigate('SeeAll', womens)} />
                {womens === null ? <ActivityIndicator size="large" color={Colors.violet} /> :
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={womens}
                        horizontal
                        renderItem={({ item, index }) => {
                            return (
                                <>
                                    <Card item={item} navigation={navigation} />
                                </>
                            )
                        }}
                    />
                }
                <Separator title='accessories' onPress={() => navigation.navigate('SeeAll', acc)} />
                {acc === null ? <ActivityIndicator size="large" color={Colors.violet} /> :
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={acc}
                        horizontal
                        renderItem={({ item, index }) => {
                            return (
                                <>
                                    <Card item={item} navigation={navigation} />
                                </>
                            )
                        }}
                    />
                }
                <Separator title='snacks' onPress={() => navigation.navigate('SeeAll', snack)} />
                {snack === null ? <ActivityIndicator size="large" color={Colors.violet} /> :
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={snack}
                        horizontal
                        renderItem={({ item, index }) => {
                            return (
                                <>
                                    <Card item={item} navigation={navigation} />
                                </>
                            )
                        }}
                    />
                }
                <View style={{ paddingBottom: hp(4) }} />
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
        width: wp(100),
        height: hp(30),
        marginBottom: hp(3)
    },
    img: {
        width: wp(100),
        height: hp(30),
        // margin: wp(3),
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