import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { api } from '@/api';
import PropTypes from 'prop-types';

const CategoryScreen = ({ route, navigation }: { route: any, navigation: any }) => {
    const { categoryId } = route.params;
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`products`);
                response.data.forEach((product: any) => {
                    if (product.category.id === categoryId) {
                        setProducts((prevProducts) => [...prevProducts, {
                            image: product.image,
                            title: product.title,
                            price: product.price,
                            productId: product.id,
                        }]);
                    }
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [categoryId]);

    const renderProductItem = ({ item }: { item: { image: string; title: string; price: number; productId: number; } }) => (
        <View style={styles.productItem}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Produits de la catégorie</Text>
            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
            />
        </View>
    );
};

CategoryScreen.propTypes = {
    route: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    productItem: {
        flex: 1,
        alignItems: 'center',
        margin: 10,
    },
    productImage: {
        width: 100,
        height: 100,
    },
    productTitle: {
        marginTop: 10,
        fontSize: 16,
    },
    productPrice: {
        marginTop: 5,
        fontSize: 14,
        color: 'green',
    },
});

export default CategoryScreen;
