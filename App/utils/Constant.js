import { Dimensions, Platform } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

export const { height, width } = Dimensions.get('window');

export const wp = widthPercentageToDP;
export const hp = heightPercentageToDP;

export const fonts = {
    PSB: 'Poppins-SemiBold',
    PSBI: 'Poppins-SemiBoldItalic',
    PM: 'Poppins-Medium',
    PMI: 'Poppins-MediumItalic',
    PR: 'Poppins-Regular',
    PL: 'Poppins-Light',
    PLI: 'Poppins-LightItalic',
    PI: 'Poppins-Italic',
};

export const Colors = {
    grey: '#979798',
    greyLight: '#BEBFC1',
    black: '#000000',
    white: '#FFFFFF',
    border: '#ECEDF1',
    border2: '#D5D7DB',
    visible: '#ECEDF180',
    violet: '#3b2848',
}

export const CommonStyle = {
    container: {
        width: wp(100),
        height: hp(100),
        backgroundColor: Colors.violet,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 4,
        },
        shadowOpacity: 0.20,
        shadowRadius: 10.65,

        elevation: 10,
        borderRadius: wp(2)
    },
    shadow2: {
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 4,
        },
        shadowOpacity: 0.20,
        shadowRadius: 10.65,

        elevation: 22,
    },
    shadow3: {
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 4,
        },
        shadowOpacity: 0.20,
        shadowRadius: 10.65,

        elevation: 33,
    },
}