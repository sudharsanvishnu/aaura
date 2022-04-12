import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, fonts, hp } from '../utils/Constant';


const ThreeTab = ({ data, setCurrentTab, currentTab, lineView, tabView }) => {
    return data.map((item, index) => {
        return (
            <Pressable onPress={() => setCurrentTab(index)} style={[styles.tab, tabView]} key={index}>
                <Text numberOfLines={1} style={{
                    color: currentTab === index ? Colors.black : Colors.grey,
                    fontFamily: fonts.PSB,
                    fontSize: 14,
                    textTransform: 'uppercase',
                    textAlign: item.value == 1 ? 'center' : null,
                    // textAlign: item.value !== 0 ? 'center' : null,
                }}
                >
                    {item.name}
                </Text>
                <View style={[{
                    backgroundColor: currentTab == index ? Colors.violet : Colors.border,
                    height: hp(0.4),
                    bottom: 0,
                    // width: data.length < 4 ? wp(34) : wp(23),
                }, lineView]} />
            </Pressable >
        );
    }
    )
};

export default ThreeTab;

const styles = StyleSheet.create({
    tab: {
        height: hp(3),
        backgroundColor: Colors.white,
        justifyContent: 'space-between',
    },
});
