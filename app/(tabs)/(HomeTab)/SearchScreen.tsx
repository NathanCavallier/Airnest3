import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { api } from '@/api';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    material: '',
    minPrice: '',
    maxPrice: '',
    category: '',
    inStock: false
  });
  const [sortOption, setSortOption] = useState('price_asc');
  const [results, setResults] = useState<{ id: number; title: string; description: string; price: number }[]>([]);
  
  useEffect(() => {
    fetchResults();
  }, [searchQuery, filters, sortOption]);
  
  const fetchResults = async () => {
    try {
      const response = await api.get('products', {
        params: {
          query: searchQuery,
          material: filters.material,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          category: filters.category,
          inStock: filters.inStock,
          sort: sortOption
        }
      });
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (text: React.SetStateAction<string>) => setSearchQuery(text);

  const handleFilterChange = (name: string, value: string | boolean) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSortChange = (value: React.SetStateAction<string>) => {
    setSortOption(value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher un produit..."
        value={searchQuery}
        onChangeText={handleSearchChange}
      />
      <View style={styles.filtersContainer}>
        <Text>Filtres:</Text>
        <TextInput
          style={styles.filterInput}
          placeholder="Matériau"
          value={filters.material}
          onChangeText={(value) => handleFilterChange('material', value)}
        />
        <TextInput
          style={styles.filterInput}
          placeholder="Prix min"
          keyboardType="numeric"
          value={filters.minPrice}
          onChangeText={(value) => handleFilterChange('minPrice', value)}
        />
        <TextInput
          style={styles.filterInput}
          placeholder="Prix max"
          keyboardType="numeric"
          value={filters.maxPrice}
          onChangeText={(value) => handleFilterChange('maxPrice', value)}
        />
        <TextInput
          style={styles.filterInput}
          placeholder="Catégorie"
          value={filters.category}
          onChangeText={(value) => handleFilterChange('category', value)}
        />
        <View style={styles.checkboxContainer}>
          <Text>En stock uniquement</Text>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => handleFilterChange('inStock', !filters.inStock)}
          >
            {filters.inStock && <View style={styles.checked} />}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.sortContainer}>
        <Text>Trier par:</Text>
        <Picker
          selectedValue={sortOption}
          onValueChange={(value) => handleSortChange(value)}
          style={styles.picker}
        >
          <Picker.Item label="Prix croissant" value="price_asc" />
          <Picker.Item label="Prix décroissant" value="price_desc" />
          <Picker.Item label="Nouveauté" value="newest" />
          <Picker.Item label="En stock" value="in_stock" />
        </Picker>
      </View>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>{item.price} €</Text>
          </View>
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8
  },
  filtersContainer: {
    marginBottom: 16
  },
  filterInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    width: 24,
    height: 24,
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8
  },
  checked: {
    width: 16,
    height: 16,
    backgroundColor: 'black'
  },
  sortContainer: {
    marginBottom: 16
  },
  picker: {
    height: 40,
    width: '100%'
  },
  resultItem: {
    padding: 16,
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  }
});

export default SearchScreen;
