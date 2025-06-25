import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useCartContext } from './contexts/CartContext';

const ItemDetailScreen = ({ route, navigation }) => {
    const { item } = route.params || {};
    const { addToCart } = useCartContext();

    if (!item) {
        return (
            <View style={styles.container}>
                <Text>No item data available.</Text>
            </View>
        );
    }

    const quantity = item.minimumOrderQuantity || 1;
    const totalPrice = (item.price * quantity).toFixed(2);

    return (
        <View style={styles.container}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />

            <View style={styles.titleRow}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.ratingBox}>
                    <Text style={styles.ratingText}>{item.rating} </Text>
                    <Text style={styles.ratingStar}>★</Text>
                </View>
            </View>
            {item.discountPercentage && (
                <View style={styles.discountBox}>
                    <Text style={styles.discountText}>
                        Discount {item.discountPercentage}%
                    </Text>
                </View>
            )}

            <Text style={styles.description}>{item.description}</Text>

            {/* Tags section */}
            {item.tags && item.tags.length > 0 && (
                <View style={{ marginTop: 16 }}>
                    <Text style={{ fontWeight: 'bold', color: '#222', marginBottom: 4 }}>Tags</Text>
                    <Text>
                        {item.tags.map(tag => `#${tag}`).join(' ')}
                    </Text>
                </View>
            )}

            <View style={{ height: 24 }} />

            <View style={styles.row}>
                <Text style={styles.quantity}>Quantity: {quantity}</Text>
            </View>

            <View style={styles.bottomRow}>
                <View>
                    <Text style={styles.totalLabel}>Total Price</Text>
                    <Text style={styles.totalPrice}>${totalPrice}</Text>
                </View>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                      style={styles.addToCartButton}
                      onPress={() => {
                        addToCart({ ...item, quantity });
                        navigation.navigate('Cart');
                      }}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.addToCartText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    thumbnail: {
        width: "100%",
        height: 300, 
        borderRadius: 8,
        marginTop: 64,
        marginBottom: 16,
    },
    titleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        flex: 1,
        flexWrap: "wrap",
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFE5B4', 
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 2,
    },
    ratingText: {
        fontSize: 18,
        color: '#FF8C00', 
        fontWeight: 'bold',
    },
    ratingStar: {
        fontSize: 18,
        color: '#FF8C00', 
        fontWeight: 'bold',
        marginLeft: 4,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 8,
    },
    price: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#e91e63",
    },
    quantity: {
        fontSize: 18,
        marginHorizontal: 8,
    },
    description: {
        fontSize: 16,
        color: "#333",
        marginTop: 16,
    },
    buttonWrapper: {
        marginLeft: 8,
        flex: 0,
    },
    totalLabel: {
        fontSize: 14,
        color: "#333",
        fontWeight: "bold",
        marginBottom: 2,
    },
    totalPrice: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#000",
    },
    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: 16,
    },
    addToCartButton: {
        backgroundColor: '#000',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 28,
        alignItems: 'center',
    },
    addToCartText: {
        color: '#fff',
        fontSize: 16,
    },
    discountBox: {
        backgroundColor: '#FFE5B4', 
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 2,
        alignSelf: 'flex-start',
    },
    discountText: {
        fontSize: 16,
        color: '#FF8C00', 
        fontWeight: 'bold',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        marginBottom: 10,
    },
    tag: {
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginRight: 8,
        marginBottom: 6,
    },
    tagText: {
        fontSize: 13,
        color: '#FF8C00',
        fontWeight: 'bold',
    },
});

export default ItemDetailScreen;