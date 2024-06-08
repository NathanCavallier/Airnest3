import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, Image } from 'react-native';
import { api } from '@/api';
import Carousel from '@/components/Carousel';
import Menu from '@/app/Menu';
import { MenuProvider, useMenu } from '@/contexts/MenuContext';
import Header from '@/app/Header';
import PropTypes from 'prop-types';

const defaultImage = require('@/assets/images/default.png'); // Chemin de votre image par défaut

const Index = ({ navigation }: { navigation: any }) => {
    const [carouselItems, setCarouselItems] = useState<any[]>([
        { image: defaultImage, title: 'Chargement...' },
        { image: defaultImage, title: 'Chargement...' },
        { image: defaultImage, title: 'Chargement...' }
    ]);
    const [categories, setCategories] = useState<any[]>([
        { image: defaultImage, title: 'Chargement...' },
        { image: defaultImage, title: 'Chargement...' },
        { image: defaultImage, title: 'Chargement...' }
    ]);
    const [products, setProducts] = useState<any[]>([
        { image: defaultImage, title: 'Chargement...', price: 0 },
        { image: defaultImage, title: 'Chargement...', price: 0 },
        { image: defaultImage, title: 'Chargement...', price: 0 }
    ]);
    const { isMenuVisible, closeMenu } = useMenu();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('products');
                const data = response.data || [];
                setCarouselItems(data.map((product: { image: string; title: string; }) => ({
                    image: product?.image || defaultImage,
                    title: product?.title || 'Pas de titre',
                })));
                setCategories(data.map((product: any) => ({
                    image: product?.category?.image || defaultImage,
                    title: product?.category?.title || 'Pas de titre'
                })));
                setProducts(data.filter((product: any) => product?.featured).map((product: any) => ({
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

    const renderCarouselItem = ({ item }: { item: { image: string; title: string; } }) => (
        <Image source={{ uri: item.image }} style={{ width: 300, height: 200 }} />
    );

    const renderCategoryItem = ({ item }: { item: { image: string; title: string; } }) => (
        <View>
            <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
            <Text>{item.title}</Text>
        </View>
    );

    const renderProductItem = ({ item }: { item: { image: string; title: string; price: number; } }) => (
        <View>
            <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
            <Text>{item.title}</Text>
            <Text>${item.price}</Text>
        </View>
    );

    return (
        <MenuProvider>
            <View style={{ flex: 1 }}>
                <Header />
                <ScrollView>
                    <Carousel
                        data={carouselItems}
                        renderItem={renderCarouselItem}
                        sliderWidth={400}
                        itemWidth={300}
                    />
                    <Text>Bienvenue sur notre site de meubles</Text>
                    <Text>Catégories</Text>
                    <FlatList
                        data={categories}
                        renderItem={renderCategoryItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <Text>Les Highlanders du moment</Text>
                    <FlatList
                        data={products}
                        renderItem={renderProductItem}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                    />
                </ScrollView>
                {isMenuVisible && <Menu isVisible={isMenuVisible} onClose={closeMenu} />}
            </View>
        </MenuProvider>
    );
};

Index.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Index;
