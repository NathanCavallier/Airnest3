import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, ScrollView, FlatList, Image } from 'react-native';

const Carousel = ({ data, renderItem, sliderWidth, itemWidth } : { data: any, renderItem: any, sliderWidth: any, itemWidth: any }) => {
    return (
        <ScrollView>
            {/* Votre code pour afficher les items du carousel */}
            {data.map(({item, index}: {item: any, index: any}) => (
                <View key={index} style={{ width: itemWidth }}>
                    {renderItem({ item })}
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

export default Carousel;
