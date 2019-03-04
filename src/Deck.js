import React, { Component } from 'react';
import { View, Animated, PanResponder, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {
    static defaultProps = {
        onSwipeRight: () => {},
        onSwipeLeft: () => {}
    }

    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();

        const PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => ture,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x:gesture.dx , y: gesture.dy });
            },
            onPanRespnderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left')
                } else {
                    this.resetPosition();
                }
            }
        });

        this.state = { PanResponder, position, index: 0 };
    }

    forceSwipe(direction) {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(this.state.position, {
            toValue: {
                x: SCREEN_WIDTH, y: 0
            },
            duration: SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction));
    }

    onSwipeComplete(direction) {
        const { onSwipeRight, onSwiprLeft, data } = this.props;
        const item = data[this.state.index];



        direction === 'right' ? onSwipeRight(item) : onSwiprLeft(item);
    }

    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0 } 
        }).start();
    }

    getCardStyle() {
        const { position } = this.state;
        const rotate = posiiton.x.interpolate({
            inoutRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5 ],
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
