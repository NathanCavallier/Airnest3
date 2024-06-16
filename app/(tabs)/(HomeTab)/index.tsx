import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { api } from '@/api';
import Carousel from '@/components/Carousel';
import Menu from '@/app/Menu';
import { MenuProvider, useMenu } from '@/contexts/MenuContext';
import Header from '@/app/Header';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CategoryScreen from './CategoryScreen/[categoryTitle]';
import { ProductScreenRouteParams, CategoryScreenRouteParams } from '../../../types';
import { useRoute } from '@react-navigation/native';
import { router, Link } from 'expo-router';
import { title } from 'process';


type CarouselItem = {
    id: number;
    image: string;
    title: string;
};

type ProductScreenProps = {
    id: number;
    image: string;
    title: string;
    price: number;
};

const defaultImage = require('@/assets/images/default.png'); // Chemin de votre image par défaut

const Index = () => {
    const navigation = useNavigation();
    const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const { isMenuVisible, closeMenu } = useMenu();
    const route = useRoute();
    var { productId } = route.params as ProductScreenRouteParams || { productId: 0 };
    var { categoryId } = route.params as CategoryScreenRouteParams || { categoryId: 0 };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('products');
                const data = response.data || [];

                // Récupérer les produits pour le carousel
                const featuredProducts = data
                const fetured_products: any[] = [];
                featuredProducts.forEach((product: any) => {
                    if (product.featured) {
                        fetured_products.push(product);
                    }
                }
                );
                setCarouselItems(fetured_products);

                // Récupérer les catégories uniques
                const allCategoriesTitles: any[] = [];
                const uniqueCategories: { id: number; image: string; title: string }[] = [];

                data.forEach((product: { category: any; }) => {
                    if (!allCategoriesTitles.includes(product.category.title)) {
                        allCategoriesTitles.push(product.category.title);
                        uniqueCategories.push({
                            id: product.category.id,
                            image: product.category.image || defaultImage,
                            title: product.category.title || 'Pas de titre',
                        });
                    }
                });
                setCategories(uniqueCategories);

                setProducts(data.filter((product: { featured: any; }) => product.featured).map((product: { id: any; image: any; title: any; price: any; }) => ({
                    id: product.id,
                    image: product.image || defaultImage,
                    title: product.title || 'Pas de titre',
                    price: product.price || 0,
                })));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const renderCarouselItem = ({ item }: { item: CarouselItem }) => (
        <TouchableOpacity style={styles.carouselItem} onPress={() => {
            router.setParams({
                productId: item.id.toString(),
            }); router.push('/ProductScreen/[productId]')
        }}>
            <Image source={{ uri: item.image }} style={styles.carouselImage} />
        </TouchableOpacity>
    );

    const renderCategoryItem = ({ item }: { item: { id: number; image: string; title: string } }) => (
        <TouchableOpacity style={styles.categoryItem} onPress={() => {
            router.setParams({
                categoryTitle: item.title,
            }); router.push('/CategoryScreen/[categoryId]')
        }}>
            <Image source={{ uri: item.image }} style={styles.categoryImage} />
            <Text style={styles.categoryTitle}>{item.title}</Text>
        </TouchableOpacity>
    );

    const renderProductItem = ({ item }: { item: { id: number, image: string, title: string, price: number } }) => (
        <TouchableOpacity style={styles.productItem} onPress={() => {
            router.setParams({
                productId: item.id.toString(),
            }); router.push('/ProductScreen/[productId]')
        }}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
        </TouchableOpacity>
    );

    const listHeaderComponent = () => (
        <>
            <Carousel
                data={carouselItems}
                renderItem={renderCarouselItem}
                sliderWidth={400}
                itemWidth={300}
            />
            <Text style={styles.welcomeText}>Venant des hautes terres d'Écosse,
                nos meubles sont éternels et robustes.
            </Text>
            <Text style={styles.sectionTitle}>Catégories</Text>
            <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
            <Text style={styles.sectionTitle}>Les Highlanders du moment</Text>
        </>
    );

    return (
        <MenuProvider>
            <View style={styles.container}>
                <FlatList
                    data={products}
                    renderItem={renderProductItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    ListHeaderComponent={listHeaderComponent}
                />
                {isMenuVisible && <Menu isVisible={isMenuVisible} onClose={closeMenu} />}
            </View>
        </MenuProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 16,
        textAlign: 'center',
        color: 'gray',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 8,
        color: 'black',
    },
    carouselImage: {
        width: 300,
        height: 200,
        borderRadius: 8,
    },
    carouselItem: {
        margin: 8,
    },
    categoryItem: {
        marginRight: 16,
    },
    categoryImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    categoryTitle: {
        marginTop: 8,
        textAlign: 'center',
        color: 'orange',
    },
    productItem: {
        flex: 1,
        margin: 8,
        alignItems: 'center',
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    productTitle: {
        marginTop: 8,
        textAlign: 'center',
    },
    productPrice: {
        marginTop: 4,
        fontWeight: 'bold',
        color: 'green',
    },
});

export default Index;
