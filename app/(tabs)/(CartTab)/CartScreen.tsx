import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { api } from '@/api';
import { Ionicons } from '@expo/vector-icons';

interface CartItem {
  id: number;
  product: {
    title: string;
    image: string;
  };
  price: string;
  qty: number;
  sub_total: string;
  shipping_amount: string;
  tax_fee: string;
  total: string;
}

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await api.get('cart-view');
      setCartItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + parseFloat(item.total || '0'), 0).toFixed(2);
  };

  const calculateTax = () => {
    return cartItems.reduce((acc, item) => acc + parseFloat(item.tax_fee || '0'), 0).toFixed(2);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="orange" />;
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.header}>Panier</Text>
        <Text style={{ color: 'orange', fontSize: 15 }}>{cartItems.length} articles</Text>
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image style={styles.image} source={{ uri: item.product.image }} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.product.title}</Text>
              <Text style={styles.itemPrice}>{item.price} €</Text>
              <Text style={styles.itemQuantity}>Quantité: {item.qty}</Text>
              <Text style={styles.itemTotal}>Sous-total: {item.sub_total} €</Text>
              <Text style={styles.itemShipping}>Frais de livraison: {item.shipping_amount} €</Text>
            </View>

          </View>
        )}
      />
      <View style={styles.summary}>
        <Text style={styles.total}>TOTAL: {calculateTotal()} €</Text>
        <Text style={styles.tva}>TVA: {calculateTax()} €</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity style={styles.button}>
          <Text>Continuer les achats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: 'white' }}>Passer la commande</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'gray',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
  itemDetails: {
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: 'gray',
  },
  itemQuantity: {
    fontSize: 16,
  },
  itemTotal: {
    fontSize: 16,
    color: 'green',
  },
  itemShipping: {
    fontSize: 16,
  },
  summary: {
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tva: {
    fontSize: 18,
    color: 'gray',
  },
  button: {
    width: '40%',
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: 8,
    padding: 10,

    color: 'white',
  },
  upButtons: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
});

export default CartScreen;
