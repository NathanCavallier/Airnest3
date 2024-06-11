import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { api } from '@/api';
import PropTypes from 'prop-types';
import { useLocalSearchParams, router } from 'expo-router';
import { useGlobalSearchParams } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { ProductScreenRouteParams } from '../../../types'; // Assurez-vous d'importer le type depuis son emplacement



const ProductScreen = () => {
    const route = useRoute();
    const [product, setProduct] = useState<any>(null);
    if (!route) {
        return (
            <View style={styles.container}>
                <Text>Chargement...</Text>
            </View>
        );
    } else {
        const { productId } = route.params as ProductScreenRouteParams || { productId: 1 };
        useEffect(() => {
            const fetchData = async () => { 
                try {
                    const response = await api.get(`products`);
                    response.data.forEach((product: any) => {
                        if (product.id === productId) {
                            setProduct(product);
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
        }, [productId]);
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productPrice}>${product.price}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
        </View>
    );
};

ProductScreen.propTypes = {
    route: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    productImage: {
        width: '100%',
        height: 200,
    },
    productTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    productPrice: {
        fontSize: 18,
        color: 'green',
        marginVertical: 5,
    },
    productDescription: {
        fontSize: 16,
        marginVertical: 10,
    },
});

export default ProductScreen;
