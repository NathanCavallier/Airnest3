import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';
import { api } from '@/api';
import { table } from 'console';


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

type Category = {
    id: number;
    title: string;
    image: string;
};


const FilterScreen = ({ route }: { route: any }) => {
    const navigation = useNavigation();
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [inStock, setInStock] = useState(false);

    const [isSeparator, setSeparator] = useState(false);
    const [availableMaterials, setAvailableMaterials] = useState<Array<{ [key: string]: boolean }>>([]);
    const [clearMaterials, setClearMaterials] = useState<Array<{ [key: string]: boolean }>>([]);
    const [categories, setCategories] = useState<Array<{ [key: string]: boolean }>>([]);
    const [clearCategories, setClearCategories] = useState<Array<{ [key: string]: boolean }>>([]);

    // Récupérer les catégories disponibles
    const allCategories: Array<{ [key: string]: boolean }> = [];
    const fetchCategories = async () => {
        try {
            const response = await api.get('category');
            const data = response.data || [];
            data.forEach((category: { title: string; }) => {
                allCategories.push({ [category.title]: false });
            });
            setCategories(allCategories);
            setClearCategories(allCategories);
            console.log('categories: ', categories);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchCategories();
    }
        , []);

    // Fonction pour appliquer les filtres
    const applyFilters = () => {
        const selectedMaterials: string[] = [];
        availableMaterials.forEach((material) => {
            const key = Object.keys(material)[0];
            if (material[key]) {
                selectedMaterials.push(key);
            }
        });
        const selectedCategories: string[] = [];
        categories.forEach((category) => {
            const key = Object.keys(category)[0];
            if (category[key]) {
                selectedCategories.push(key);
            }
        });

        const filters = {
            minPrice,
            maxPrice,
            materials: selectedMaterials,
            inStock,
            categories: selectedCategories
        };

        router.push({
            pathname: '/SearchScreen',
            params: { filters: JSON.stringify(filters) }
        });

        clearFilters();
    };

    // Fonction pour activer/désactiver un matériau
    const toggleMaterial = (material: string, index: number) => {
        let newMaterials = availableMaterials[index];
        newMaterials[material] = !newMaterials[material];
        const newAvailableMaterials = [...availableMaterials];
        newAvailableMaterials[index] = newMaterials;
        setAvailableMaterials(newAvailableMaterials);
    };

    // Fonction pour activer/désactiver une catégorie
    const toggleCategory = (index: number) => {
        const newCategories = [...categories];
        newCategories.forEach((category, i) => {
            if (i === index) {
                Object.keys(category) && (category[Object.keys(category)[0]] = !category[Object.keys(category)[0]]);
            }
        }
        );
        setCategories(newCategories);
    };

    // Fonction pour afficher/cacher le séparateur
    function set_Separator() {
        if (isSeparator)
            setSeparator(false);
        else
            setSeparator(true);
    }

    // Récupérer les matériaux disponibles
    const allMaterials: Array<{ [key: string]: boolean }> = [];
    const fetchData = async () => {
        try {
            const response = await api.get('products');
            const data = response.data || [];
            data.forEach((product: Product) => {
                product.specification.forEach((spec) => {
                    if (spec.title === 'Material') {
                        const material = spec.content;
                        if (!allMaterials.find((m) => Object.keys(m)[0] === material)) {
                            allMaterials.push({ [material]: false });
                        }
                    }
                }
                );
            });
            setAvailableMaterials(allMaterials);
            setClearMaterials(allMaterials);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }
        , []);

    // Fonction pour réinitialiser les éléments
    const clearElements = (elements: Array<{ [key: string]: boolean }>) => {
        elements.forEach((element) => {
            element[Object.keys(element)[0]] = false;
        });
        return elements;
    }

    // Fonction pour réinitialiser les filtres
    const clearFilters = () => {
        setMinPrice('');
        setMaxPrice('');
        setAvailableMaterials(clearElements(clearMaterials));
        setInStock(false);
        setCategories(clearElements(clearCategories));
    }


    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity style={styles.upButtons} onPress={() => { clearFilters(); applyFilters(); }}>
                    <Text>Fermer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.upButtons} onPress={clearFilters}>
                    <Text>Réinitialiser</Text>
                </TouchableOpacity>
            </View>
            {isSeparator && <View style={styles.separator} />}
            <ScrollView style={styles.container} onScrollEndDrag={() => { set_Separator() }}>
                <View style={styles.searchBarContainer}>
                    <View>
                        <Text style={styles.itemColor}>Prix min €</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder='0'
                            value={minPrice}
                            onChangeText={setMinPrice}
                        />
                    </View>
                    <View>
                        <Text style={styles.itemColor}>Prix max €</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder='1000'
                            value={maxPrice}
                            onChangeText={setMaxPrice}
                        />
                    </View>
                </View>
                <Text style={styles.materialTitle}>Matériaux</Text>
                {availableMaterials.map((material, index) => (
                    <View key={index} style={styles.checkboxContainer}>
                        <TouchableOpacity
                            style={styles.checkbox}
                            onPress={() => toggleMaterial(Object.keys(material)[0], index)}
                        >
                            {Object.values(material)[0] && <View style={styles.checked} />}
                        </TouchableOpacity>
                        <Text onPress={() => toggleMaterial(Object.keys(material)[0], index)}>{Object.keys(material)[0]}</Text>
                    </View>
                ))}
                <Text style={styles.materialTitle}>Stock</Text>
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                        style={styles.checkbox}
                        onPress={() => setInStock(!inStock)}
                    >
                        {inStock && <View style={styles.checked} />}
                    </TouchableOpacity>
                    <Text onPress={() => setInStock(!inStock)}>En stock uniquement</Text>
                </View>
                <Text style={styles.materialTitle}>Catégories</Text>
                {categories.map((category, index) => (
                    <View key={index} style={styles.checkboxContainer}>
                        <TouchableOpacity
                            style={styles.checkbox}
                            onPress={() => toggleCategory(index)}
                        >
                            {Object.values(category)[0] && <View style={styles.checked} />}
                        </TouchableOpacity>
                        <Text onPress={() => toggleCategory(index)}>{Object.keys(category)[0]}</Text>
                    </View>

                ))}
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.button} onPress={applyFilters}>
                        <Text>Appliquer les filtres</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        marginTop: 16,
        marginHorizontal: 16,
    },
    upButtons: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 8,
    },
    searchBarContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemColor: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        width: 160,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        borderRadius: 8
    },
    materialTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 10
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        borderColor: 'black'
    },
    checkbox: {
        width: 24,
        height: 24,
        borderColor: 'gray',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        marginRight: 8
    },
    checked: {
        width: 16,
        height: 16,
        backgroundColor: 'orange'
    },
    button: {
        width: '40%',
        margin: 16,
        padding: 16,
        alignItems: 'center',
        backgroundColor: 'orange',
        borderRadius: 8,
    },
    separator: {
        marginVertical: 6,
        height: 1,
        width: '100%',
        backgroundColor: '#CED0CEAC',
    },
});

export default FilterScreen;
