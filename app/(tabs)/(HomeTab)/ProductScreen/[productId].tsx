import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Button, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { api } from '@/api';
import { Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { useNavigation } from '@react-navigation/native';

type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    old_price: number;
    shipping_amount: number;
    in_stock: boolean;
    gallery: { image: string }[];
    specification: { title: string; content: string }[];
    color: { name: string }[];
    size: { length: number; width: number }[];
};

const ProductScreen = () => {
    const { productId } = useLocalSearchParams() || { productId: 0 };
    const [product, setProduct] = useState(null as Product | null);
    const [loading, setLoading] = useState(true);
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

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
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

    const handelAddToCart = () => {
        // Add to cart logic
    }

    return (
        <>
            <View style={styles.goBack}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <Ionicons name="arrow-back" size={24} color="orange" />
                </TouchableOpacity>
                <View style={styles.sectionTitle}><Text>{product.title}</Text></View>
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
                    {product.old_price && (
                        <Text style={styles.oldPrice}>Avant réduction: ${product.old_price}</Text>
                    )}
                    <Text style={styles.shipping}>Livraison: ${product.shipping_amount}</Text>
                    {product.in_stock ? (
                        <TouchableOpacity onPress={() => {handelAddToCart()}} style={styles.button}><Text>Ajouter au panier</Text></TouchableOpacity>
                    ) : (
                        <Button title="Stock épuisé" disabled />
                    )}
                </View>

                <View style={styles.specifications}>
                    <Text style={styles.sectionTitle}>Specifications</Text>
                    {product.specification.map((spec, index) => (
                        <Text key={index} style={styles.specText}>{spec.title}: {spec.content}</Text>
                    ))}
                </View>

                <View style={styles.colors}>
                    <Text style={styles.sectionTitle}>Coloris disponibles</Text>
                    {product.color.map((color, index) => (
                        <Text key={index} style={styles.colorText}>{color.name}</Text>
                    ))}
                </View>

                <View style={styles.sizes}>
                    <Text style={styles.sectionTitle}>Dimensions disponibles</Text>
                    {product.size.map((size, index) => (
                        <Text key={index} style={styles.sizeText}>Length: {size.length}m, Width: {size.width}m</Text>
                    ))}
                </View>
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
    goBack: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between',
    },
});

export default ProductScreen;