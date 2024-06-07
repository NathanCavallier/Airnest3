// Source: Index.tsx
import { api } from "@/api";
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';


const Index = ({ navigation }: {navigation: any}) => {
  const [carouselItems, setCarouselItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Fetch carousel images from the API
    api.get('products')
      .then(response => {
        const data = response.data || [];
        setCarouselItems(data.map((product: { image: string; title: string; }) => ({
          image: product?.image,
          title: product?.title,
        })));
        setCategories(data.map((product: any) => product?.category));
        setProducts(data.filter((product: any) => product?.featured));
      })
      .catch(error => console.error(error));
  }, []);

  const renderCarouselItem = ({ item, index }: { item: { image: string; title: string; }; index: number }) => (
    <Image source={{ uri: item?.image }} style={styles.carouselImage} />
  );

  const renderCategoryItem = ({ item, index }: { item: { image: string; title: string; }; index: number }) => (
    <View style={styles.categoryItem}>
      <Image source={{ uri: item?.image }} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item?.title}</Text>
    </View>
  );
  
  const renderProductItem = ({ item }: { item: { image: string; title: string; price: number; } }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item?.image }} style={styles.productImage} />
      <Text style={styles.productText}>{item?.title}</Text>
      <Text style={styles.productPrice}>${item?.price}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Carousel
        data={carouselItems}
        renderItem={renderCarouselItem}
        sliderWidth={400}
        itemWidth={300}
      />
      <Text style={styles.fixedText}>Bienvenue sur notre site de meubles</Text>
      <Text style={styles.sectionTitle}>Catégories</Text>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        style={styles.categoryList}
      />
      <Text style={styles.sectionTitle}>Les Highlanders du moment</Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        style={styles.productList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  carouselImage: {
    width: 300,
    height: 150,
  },
  fixedText: {
    marginVertical: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  categoryList: {
    marginVertical: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
  },
  productList: {
    marginVertical: 10,
  },
  productItem: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  productText: {
    marginTop: 5,
    fontSize: 14,
  },
  productPrice: {
    marginTop: 5,
    fontSize: 14,
    color: 'green',
  },
});

export default Index;
