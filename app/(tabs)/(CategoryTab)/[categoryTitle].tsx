import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { api } from '@/api';
import PropTypes from 'prop-types';
import { Link, useRoute } from '@react-navigation/native';
import { CategoryScreenRouteParams } from '@/types';
import { ProductScreenRouteParams } from '@/types';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';



interface SelectedCategoryScreenProps {
    route: {
        params: {
            categoryTitle: string;
        };
    };
}

const SelectedCategoryScreen = (props: SelectedCategoryScreenProps) => {

    const navigation = useNavigation();
    const route = useRoute();
    const { categoryTitle } = useLocalSearchParams() || { categoryTitle: 'Pas de titre' };
    const [products, setProducts] = useState<any[]>([]);
    const params = useLocalSearchParams<{ q?: string }>();
    var [headerImageLink, setHeaderImageLink] = useState<string>('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`products`);
                var productsList: any[] = [];
                response.data.forEach((product: any) => {
                    if (product.category.title === categoryTitle) {
                        productsList.push(product);
                        setHeaderImageLink(product.category.image);
                    }
                });
                console.log(headerImageLink);
                setProducts(productsList);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [categoryTitle]);

    const renderIsOutOfStock = () => {
        return <Text style={styles.outOfStock}>Stock épuisé</Text>;
    }

    const renderProductItem = ({ item }: { item: { image: string; title: string; price: number; productId: number; stock_qty: boolean } }) => (
        <View style={styles.productItem}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.textElement}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
                {item.stock_qty ? '' : renderIsOutOfStock()}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.goBack}>
                <Link to="/AllCategoriesScreen">
                    <Ionicons name="arrow-back" size={24} color="orange" />
                </Link>
                <View style={styles.sectionTitle}><Text>{categoryTitle}</Text></View>
            </View>
            <View>
                <Image
                    source={{ uri: headerImageLink || 'https://via.placeholder.com/200' }}
                    style={styles.headerBackgroundImage}
                />
            </View>
            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={1}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
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
        fontSize: 24,
        fontWeight: 'bold',
        alignItems: 'center',
        marginVertical: 10,
        color: 'gray',
    },
    productItem: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 16,
        justifyContent: 'space-between',
        borderRadius: 8,
        margin: 10,
    },
    productImage: {
        width: 150,
        height: 100,
        borderRadius: 8,
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
    goBack: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between',
    },
    headerBackgroundImage: {
        width: '100%',
        height: 150,
        marginBottom: 10,
        borderRadius: 8,

    },
    separator: {
        marginVertical: 6,
        height: 1,
        width: '100%',
        backgroundColor: '#CED0CEAC',
    },
    outOfStock: {
        color: 'red',
    },
    textElement: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginLeft: 10,
    },
});

export default SelectedCategoryScreen;
