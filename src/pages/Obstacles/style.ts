import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E2E2E2',

    },
    wrapper: {
        width: width * 0.9,
        flexDirection: 'column',
    },
    warning: {
        backgroundColor: '#F8F9FA',
        borderRadius: 15,
        padding: 15,
        marginBottom: 30,

    },
    filtersWrapper: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        borderRadius: 15,
        marginBottom: 30,
        gap: 7,

    },

})