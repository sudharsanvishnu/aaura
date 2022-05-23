import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import { Colors, CommonStyle, hp, wp } from '../../utils/Constant';
import RenderHTML from 'react-native-render-html';

const Privacy = ({ navigation }) => {

    const [priData, setPriData] = useState(null);

    useEffect(() => {
        fetch('https://theaaura.com/api/v1/policies/return').then(response => response.json()).then(response => {
            setPriData(response.data)
        }
        ).catch(err => console.log(err))
    }, [])


    // const HtmlSource = { html: priData[0]?.content };

    return (
        <View style={styles.container} >
            <Header navigation={navigation} />
            <ScrollView>
                <View style={[{ margin: wp(3), backgroundColor: Colors.white, paddingHorizontal: wp(2) }, CommonStyle.shadow]} >
                    {priData === null ? <ActivityIndicator size="large" style={{ justifyContent: 'center', alignItems: 'center', height: hp(100) }} color={Colors.violet} /> :
                        // <Text>{priData?.content}</Text>
                        <RenderHTML
                            style={styles.content}
                            source={{ html: priData[0]?.content }}
                        />
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default Privacy

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: hp(100),
        backgroundColor: Colors.white
    }
})