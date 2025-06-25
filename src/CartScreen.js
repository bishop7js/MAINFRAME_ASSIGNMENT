import React, { useState, useRef } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { useCartContext } from './contexts/CartContext';
import Feather from 'react-native-vector-icons/Feather';

const CartScreen = ({ navigation }) => {
  const { cartList, addToCart, removeFromCart, clearCart } = useCartContext();
  const [menuVisible, setMenuVisible] = useState(false);

  const subtotal = cartList.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal > 100 ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => addToCart({ ...item, quantity: -1 })}
          >
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => addToCart({ ...item, quantity: 1 })}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <TouchableOpacity onPress={() => setMenuVisible(true)} style={{ marginRight: 16 }}>
            <Feather name="more-vertical" size={24} color="#222" />
          </TouchableOpacity>
          <Modal
            transparent
            visible={menuVisible}
            animationType="fade"
            onRequestClose={() => setMenuVisible(false)}
          >
            <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
              <View style={styles.menuDropdown}>
                <TouchableOpacity
                  onPress={() => {
                    clearCart();
                    setMenuVisible(false);
                  }}
                  style={styles.menuItem}
                >
                  <Feather name="trash-2" size={18} color="#ff4444" style={{ marginRight: 8 }} />
                  <Text style={styles.menuText}>Clear Cart</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Modal>
        </View>
      ),
      title: 'Cart',
      headerTitleAlign: 'center',
    });
  }, [navigation, clearCart, menuVisible]);

  return (
    <View style={styles.container}>
      <FlatList
        data={cartList}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={<Text style={styles.centerText}>Your cart is empty.</Text>}
      />

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Discounts</Text>
          <Text style={styles.summaryValue}>-${discount.toFixed(2)}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 12 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    elevation: 2,
    alignItems: 'flex-start',
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
    marginBottom: 8,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  qtyBtn: {
    backgroundColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginHorizontal: 8,
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  qtyText: {
    fontSize: 16,
    minWidth: 24,
    textAlign: 'center',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#333',
  },
  summaryValue: {
    fontSize: 16,
    color: '#333',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  checkoutBtn: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  centerText: {
    textAlign: 'center',
    marginTop: 24,
    color: '#888',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuDropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 48,
    marginRight: 16,
    paddingVertical: 8,
    paddingHorizontal: 0,
    minWidth: 140,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuText: {
    fontSize: 16,
    color: '#222',
    fontWeight: 'bold',
  },
});

export default CartScreen;