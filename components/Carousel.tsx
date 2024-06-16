import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Animated } from 'react-native';

const Carousel = ({ data, renderItem, sliderWidth, itemWidth }: { data: any, renderItem: any, sliderWidth: any, itemWidth: any }) => {

    const scrollViewRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = new Animated.Value(0); // Crée une nouvelle valeur animée

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                const nextIndex = prevIndex + 1 === data.length ? 0 : prevIndex + 1;

                // Animer la valeur de défilement
                Animated.timing(scrollX, {
                    toValue: itemWidth * nextIndex,
                    duration: 500, // Durée de l'animation en millisecondes
                    useNativeDriver: true, // Utiliser le pilote natif pour une meilleure performance
                }).start();

                return nextIndex;
            });
        }, 3000); // Change l'image toutes les 3 secondes

        return () => clearInterval(interval);
    }, [data.length, itemWidth]);

    return (
        <Animated.ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={itemWidth}
            snapToAlignment="center"
            contentContainerStyle={{ width: sliderWidth }}
            // Attacher la valeur animée au défilement horizontal
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
            )}
            scrollEventThrottle={16} // Définir la fréquence des événements de défilement
        >
            {data.map((item: { id: any; }, index: { toString: () => any; }) => (
                <View key={item.id || index.toString()} style={{ width: itemWidth, margin: 5 }}>
                    {item ? renderItem({ item }) : <Text>Cet article n'existe pas!</Text>}
                </View>
            ))}
        </Animated.ScrollView>
    );
};

Carousel.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    renderItem: PropTypes.func.isRequired,
    sliderWidth: PropTypes.number.isRequired,
    itemWidth: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Carousel;
