import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { useCartContext } from './CartContext';

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

    // Use minimumOrderQuantity if available, otherwise default to 1
    const quantity = item.minimumOrderQuantity || 1;
    const totalPrice = (item.price * quantity).toFixed(2);

    return (
        <View style={styles.container}>
            {/* Thumbnail */}
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />

            {/* Title and Rating on the same line */}
            <View style={styles.titleRow}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.rating}>{item.rating} ★</Text>
            </View>

            {/* Description */}
            <Text style={styles.description}>{item.description}</Text>

            {/* Gap between description and quantity */}
            <View style={{ height: 24 }} />

            {/* Quantity on next line */}
            <View style={styles.row}>
                <Text style={styles.quantity}>Quantity: {quantity}</Text>
            </View>

            {/* Total Price label above price and Add to Cart button */}
            <View style={styles.bottomRow}>
                <View>
                    <Text style={styles.totalLabel}>Total Price</Text>
                    <Text style={styles.totalPrice}>${totalPrice}</Text>
                </View>
                <View style={styles.buttonWrapper}>
                    <Button
                      title="Add to Cart"
                      color="#000"
                      onPress={() => {
                        addToCart({ ...item, quantity });
                        navigation.navigate('Cart');
                      }}
                    />
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
        height: 300, // Increased height
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
    rating: {
        fontSize: 18,
        color: "#888",
        marginLeft: 12,
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
});

export default ItemDetailScreen;