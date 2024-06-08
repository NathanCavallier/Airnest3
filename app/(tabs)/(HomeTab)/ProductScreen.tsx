import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { api } from '@/api';
import PropTypes from 'prop-types';

const ProductScreen = ({ route, navigation }: { route: any, navigation: any }) => {
    const { productId } = route.params;
    const [product, setProduct] = useState<any>(null);

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

    if (!product) {
        return (
            <View style={styles.container}>
                <Text>Chargement...</Text>
            </View>
        );
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
