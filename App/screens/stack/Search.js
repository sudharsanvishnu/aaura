import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header';
import Card from '../../components/Card';
import { Colors, CommonStyle, fonts, hp, wp } from '../../utils/Constant';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';


const Search = ({ navigation, route }) => {

    console.log(route.params.data, 'this is data');

    const [searchData, setSearchData] = useState(route.params.data);

    // for search
    const [searchText, setSearchText] = useState(route.params.text);
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
            setSearchData(response.data);
            setLoaderSearch(false);
        }
        ).catch(err => console.log(err))
    }


    return (
        <View style={CommonStyle.container2} >
            <Header title='Search' backArrow={true} navigation={navigation} />
            <View style={styles.searchView} >
                {loaderSearch ? <ActivityIndicator size='small' color='white' style={{ alignSelf: 'center', marginTop: hp(2) }} /> :
                    <View style={styles.searchBar} >
                        <TouchableOpacity onPress={search} >
                            <EvilIcons name="search" size={wp(5)} color={Colors.violet} style={styles.searchIcon} />
                        </TouchableOpacity>
                        <TextInput
                            placeholder='Search'
                            value={searchText}
                            placeholderTextColor={Colors.violet}
                            style={styles.search}
                            onChangeText={(text) => setSearchText(text)}
                            onSubmitEditing={() => search()}
                        />
                        <EvilIcons name="camera" size={wp(6)} color={Colors.violet} style={styles.cameraIcon} />
                        <Feather name="mic" size={wp(3.9)} color={Colors.violet} style={styles.micIcon} />
                    </View>
                }
            </View>
            {searchData.length === 0 ?
                <View style={{ flex: 1, alignSelf: 'center' }} >
                    <Text style={{ fontFamily: fonts.PSB, color: Colors.greyLight, marginTop: hp(10) }} >No products found</Text>
                </View> :
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={searchData}
                    numColumns={2}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                <Card item={item} navigation={navigation} wishlist={true} />
                            </>
                        )
                    }}

                />
            }
        </View>
    )
}

export default Search

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
})