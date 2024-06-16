import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { api } from '@/api';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRoute } from '@react-navigation/native';
import { CategoryScreenRouteParams } from '@/types';
import { useLocalSearchParams } from 'expo-router';
import { ProductScreenRouteParams } from '@/types';


const CategoryScreen = () => {

    const { categoryTitle } = useLocalSearchParams() || { categoryTitle: 'Pas de titre' };
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`products`);
                var productsList: any[] = [];
                response.data.forEach((product: any) => {
                    if (product.category.title === categoryTitle) {
                        productsList.push(product);
                    }
                });
                setProducts(productsList);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [categoryTitle]);

    const renderProductItem = ({ item }: { item: { image: string; title: string; price: number; productId: number; } }) => (
        <View style={styles.productItem}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
        </View>
    );

    const renderCategoryTitle = ({ item }: { item: { title: string; } }) => {
        return (
            <Text style={styles.sectionTitle}>{item.title}</Text>
        );
    }


    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Produits de la catégorie</Text>
            <Link to="/(tabs)/Index">
                <Ionicons name="arrow-back" size={24} color="orange" />
            </Link>
            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
            />
        </View>
    );
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
        color: 'gray',
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
