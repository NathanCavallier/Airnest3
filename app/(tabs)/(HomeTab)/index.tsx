import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { api } from '@/api';

const Index = ({ navigation }: { navigation: any }) => {
    const [carouselItems, setCarouselItems] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);


    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <ScrollView>
                <Text>Home Screen</Text>
            </ScrollView>
        </View>
    );
};

export default Index;
