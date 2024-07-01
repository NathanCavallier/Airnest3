import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { api } from '@/api';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { string } from 'prop-types';

interface CartItem {
  id: number;
  product: {
    title: string;
    image: string;
  };
  qty: number;
  sub_total: string;
  shipping_amount: string;
  tax_fee: string;
  total: string;
}

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [allQties, setAllQties] = useState(0);
  const [isDecreasingColor, setIsDecreasingColor] = useState<Array<{ 'id': number, 'color': string }>>([{ 'id': 0, 'color': 'black' }]);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isDisabling, setIsDisabling] = useState<Array<{ 'id': number, 'isDisabled': boolean }>>([{ 'id': 0, 'isDisabled': false }]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Fonction pour augmenter la quantité d'un article
  const increaseQuantity = (itemId: number) => {
    var qty = 0;
    const newCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        qty = item.qty + 1;
        setIsDecreasingColor(isDecreasingColor.map((element) => {  // Mettre à jour la couleur du bouton de diminution
          if (element.id === itemId) {
            element.color = 'black';
          }
          return element;
        }
        ));
        setIsDisabling(isDisabling.map((element) => {  // Mettre à jour l'état du bouton de diminution
          if (element.id === itemId) {
            element.isDisabled = false;
          }
          return element;
        }
        ));
        setIsRemoving(false);
        return { ...item, qty: item.qty + 1, total: (parseFloat(item.total) + parseFloat(item.sub_total)).toFixed(2), tax_fee: (parseFloat(item.tax_fee) + parseFloat(item.tax_fee)).toFixed(2), shipping_amount: (parseFloat(item.shipping_amount) + parseFloat(item.shipping_amount)).toFixed(2)};
      }
      return item;
    });
    setCartItems(newCartItems); // Mettre à jour l'état du panier
    setAllQties(allQties + 1); // Mettre à jour le nombre total d'articles
  };

  // Fonction pour baisser la quantité d'un article
  const decreaseQuantity = (itemId: number) => {
    var qty = 0;
    const newCartItems = cartItems.map((item) => {
      if (item.id === itemId && item.qty > 1) {
        setIsRemoving(false);
        setAllQties(allQties - 1);
        var array: Array<{ 'id': number, 'color': string }> = [];
        array = isDecreasingColor;
        array.forEach((element) => {
          if (element.id === itemId) {
            element.color = 'black';
          }
        }
        );
        var state_array: Array<{ 'id': number, 'isDisabled': boolean }> = [];
        state_array = isDisabling;
        state_array.forEach((element) => {
          if (element.id === itemId) {
            element.isDisabled = false;
          }
        }
        );
        setIsDisabling(state_array);
        setIsDecreasingColor(array);

        // Si la quantité est égale à 1, on désactive le bouton de diminution
        if (item.qty - 1 === 1) {
          setIsDecreasingColor(isDecreasingColor.map((element) => {
            if (element.id === itemId) {
              element.color = 'gray';
            }
            return element;
          }
          ));
          setIsDisabling(isDisabling.map((element) => {
            if (element.id === itemId) {
              element.isDisabled = true;
            }
            return element;
          }
          ));
        }
        return { ...item, qty: item.qty - 1, total: (parseFloat(item.total) - parseFloat(item.sub_total)).toFixed(2), tax_fee: (parseFloat(item.tax_fee) - parseFloat(item.tax_fee)).toFixed(2), shipping_amount: (parseFloat(item.shipping_amount) - parseFloat(item.shipping_amount)).toFixed(2)};
      } 
      return item;
    });
    setCartItems(newCartItems); // Mettre à jour l'état du panier
  };

  // Fonction pour supprimer un article du panier
  const removeFromCart = (id: number) => {
    const newCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(newCartItems); // Mettre à jour l'état du panier
    setAllQties(allQties - 1); // Mettre à jour le nombre total d'articles
    // Appeler l'API pour supprimer l'article du panier
    api.post('cart-remove-item', { id }).then((response) => {
      if (response.status !== 200) {
        console.error('Error removing item from cart');
      }
    }).catch((error) => {
      console.error(error);
    });
  };

  // Fonction pour récupérer les articles du panier
  const fetchCartItems = async () => {
    try {
      const response = await api.get('cart-view');
      if (response.status === 200) {
        var data = response.data;
        var itemsList: CartItem[] = [];
        var qty: number[] = [0];
        var i = 0;
        var k = 0;
        // Vérifier si le panier est vide
        if (data.length === 0) {
          setCartItems([]);
          setLoading(false);
          return;
        } else {
          // Parcourir les éléments du panier, si un article est déjà dans le panier, on incrémente la quantité et on met à jour le sous-total et le total
          data.forEach((item: any) => {
            var found = false;
            var j = 0;
            itemsList.forEach((element) => {
              if (element.product.title === item.product.title) {
                found = true;
                element.qty += 1;
                element.sub_total = (parseFloat(element.sub_total) + parseFloat(item.price)).toFixed(2);
                element.total = (parseFloat(element.total) + parseFloat(item.price)).toFixed(2);
                element.tax_fee = (parseFloat(element.tax_fee) + parseFloat(item.tax_fee)).toFixed(2);
                element.shipping_amount = (parseFloat(element.shipping_amount) + parseFloat(item.shipping_amount)).toFixed(2);
                qty[j] += 1;
                k++;
              }
              j++;
            });
            // Si l'article n'est pas dans le panier, on l'ajoute
            if (!found) {
              itemsList.push({
                id: i,
                product: {
                  title: item.product.title,
                  image: item.product.image,
                },
                qty: 1,
                sub_total: item.price,
                shipping_amount: item.shipping_amount,
                tax_fee: item.tax_fee,
                total: (parseFloat(item.price) + parseFloat(item.tax_fee) + parseFloat(item.shipping_amount)).toFixed(2),
              });
              qty.push(1);
              i++;
              k++;
            }
          });
          setAllQties(k);
        }
        var array: Array<{ 'id': number, 'color': string }> = [];
        var state_array: Array<{ 'id': number, 'isDisabled': boolean }> = [];
        for (var i = 0; i < itemsList.length; i++) {
          if (itemsList[i].qty === 1) {
            array.push({ 'id': itemsList[i].id, 'color': 'gray' }); // Si la quantité est égale à 1, on désactive le bouton de diminution
            state_array.push({ 'id': itemsList[i].id, 'isDisabled': true });
          } else {
            array.push({ 'id': itemsList[i].id, 'color': 'black' }); // Sinon, on active le bouton de diminution
            state_array.push({ 'id': itemsList[i].id, 'isDisabled': false });
          }
        }
        setIsDisabling(state_array);
        setIsDecreasingColor(array);
        setCartItems(itemsList);

      } else {
        console.error('Error fetching cart items');
        setCartItems([]);
      }

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
        <Text style={{ color: 'orange', fontSize: 15 }}>{allQties} articles</Text>
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image style={styles.image} source={{ uri: item.product.image }} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.product.title}</Text>
              <Text style={styles.itemTotal}>Sous-total: {item.sub_total} €</Text>
              <Text style={styles.itemShipping}>Frais de livraison: {item.shipping_amount} €</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={styles.upButtons} onPress={() => increaseQuantity(item.id)}>
                    <Ionicons name="add" size={20} color="black" />
                  </TouchableOpacity>
                  <Text style={styles.itemQuantity}>{item.qty}</Text>
                  <TouchableOpacity style={styles.upButtons} onPress={() => decreaseQuantity(item.id)} disabled={isDisabling[item.id].isDisabled}>
                    <Ionicons name="remove" size={20} color={isDecreasingColor[item.id].color} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  {(isRemoving || item.qty === 1) ? <Ionicons name="trash" style={{ padding: 6, marginLeft: 'auto' }} size={30} color="orange" /> : null}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        style={{
          backgroundColor: '#f9f9f9',
        }}
      />
      <View style={styles.summary}>
        <Text style={styles.total}>TOTAL: {calculateTotal()} €</Text>
        <Text style={styles.tva}>TVA: {calculateTax()} €</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
          <Text>Continuer les achats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: 'black' }}>Passer la commande</Text>
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
    marginHorizontal: 10,
    marginTop: 5,
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