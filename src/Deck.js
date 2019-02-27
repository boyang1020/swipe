import React, { Component } from 'react';
import { View, Animated, PanResponder } from 'react-native';

class Deck extends Component {
    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();

        const PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => ture,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x:gesture.dx , y: gesture.dy });
            },
            onPanRespnderRelease: () => {}
        });

        this.state = { PanResponder, position };
    }

    getCardStyle() {
        const { position } = this.state;
        const rotate = posiiton.x.interpolate({
            inoutRange: [-500, 0, 500],
            outputRange: ['-120deg', '0deg', '120deg']
        })
        return {
            ...position.getLayout(),
            transform: [{ rotate }]
        }
    }

    renderCards() {
        return this.props.data.map((item, index) => {
            if (index === 0) {
                return (
                    <Animated.View
                    key={item.id}
                        style={this.getCardStyle}
                        {...this.state.PanResponder.panHandlers}>
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }

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
