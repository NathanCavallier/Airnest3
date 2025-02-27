import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Button, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { api } from '@/api';
import { Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Link, router } from 'expo-router';

type Product = {
    id: number;
    title: string;
    image: string;
    description: string;
    price: number;
    old_price: number;
    shipping_amount: number;
    in_stock: boolean;
    gallery: { image: string }[];
    specification: { title: string; content: string }[];
    color: { name: string }[];
    size: { length: number; width: number }[];
    category: { id: number; title: string };
};

const ProductScreen = () => {
    const { productId } = useLocalSearchParams() || { productId: 0 };
    const [product, setProduct] = useState(null as Product | null);
    const [loading, setLoading] = useState(true);
    const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`products`);
                const data = response.data;
                data.forEach((product: any) => {
                    if (product.id == productId) {
                        setProduct(product);
                        setLoading(false);
                    }
                }
                );
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    useEffect(() => {
        if (product) {
            const fetchSimilarProducts = async () => {
                try {
                    const response = await api.get(`products`);
                    const data = response.data;
                    const similarProductsList: any[] = [];
                    data.forEach((product_: any) => {
                        if (product_.category.title === product.category.title && product_.id !== product.id) {
                            similarProductsList.push(product_);
                        }
                    });
                    setSimilarProducts(similarProductsList);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchSimilarProducts();
        }
    }, [product]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="orange" />
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Failed to load product details.</Text>
            </View>
        );
    }

    const createOrder = async (productId: number, quantity: number = 1) => {
        const url = 'http://localhost:8000/api/v1/create-order/';
        const orderData = {
          productId: productId,
          quantity: quantity,
          // Ajoutez d'autres champs nécessaires selon votre API
        };
      
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Incluez d'autres en-têtes si nécessaire, comme un token d'authentification
            },
            body: JSON.stringify(orderData),
          });
      
          if (!response.ok) {
            throw new Error('Failed to create order');
          }
      
          const data = await response.json();
          console.log('Order created successfully:', data);
          // Traitez ici la réponse, par exemple en mettant à jour l'état de l'application
        } catch (error) {
          console.error('Error creating order:', error);
        }
      };

    const handelAddToCart = () => {
        createOrder(product.id);
    }

    const handelPressProduct = (productId: number) => {
        router.push({
            pathname: '/ProductScreen/[productId_category]',
            params: { productId_category: productId },
        });
    }

    return (
        <>
            <View style={styles.goBack}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <Ionicons name="arrow-back" size={24} color="orange" />
                </TouchableOpacity>
                <View><Text style={styles.section_Title}>{product.title}</Text></View>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                <ScrollView horizontal pagingEnabled style={styles.carousel}>
                    {product.gallery.map((image: { image: any; }, index: React.Key | null | undefined) => (
                        <Image key={index} source={{ uri: image.image }} style={styles.image} />
                    ))}
                </ScrollView>
                <View style={styles.detailsContainer}>
                    <Text style={styles.name}>{product.title}</Text>
                    <Text style={styles.description}>{product.description}</Text>
                    <Text style={styles.price}>Prix: ${product.price}</Text>
                    {product.old_price > product.price && (
                        <Text style={styles.oldPrice}>Avant réduction: ${product.old_price}</Text>
                    )}
                <Text style={styles.shipping}>Livraison: ${product.shipping_amount}</Text>
                </View>

                <View style={styles.specifications}>
                    <Text style={styles.sectionTitle}>Specifications</Text>
                    {product.specification.length > 0 ? (product.specification.map((spec, index) => (
                        <Text key={index} style={styles.specText}>{spec.title}: {spec.content}</Text>
                    ))) : (<Text> --- </Text>)}
                </View>

                <View style={styles.colors}>
                    <Text style={styles.sectionTitle}>Coloris disponibles</Text>
                    {product.color.length > 0 ? (product.color.map((color, index) => (
                        <Text key={index} style={styles.colorText}>{color.name}</Text>
                    ))) : (<Text> --- </Text>)}
                </View>

                <View style={styles.sizes}>
                    <Text style={styles.sectionTitle}>Dimensions disponibles</Text>
                    {product.size.length > 0 ? (product.size.map((size, index) => (
                        <Text key={index} style={styles.sizeText}>Longeur: {size.length}m, Largeur: {size.width}m</Text>
                    ))) : (<Text> --- </Text>)}
                </View>

                {product.in_stock ? (
                    <TouchableOpacity onPress={() => { handelAddToCart() }} style={styles.button}><Text>Ajouter au panier</Text></TouchableOpacity>
                ) : (
                    <TouchableOpacity disabled ><Text style={styles.outOfStock}>Stock épuisé</Text></TouchableOpacity>
                )}

                {similarProducts.length > 0 && (
                    <View style={styles.similarProducts}>
                        <Text style={styles.sectionTitleSimilar}>Articles similaires</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {similarProducts.map((similarProduct, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.similarProductContainer}
                                    onPress={() => { handelPressProduct(similarProduct.id) }}
                                >
                                    <Image source={{ uri: similarProduct.image }} style={styles.similarProductImage} />
                                    <Text style={styles.similarProductTitle}>{similarProduct.title}</Text>
                                    <Text style={styles.similarProductPrice}>${similarProduct.price}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'gray',
    },
    carousel: {
        height: 300,
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        borderRadius: 8,
        margin: 8,
    },
    detailsContainer: {
        padding: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'orange',
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'green',
    },
    oldPrice: {
        fontSize: 16,
        textDecorationLine: 'line-through',
        marginBottom: 8,
        color: 'red',
    },
    shipping: {
        fontSize: 16,
        marginBottom: 16,
        color: 'gray',
    },
    specifications: {
        marginBottom: 16,
        color: 'gray',
    },
    colors: {
        marginBottom: 16,
    },
    sizes: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 8,
        color: 'black',
    },
    section_Title: {
        fontSize: 18,
        fontWeight: 'light',
        marginVertical: 8,
        color: 'orange',
    },
    sectionTitleSimilar: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 8,
        color: 'gray',
    },
    specText: {
        fontSize: 14,
        marginBottom: 4,
    },
    colorText: {
        fontSize: 14,
        marginBottom: 4,
    },
    sizeText: {
        fontSize: 14,
        marginBottom: 4,
    },
    button: {
        width: '50%',
        margin: 16,
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        backgroundColor: 'orange',
    },
    outOfStock: {
        flex: 1,
        color: 'red',
        width: '30%',
        margin: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'red',
        padding: 16,
    },
    goBack: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between',
    },
    similarProducts: {
        marginTop: 32,
    },
    similarProductContainer: {
        width: Dimensions.get('window').width / 2.5,
        padding: 16,
        marginRight: 16,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
    },
    similarProductImage: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        borderRadius: 8,
        marginBottom: 8,
    },
    similarProductTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    similarProductPrice: {
        fontSize: 14,
        color: 'green',
    },
});

export default ProductScreen;