import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {
    const [products, setProducts] = React.useState([]);

    const fetchProductData = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products');
            const data = await response.json();
            setProducts(data.products);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    useEffect(() => {
        fetchProductData();
    }, []);

    const renderStars = () => (
        <View style={styles.starsRow}>
            {[...Array(5)].map((_, idx) => (
                <FontAwesome key={idx} name="star" size={16} color="#000000" style={styles.starIcon} />
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginLeft: 16,
        alignSelf: 'left',
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
        color: '#2e7d32',
    },
    thumbnail: {
        width: '100%',
        height: 100,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: '#eee',
    },
});

export default HomeScreen;