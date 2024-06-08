import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const Carousel = ({ data, renderItem, sliderWidth, itemWidth }: { data: any, renderItem: any, sliderWidth: any, itemWidth: any }) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={itemWidth}
            snapToAlignment="center"
            contentContainerStyle={{ width: sliderWidth }}
        >
            {/* Votre code pour afficher les items du carousel */}
            {data.map((item: any, index: number) => (
                <View key={item.id || index.toString()} style={{ width: itemWidth, margin: 5 }}>
                    {item ? renderItem({ item }) : <Text>Cette article n'existe pas!</Text>}
                </View>
            ))}
        </ScrollView>
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
