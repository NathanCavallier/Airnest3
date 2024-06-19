import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { api } from '@/api';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('price_asc');
    const [results, setResults] = useState<{ id: number; title: string; price: number; image: string }[]>([]);

    useEffect(() => {
        fetchResults();
    }, [searchQuery, sortOption]);

    const fetchResults = async () => {
        try {
            const response = await api.get('products', {
                params: {
                    query: searchQuery,
                    sort: sortOption
                }
            });
            let sortedData = response.data;
            // Tri côté client, si nécessaire
            if (sortOption === 'price_asc') {
                sortedData.sort((a: { price: number; }, b: { price: number; }) => a.price - b.price);
                setResults(sortedData);
            } else if (sortOption === 'price_desc') {
                sortedData.sort((a: { price: number; }, b: { price: number; }) => b.price - a.price);
                setResults(sortedData);
            }
            let sortedDtaWithTitles = response.data;
            if (searchQuery) {
                sortedDtaWithTitles = response.data.filter((item: { title: string; }) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
                setResults(sortedDtaWithTitles);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearchChange = (text: React.SetStateAction<string>) => { setSearchQuery(text);};
    const handleSortChange = (value: React.SetStateAction<string>) => setSortOption(value);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Rechercher</Text>
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => router.push('/FilterScreen')}
                >
                    <Ionicons name="filter" size={20} color="gray"></Ionicons>
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.searchInput}
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChangeText={handleSearchChange}
            />
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
                keyExtractor={(item) => item.id.toString()}
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
        borderRadius: 5
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8
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
