/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {PanResponder, StyleSheet, View} = ReactNative;

import type {PanResponderInstance, GestureState} from 'PanResponder';
import type {PressEvent} from 'CoreEventTypes';

type CircleStyles = {
    backgroundColor?: string,
    left?: number,
    top?: number,
};

const CIRCLE_SIZE = 40;

type Props = $ReadOnly<{||}>;


export default class PanResponderExample extends React.Component<Props> {
    _handleStartShouldSetPanResponder = (
        event: PressEvent,
        gestureState: GestureState,
    ): boolean => {
        console.log("_handlerStartShouldSetPanResponder");
        console.log("GestureState : " + gestureState);


        // Should we become active when the user presses down on the circle?
        return true;
    };

    _handleMoveShouldSetPanResponder = (
        event: PressEvent,
        gestureState: GestureState,
    ): boolean => {
        // Should we become active when the user moves a touch over the circle?
        return true;
    };

    _handlePanResponderGrant = (
        event: PressEvent,
        gestureState: GestureState,
    ) => {
        this._highlight();
    };

            _handlePanResponderMove = (event: PressEvent, gestureState: GestureState) => {
            this._circleStyles.style.left = this._previousLeft + gestureState.dx;
            this._circleStyles.style.top = this._previousTop + gestureState.dy;
            this._updateNativeStyles();
        };

        _handlePanResponderEnd = (event: PressEvent, gestureState: GestureState) => {
            this._unHighlight();
            this._previousLeft += gestureState.dx;
            this._previousTop += gestureState.dy;
    };

    _panResponder: PanResponderInstance = PanResponder.create({
        onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
        onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
        onPanResponderGrant: this._handlePanResponderGrant,
        onPanResponderMove: this._handlePanResponderMove,
        onPanResponderRelease: this._handlePanResponderEnd,
        onPanResponderTerminate: this._handlePanResponderEnd,
    });

    _panRespondBackground : PanResponderInstance = PanResponder.create({
        onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
        onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
        onPanResponderGrant: this._handlePanResponderGrant,
        onPanResponderMove: this._handlePanResponderMove,
        onPanResponderRelease: this._handlePanResponderEnd,
        onPanResponderTerminate: this._handlePanResponderEnd,
    });

    _previousLeft: number = 0;
    _previousTop: number = 0;
    _circleStyles: {|style: CircleStyles|} = {style: {}};
    circle: ?React.ElementRef<typeof View> = null;

    UNSAFE_componentWillMount() {
        this._previousLeft = 20;
        this._previousTop = 84;
        this._circleStyles = {
            style: {
                left: this._previousLeft,
                top: this._previousTop,
                backgroundColor: 'green',
            },
        };
    }

    componentDidMount() {
        this._updateNativeStyles();
    }

    _highlight() {
        this._circleStyles.style.backgroundColor = 'blue';
        this._updateNativeStyles();
    }

    _unHighlight() {
        this._circleStyles.style.backgroundColor = 'green';
        this._updateNativeStyles();
    }

    _updateNativeStyles() {
        this.circle && this.circle.setNativeProps(this._circleStyles);
    }

    render() {
        return (
            <View style={styles.container}>
                <View
                    ref={circle => {
                        this.circle = circle;
                    }}
                    style={styles.circle}
                    {...this._panResponder.panHandlers}
                />
            </View>
        );
    }
}

const borders = {
    tl: 20,
    tr: 20,
    bl: 20,
    br: 20,
};

const styles = StyleSheet.create({
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderTopLeftRadius: borders.tl,
        borderTopRightRadius: borders.tr,
        borderBottomLeftRadius: borders.bl,
        borderBottomRightRadius: borders.br,
        position: 'absolute',
        left: 0,
        top: 0,
    },
    container: {
        flex: 1,
        backgroundColor : 'black',
        paddingTop: 64,
    },
});

exports.title = 'PanResponder Sample';
exports.description =
    'Shows the Use of PanResponder to provide basic gesture handling';
exports.examples = [
    {
        title: 'Basic gesture handling',
        render: function(): React.Element<typeof PanResponderExample> {
            return <PanResponderExample />;
        },
    },
];