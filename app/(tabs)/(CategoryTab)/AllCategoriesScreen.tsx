import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '@/api';
import { sep } from 'path';

const defaultImage = require('@/assets/images/default.png'); // Chemin de votre image par défaut

type Category = {
    id: number;
    image: string;
    title: string;
};

const AllCategoriesScreen = () => {
    const navigation = useNavigation();
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('products');
                const data = response.data || [];

                // Récupérer les catégories uniques
                const allCategoriesTitles: string[] = [];
                const uniqueCategories: Category[] = [];
                data.forEach((product: any) => {
                    if (product?.category?.title && !allCategoriesTitles.includes(product?.category?.title)) {
                        allCategoriesTitles.push(product?.category?.title);
                        uniqueCategories.push({
                            id: product?.category?.id || 0,
                            image: product?.category?.image || defaultImage,
                            title: product?.category?.title || 'Pas de titre',
                        });
                    }
                });
                setCategories(uniqueCategories);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    const renderCategoryItem = ({ item }: { item: Category }) => (
        <TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate('SelectedCategoryScreen', { id: item.id })}>
            <Image source={{ uri: item.image }} style={styles.categoryImage} />
            <Text style={styles.categoryTitle}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Catégories</Text>
            <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        paddingBottom: 16,
        color: 'gray',
    },
    categoryItem: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'center',
    },
    categoryImage: {
        width: 150,
        height: 150,
        borderRadius: 8,
        marginRight: 16,
        marginTop: 8,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray',
    },
    separator: {
        marginVertical: 6,
        height: 1,
        width: '100%',
        backgroundColor: '#CED0CEAC',
    },
});

export default AllCategoriesScreen;
