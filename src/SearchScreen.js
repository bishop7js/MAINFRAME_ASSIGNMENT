import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { useProductContext } from './contexts/ProductContext';

const SearchScreen = ({ navigation }) => {
    const { products, loading, error, fetchProductData } = useProductContext();
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        fetchProductData();
    }, []);

    useEffect(() => {
        if (!search) {
            setFiltered(products);
        } else {
            setFiltered(
                products.filter(
                    p =>
                        p.title.toLowerCase().includes(search.toLowerCase()) ||
                        p.description.toLowerCase().includes(search.toLowerCase())
                )
            );
        }
    }, [search, products]);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('itemDetail', { item })}
        >
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>${item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search products..."
                value={search}
                onChangeText={setSearch}
            />
            {loading ? (
                <Text style={styles.centerText}>Loading...</Text>
            ) : error ? (
                <Text style={styles.centerText}>Error: {error}</Text>
            ) : filtered.length === 0 ? (
                <Text style={styles.centerText}>No Result Found</Text>
            ) : (
                <FlatList
                    data={filtered}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 24 }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 12,
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        backgroundColor: '#f9f9f9',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 12,
        marginBottom: 14,
        elevation: 2,
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
        backgroundColor: '#eee',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    price: {
        fontWeight: 'bold',
        color: '#222',
        fontSize: 15,
    },
    centerText: {
        textAlign: 'center',
        marginTop: 24,
        color: '#888',
    },
});

export default SearchScreen;