import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

const FilterScreen = ({ route }: { route: any }) => {
    const navigation = useNavigation();
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [materials, setMaterials] = useState<{ [key: string]: boolean }>({
        bois: false,
        acier: false,
        plastique: false,
        verre: false,
        cuivre: false,
        aluminium: false
    });
    const [inStock, setInStock] = useState(false);
    const [categories, setCategories] = useState<{ [key: string]: boolean }>({
        table: false,
        lit: false
    });
    const [isSeparator, setSeparator] = useState(false);

    const applyFilters = () => {
        const selectedMaterials = Object.keys(materials).filter(key => materials[key]);
        const selectedCategories = Object.keys(categories).filter(key => categories[key]);

        const filters = {
            minPrice,
            maxPrice,
            materials: selectedMaterials,
            inStock,
            categories: selectedCategories
        };

        router.push({
            pathname: '/HomeScreen',
            params: { filters }
        });
    };

    const toggleMaterial = (material: string) => {
        setMaterials({
            ...materials,
            [material]: !materials[material]
        });
    };

    const toggleCategory = (category: string) => {
        setCategories({
            ...categories,
            [category]: !categories[category]
        });
    };


    function set_Separator() {
        if(isSeparator)
            setSeparator(false);
        else
            setSeparator(true);
    }

    const clearFilters = () => {
        setMinPrice('');
        setMaxPrice('');
        setMaterials({
            bois: false,
            acier: false,
            plastique: false,
            verre: false,
            cuivre: false,
            aluminium: false
        });
        setInStock(false);
        setCategories({
            table: false,
            lit: false
        });
    }


    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.upButtons}>Fermer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={clearFilters}>
                    <Text style={styles.upButtons}>Réinitialiser</Text>
                </TouchableOpacity>
            </View>
            {isSeparator && <View style={styles.separator} />}
            <ScrollView style={styles.container} onScrollEndDrag={() => {set_Separator()}}>
                <View style={styles.searchBarContainer}>
                    <View>
                        <Text style={styles.itemColor}>Prix min €</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={minPrice}
                            onChangeText={setMinPrice}
                        />
                    </View>
                    <View>
                        <Text style={styles.itemColor}>Prix max €</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={maxPrice}
                            onChangeText={setMaxPrice}
                        />
                    </View>
                </View>
                <Text style={styles.materialTitle}>Matériaux</Text>
                {Object.keys(materials).map((material) => (
                    <View key={material} style={styles.checkboxContainer}>
                        <TouchableOpacity
                            style={styles.checkbox}
                            onPress={() => toggleMaterial(material)}
                        >
                            {materials[material] && <View style={styles.checked} />}
                        </TouchableOpacity>
                        <Text>{material}</Text>
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
                    <Text>En stock uniquement</Text>
                </View>
                <Text style={styles.materialTitle}>Catégories</Text>
                {Object.keys(categories).map((category) => (
                    <View key={category} style={styles.checkboxContainer}>
                        <TouchableOpacity
                            style={styles.checkbox}
                            onPress={() => toggleCategory(category)}
                        >
                            {categories[category] && <View style={styles.checked} />}
                        </TouchableOpacity>
                        <Text>{category}</Text>
                    </View>
                ))}
                <TouchableOpacity onPress={applyFilters}><Text style={styles.button}>Appliquer les filtres</Text></TouchableOpacity>
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
        marginBottom: 8
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
