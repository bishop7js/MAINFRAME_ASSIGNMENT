import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useProductContext } from './ProductContext';
import { useDispatch, useSelector } from 'react-redux';
import { useCartContext } from './CartContext';
import { fetchUser } from './store/profileActions';


const HomeScreen = ({ navigation }) => {
    const { products, loading, error, fetchProductData } = useProductContext();
    const { cartList } = useCartContext();
      const dispatch = useDispatch();
    const { user: profileData } = useSelector(state => state.user);

    useEffect(() => {
        fetchProductData();
        dispatch(fetchUser());
    }, []);

    const renderStars = () => (
        <View style={styles.starsRow}>
            {[...Array(5)].map((_, idx) => (
                <Text style={styles.ratingStar}>★</Text>
            ))}
        </View>
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('itemDetail', { item: item })}
        >
            <Image
                source={{ uri: item.thumbnail }}
                style={styles.thumbnail}
                resizeMode="cover"
            />
            <View>
                <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
            {renderStars()}
            <View style={styles.priceRow}>
                <Text style={styles.price}>${item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <View style={styles.userInfo}>
                    <Image
                        source={{ uri: profileData?.image }}
                        style={styles.userThumbnail}
                    />
                    <View>
                        <Text style={styles.greeting}>Good morning</Text>
                        <Text style={styles.userName}>
                            {profileData?.firstName ? profileData.firstName : ''}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.cartIconWrapper} onPress={() => navigation.navigate('Cart')}>
                    <Feather name="shopping-cart" size={28} color="#222" />
                    {cartList.length > 0 && (
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartBadgeText}>{cartList.length}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>What's New</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};

const ITEM_WIDTH = (Dimensions.get('window').width - 48) / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#fff',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginBottom: 10,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userThumbnail: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: '#eee',
    },
    greeting: {
        fontSize: 15,
        color: '#222',
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222',
        marginTop: -2,
    },
    cartIconWrapper: {
        position: 'relative',
        padding: 4,
    },
    cartBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: '#ff5252',
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    cartBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        marginLeft: 16,
        alignSelf: 'flex-start',
    },
    row: {
        flex: 1,
        justifyContent: 'space-between',
        marginHorizontal: 16,
    },
    itemContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        elevation: 2,
        alignItems: 'flex-start',
        marginBottom: 16,
        width: ITEM_WIDTH,
        padding: 10,
        position: 'relative',
        justifyContent: 'flex-start',
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    starsRow: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    starIcon: {
        marginRight: 2,
    },
    priceRow: {
        alignSelf: 'flex-end',
        marginTop: 'auto',
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    thumbnail: {
        width: '100%',
        height: 100,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: '#eee',
    },
      ratingStar: {
        fontSize: 18,
        color: '#FF8C00', 
        fontWeight: 'bold',
        marginLeft: 4,
    },
});

export default HomeScreen;