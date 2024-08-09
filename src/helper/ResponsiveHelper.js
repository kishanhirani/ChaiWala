import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const aspectRatio = width / (Platform.OS === "ios" ? 480 : 400);

const getLayoutSize = valueDimen => {
    var newScale = ((aspectRatio * valueDimen) - valueDimen) * 0.5 + valueDimen
    return newScale
};

const getFontSize = valueFontSize => {
    var newScale = ((aspectRatio * valueFontSize) - valueFontSize) * 0.8 + valueFontSize
    return newScale
};

export {
    getLayoutSize,
    getFontSize
};
