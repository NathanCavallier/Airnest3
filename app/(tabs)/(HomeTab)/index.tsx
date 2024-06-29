import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { api } from '@/api';
import Carousel from '@/components/Carousel';
import Menu from '@/app/Menu';
import { MenuProvider, useMenu } from '@/contexts/MenuContext';
import { router, Link } from 'expo-router';


type CarouselItem = {
    id: number;
    image: string;
    title: string;
};

const defaultImage = require('@/assets/images/default.png'); // Chemin de votre image par défaut

const Index = () => {

    const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const { isMenuVisible, closeMenu } = useMenu();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('products');
                const data = response.data || [];

                // Récupérer les produits pour le carousel
                const fetured_products: any[] = [];
                data.forEach((product: any) => {
                    if (product.featured) {
                        fetured_products.push({
                            id: product.id,
                            image: product.image || defaultImage,
                            title: product.title || 'Pas de titre',
                        });
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
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <ActivityIndicator size="large" color="orange" />;
    }

    const handelPressProduct = (productId: number) => {
        router.push({
            pathname: '/ProductScreen/[productId]',
            params: { productId },
        });
    }

    const handelPressCategory = (categoryTitle: string) => {
        router.push({
            pathname: '/(tabs)/(HomeTab)/CategoryScreen/[categoryTitle]',
            params: { categoryTitle },
        });
    }

    const renderCarouselItem = ({ item }: { item: CarouselItem }) => (
        <TouchableOpacity style={styles.carouselItem} onPress={() => { handelPressProduct(item.id) }}>
            <Image source={{ uri: item.image }} style={styles.carouselImage} />
        </TouchableOpacity>
    );

    const renderCategoryItem = ({ item }: { item: { id: number; image: string; title: string } }) => (
        <TouchableOpacity style={styles.categoryItem} onPress={() => { handelPressCategory(item.title) }}>
            <Image source={{ uri: item.image }} style={styles.categoryImage} />
            <Text style={styles.categoryTitle}>{item.title}</Text>
        </TouchableOpacity>
    );

    const renderProductItem = ({ item }: { item: { id: number, image: string, title: string, price: number } }) => (
        <TouchableOpacity style={styles.productItem} onPress={() => { handelPressProduct(item.id) }}>
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
