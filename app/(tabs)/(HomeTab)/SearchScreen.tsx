import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { api } from '@/api';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';


type Filter = {
    minPrice: string;
    maxPrice: string;
    materials: string[];
    inStock: boolean;
    categories: string[];
};

type Product = {
    id: number;
    title: string;
    image: string;
    description: string;
    price: number;
    old_price: number;
    shipping_amount: number;
    in_stock: boolean;
    gallery: { image: string }[];
    specification: { title: string; content: string }[];
    color: { name: string }[];
    size: { length: number; width: number }[];
    category: { id: number; title: string };
};

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('price_asc');
    const [results, setResults] = useState<Product[]>([]);
    const { filters } = useLocalSearchParams() as { filters: string } || {};
    let filter: Filter = { minPrice: '', maxPrice: '', materials: [], inStock: false, categories: [] };
    if (filters) {
        filter = JSON.parse(filters) as Filter;
    }
    let [material, setMaterial] = useState(filter.materials);
    let [category, setCategory] = useState(filter.categories);
    let [minPrice, setMinPrice] = useState(filter.minPrice);
    let [maxPrice, setMaxPrice] = useState(filter.maxPrice);
    let [inStock, setInStock] = useState(filter.inStock);

    console.log('material: ', material);
    console.log('category: ', category);
    console.log('minPrice: ', minPrice);
    console.log('maxPrice: ', maxPrice);
    console.log('inStock: ', inStock);

    const [displayClearButton, setDisplayClearButton] = useState(false); // Pour afficher ou non le bouton d'annulation
    const [skipFilter, setSkipFilter] = useState(false); // Pour éviter de filtrer les résultats lors de l'initialisation
    const [displyItems, setDisplayItems] = useState(false);

    useEffect(() => {
        fetchResults();
    }, [searchQuery, sortOption]);

    // Récupérer les résultats de la recherche
    const fetchResults = async () => {
        try {
            const response = await api.get('products', {
                params: {
                    query: searchQuery,
                    sort: sortOption
                }
            });
            setDisplayClearButton(false);
            let sortedData = response.data;
            // Tri côté client, si nécessaire
            if (sortOption === 'price_asc') {
                sortedData.sort((a: { price: number; }, b: { price: number; }) => a.price - b.price);
                setResults(sortedData);
            } else if (sortOption === 'price_desc') {
                sortedData.sort((a: { price: number; }, b: { price: number; }) => b.price - a.price);
                setResults(sortedData);
            }
            if (searchQuery) {
                sortedData = response.data.filter((item: { title: string; }) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
                setResults(sortedData);
                setDisplayClearButton(true);
            }
            if (!skipFilter) {
                // Filtrage : si des filtres sont appliqués, les appliquer
                if (material.length > 0) {
                    if (!displayClearButton) {
                        setDisplayClearButton(true);
                    }
                    let sortedByMaterial: any[] = [];
                    material.forEach((material: string) => {
                        sortedData.forEach((element: Product) => {
                            let spec = element.specification;
                            spec.map((item) => {
                                if (item.title === 'Material' && item.content === material) {
                                    sortedByMaterial.push(element);
                                }
                            }
                            );
                        });
                    }
                    );
                    setResults(sortedByMaterial);
                }
                if (category.length > 0) {
                    if (!displayClearButton) {
                        setDisplayClearButton(true);
                    }
                    let sortedByCategory: any[] = [];
                    let tampon = results ? sortedData : results;
                    category.forEach(cat => {
                        tampon.forEach((element: Product) => {
                            if (element.category.title === cat) {
                                sortedByCategory.push(element);
                            }
                        }
                        );
                    });
                    setResults(sortedByCategory);
                }
                if (minPrice && maxPrice) {
                    if (!displayClearButton) {
                        setDisplayClearButton(true);
                    }
                    sortedData = sortedData.filter((item: { price: number; }) => item.price >= parseInt(minPrice) && item.price <= parseInt(maxPrice));
                    setResults(sortedData);
                }
                if (inStock) {
                    if (!displayClearButton) { // Afficher le bouton d'annulation
                        setDisplayClearButton(true);
                    }
                    sortedData = sortedData.filter((item: { in_stock: boolean; }) => item.in_stock === true);
                    setResults(sortedData);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Afficher le bouton d'annulation ou le bouton d'affichage de tous les articles
    function DisplayClearButton() {
        if (displayClearButton) {
            return (
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => {
                        setMaterial([]);
                        setCategory([]);
                        setMinPrice('');
                        setMaxPrice('');
                        setInStock(false); // Réinitialiser les filtres
                        setSkipFilter(true);
                        setDisplayItems(true);
                        setDisplayClearButton(false);
                    }}
                >
                    <Text>Annuler</Text>
                </TouchableOpacity>
            );
        } else if (displyItems) {
            return (
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => {
                        fetchResults();
                        setDisplayItems(false);
                    }}
                >
                    <Text>Afficher tout</Text>
                </TouchableOpacity>
            );
        }
    }

    const handleSearchChange = (text: React.SetStateAction<string>) => { setSearchQuery(text); };
    const handleSortChange = (value: React.SetStateAction<string>) => setSortOption(value);

    // Afficher les filtres sélectionnés
    function displaySelectedFilters() {
        // Afficher les filtres sélectionnés
        if (material.length > 0 || category.length > 0 || minPrice || maxPrice || inStock) {
            let selectedFilters = '';
            if (material.length > 0) {
                material.forEach((element: string) => {
                    selectedFilters += element + ', ';
                });
            }
            if (category.length > 0) {
                category.forEach((element: string) => {
                    selectedFilters += element + ', ';
                });
            }
            if (minPrice) {
                selectedFilters += 'minPrice: ' + minPrice + ', ';
            }
            if (maxPrice) {
                selectedFilters += 'maxPrice: ' + maxPrice + ', ';
            }
            if (inStock) {
                selectedFilters += 'Articles en stock, ';
            }
            return (
                <Text style={{ margin: 5 }} >
                    Filtres sélectionnés: <Text style={{ color: 'orange' }}>{selectedFilters}</Text>
                </Text>
            );
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Rechercher</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        style={styles.filterButton}
                        onPress={() => { setSkipFilter(false); router.push('/FilterScreen') }}
                    >
                        <Ionicons name="filter" size={20} color="gray"></Ionicons>
                    </TouchableOpacity>
                    {DisplayClearButton()}
                </View>
            </View>
            <TextInput
                style={styles.searchInput}
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChangeText={handleSearchChange}
            />
            {displaySelectedFilters()}
            <View style={styles.sortContainer}>
                <Text>Trier par:</Text>
                <TouchableOpacity onPress={() => handleSortChange('price_asc')}>
                    <Text style={sortOption === 'price_asc' ? styles.activeSortOption : styles.sortOption}>
                        prix (asc)
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSortChange('price_desc')}>
                    <Text style={sortOption === 'price_desc' ? styles.activeSortOption : styles.sortOption}>
                        prix (desc)
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={results}
                keyExtractor={(item) => item.id.toString() + Math.random()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => router.push({
                            pathname: '/(tabs)/(HomeTab)/ProductScreen/[productId]',
                            params: { productId: item.id }
                        })}
                    >
                        <View style={styles.resultItem}>
                            <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 8 }} />
                            <Text>{item.title}</Text>
                            <Text>{item.price} €</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    filterButton: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
        marginRight: 5
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        borderRadius: 8
    },
    sortContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16
    },
    sortOption: {
        marginHorizontal: 10
    },
    activeSortOption: {
        marginHorizontal: 10,
        fontWeight: 'bold'
    },
    resultItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1
    }
});

export default SearchScreen;
