import React, { Component } from 'react';
import { View, Animated, PanResponder } from 'react-native';

class Deck extends Component {
    constructor(props) {
        super(props);

        const PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => ture,
            onPanResponderMove: () => {},
            onPanRespnderRelease: () => {}
        });

        this.state = { PanResponder };
    }
    renderCards() {
        return this.props.data.map(item => {
            return this.props.renderCards(item);
        });
    }
    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        );
    }
}

export default Deck;
