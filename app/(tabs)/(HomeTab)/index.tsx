import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { api } from '@/api';
import Carousel from '@/components/Carousel';
import Menu from '@/app/Menu';
import { MenuProvider, useMenu } from '@/contexts/MenuContext';
import Header from '@/app/Header';
import PropTypes from 'prop-types';


const defaultImage = require('@/assets/images/default.png'); // Chemin de votre image par défaut

const Index = ({ navigation }: { navigation: any }) => {
    const [carouselItems, setCarouselItems] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const { isMenuVisible, closeMenu } = useMenu();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('products');
                const data = response.data || [];
                setCarouselItems(data.map((product: { id: number; image: string; title: string; }) => ({
                    id: product.id,
                    image: product?.image || defaultImage,
                    title: product?.title || 'Pas de titre',
                })));
                setCategories(data.map((product: any) => ({
                    id: product.id,
                    image: product?.category?.image || defaultImage,
                    title: product?.category?.title || 'Pas de titre'
                })));
                setProducts(data.filter((product: any) => product?.featured).map((product: any) => ({
                    id: product.id,
                    image: product?.image || defaultImage,
                    title: product?.title || 'Pas de titre',
                    price: product?.price || 0
                })));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleCategoryPress = (categoryId: number) => {
        navigation.navigate('CategoryScreen', { categoryId });
    };

    const handleProductPress = (productId: number) => {
        navigation.navigate('ProductScreen', { productId });
    };

    const renderCarouselItem = ({ item }: { item: { image: string; title: string; } }) => (
        <Image source={{ uri: item.image }} style={styles.carouselImage} />
    );

    const renderCategoryItem = ({ item }: { item: { image: string; title: string; categoryId: number; } }) => (
        <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress(item.categoryId)}>
            <Image source={{ uri: item.image }} style={styles.categoryImage} />
            <Text style={styles.categoryTitle}>{item.title}</Text>
        </TouchableOpacity>
    );

    const renderProductItem = ({ item }: { item: { image: string; title: string; price: number; } }) => (
        <View style={styles.productItem}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
        </View>
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

Index.propTypes = {
    navigation: PropTypes.object.isRequired,
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
        color: 'gray'
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
