/**
 * Created by krishnansriramrama on 10/19/16.
 */
'use strict';

import React, {
    Component,
    PropTypes,
} from 'react';
import {
    Animated,
    PanResponder,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

const DIRECTIONAL_DISTANCE_CHANGE_THRESHOLD = 2;
const PREVIEW_OPEN_DELAY = 700;
const PREVIEW_CLOSE_DELAY = 300;

/**
 * Row that is generally used in a ReactNativeSwipeListView.
 * If you are rendering a SwipeRow explicitly you must pass the SwipeRow exactly two children.
 * The first will be rendered behind the second.
 * e.g.
 <SwipeRow>
 <View style={hiddenRowStyle} />
 <View style={visibleRowStyle} />
 </SwipeRow>
 */
class SwipeRow extends Component {

    constructor(props) {
        super(props);
        this.horizontalSwipeGestureBegan = false;
        this.swipeInitialX = null;
        this.parentScrollEnabled = true;
        this.ranPreview = false;
        this.state = {
            dimensionsSet: false,
            hiddenHeight: 0,
            hiddenWidth: 0,
            translateX: new Animated.Value(0)
        };
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (e, gs) => this.handleOnMoveShouldSetPanResponder(e, gs),
            onPanResponderMove: (e, gs) => this.handlePanResponderMove(e, gs),
            onPanResponderRelease: (e, gs) => this.handlePanResponderEnd(e, gs),
            onPanResponderTerminate: (e, gs) => this.handlePanResponderEnd(e, gs),
            onShouldBlockNativeResponder: _ => false,
        });
    }

    getPreviewAnimation(toValue, delay) {
        return Animated.timing(
            this.state.translateX,
            { duration: this.props.previewDuration, toValue, delay }
        );
    }

    onContentLayout(e) {
        this.setState({
            dimensionsSet: !this.props.recalculateHiddenLayout,
            hiddenHeight: e.nativeEvent.layout.height,
            hiddenWidth: e.nativeEvent.layout.width,
        });

        if (this.props.preview && !this.ranPreview) {
            this.ranPreview = true;
            let previewOpenValue = this.props.previewOpenValue || this.props.rightOpenValue * 0.5;
            this.getPreviewAnimation(previewOpenValue, PREVIEW_OPEN_DELAY)
                .start( _ => {
                    this.getPreviewAnimation(0, PREVIEW_CLOSE_DELAY).start();
                });
        }
    }

    onRowPress() {
        if (this.props.onRowPress) {
            this.props.onRowPress();
        } else {
            if (this.props.closeOnRowPress) {
                this.closeRow();
            }
        }
    }

    handleOnMoveShouldSetPanResponder(e, gs) {
        const { dx } = gs;
        return Math.abs(dx) > DIRECTIONAL_DISTANCE_CHANGE_THRESHOLD;
    }

    handlePanResponderMove(e, gestureState) {
        const { dx, dy } = gestureState;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        // this check may not be necessary because we don't capture the move until we pass the threshold
        // just being extra safe here
        if (absDx > DIRECTIONAL_DISTANCE_CHANGE_THRESHOLD || absDy > DIRECTIONAL_DISTANCE_CHANGE_THRESHOLD) {
            // we have enough to determine direction
            if (absDy > absDx && !this.horizontalSwipeGestureBegan) {
                // user is moving vertically, do nothing, listView will handle
                return;
            }

            // user is moving horizontally
            if (this.parentScrollEnabled) {
                // disable scrolling on the listView parent
                this.parentScrollEnabled = false;
                this.props.setScrollEnabled && this.props.setScrollEnabled(false);
            }

            if (this.swipeInitialX === null) {
                // set tranlateX value when user started swiping
                this.swipeInitialX = this.state.translateX._value
            }
            this.horizontalSwipeGestureBegan = true;

            let newDX = this.swipeInitialX + dx;
            if (this.props.disableLeftSwipe  && newDX < 0) { newDX = 0; }
            if (this.props.disableRightSwipe && newDX > 0) { newDX = 0; }

            this.setState({
                translateX: new Animated.Value(newDX)
            });

        }
    }

    handlePanResponderEnd(e, gestureState) {
        // re-enable scrolling on listView parent
        if (!this.parentScrollEnabled) {
            this.parentScrollEnabled = true;
            this.props.setScrollEnabled && this.props.setScrollEnabled(true);
        }

        // finish up the animation
        let toValue = 0;
        if (this.state.translateX._value >= 0) {
            // trying to open right
            if (this.state.translateX._value > this.props.leftOpenValue / 2) {
                // we're more than halfway
                toValue = this.props.leftOpenValue;
            }
        } else {
            // trying to open left
            if (this.state.translateX._value < this.props.rightOpenValue / 2) {
                // we're more than halfway
                toValue = this.props.rightOpenValue
            }
        }

        this.manuallySwipeRow(toValue);
    }

    /*
     * This method is called by ReactNativeSwipeListView
     */
    closeRow() {
        this.manuallySwipeRow(0);
    }

    manuallySwipeRow(toValue) {
        Animated.spring(this.state.translateX,
            {
                toValue,
                friction: this.props.friction,
                tension: this.props.tension
            }
        ).start();

        if (toValue === 0) {
            this.props.onRowClose && this.props.onRowClose();
        } else {
            this.props.onRowOpen && this.props.onRowOpen();
        }

        // reset everything
        this.swipeInitialX = null;
        this.horizontalSwipeGestureBegan = false;
    }

    renderVisibleContent() {
        // handle touchables
        const onPress = this.props.children[1].props.onPress;

        if (onPress) {
            const newOnPress = _ => {
                this.onRowPress();
                onPress();
            }
            return React.cloneElement(
                this.props.children[1],
                {
                    ...this.props.children[1].props,
                    onPress: newOnPress
                }
            );
        }

        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={ _ => this.onRowPress() }
            >
                {this.props.children[1]}
            </TouchableOpacity>
        )

    }

    renderRowContent() {
        // We do this annoying if statement for performance.
        // We don't want the onLayout func to run after it runs once.
        if (this.state.dimensionsSet) {
            return (
                <Animated.View
                    {...this._panResponder.panHandlers}
                    style={{
                        transform: [
                            {translateX: this.state.translateX}
                        ]
                    }}
                >
                    {this.renderVisibleContent()}
                </Animated.View>
            );
        } else {
            return (
                <Animated.View
                    {...this._panResponder.panHandlers}
                    onLayout={ (e) => this.onContentLayout(e) }
                    style={{
                        transform: [
                            {translateX: this.state.translateX}
                        ]
                    }}
                >
                    {this.renderVisibleContent()}
                </Animated.View>
            );
        }
    }

    render() {
        return (
            <View style={this.props.style ? this.props.style : styles.container}>
                <View style={[
                    styles.hidden,
                    {
                        height: this.state.hiddenHeight,
                        width: this.state.hiddenWidth,
                    }
                ]}>
                    {this.props.children[0]}
                </View>
                {this.renderRowContent()}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        // As of RN 0.29 flex: 1 is causing all rows to be the same height
        // flex: 1
    },
    hidden: {
        bottom: 0,
        left: 0,
        overflow: 'hidden',
        position: 'absolute',
        right: 0,
        top: 0,
    },
});

SwipeRow.propTypes = {
    /**
     * Used by the ReactNativeSwipeListView to close rows on scroll events.
     * You shouldn't need to use this prop explicitly.
     */
    setScrollEnabled: PropTypes.func,
    /**
     * Called when a swipe row is animating open. Used by the ReactNativeSwipeListView
     * to keep references to open rows.
     */
    onRowOpen: PropTypes.func,
    /**
     * TranslateX value for opening the row to the left (positive number)
     */
    leftOpenValue: PropTypes.number,
    /**
     * TranslateX value for opening the row to the right (negative number)
     */
    rightOpenValue: PropTypes.number,
    /**
     * Friction for the open / close animation
     */
    friction: PropTypes.number,
    /**
     * Tension for the open / close animation
     */
    tension: PropTypes.number,
    /**
     * Should the row be closed when it is tapped
     */
    closeOnRowPress: PropTypes.bool,
    /**
     * Disable ability to swipe the row left
     */
    disableLeftSwipe: PropTypes.bool,
    /**
     * Disable ability to swipe the row right
     */
    disableRightSwipe: PropTypes.bool,
    /**
     * Enable hidden row onLayout calculations to run always
     */
    recalculateHiddenLayout: PropTypes.bool,
    /**
     * Called when a swipe row is animating closed
     */
    onRowClose: PropTypes.func,
    /**
     * Styles for the parent wrapper View of the SwipeRow
     */
    style: PropTypes.object,
    /**
     * Should the row do a slide out preview to show that it is swipeable
     */
    preview: PropTypes.bool,
    /**
     * Duration of the slide out preview animation
     */
    previewDuration: PropTypes.number,
    /**
     * TranslateX value for the slide out preview animation
     * Default: 0.5 * props.rightOpenValue
     */
    previewOpenValue: PropTypes.number
};

SwipeRow.defaultProps = {
    leftOpenValue: 0,
    rightOpenValue: 0,
    closeOnRowPress: true,
    disableLeftSwipe: false,
    disableRightSwipe: false,
    recalculateHiddenLayout: false,
    preview: false,
    previewDuration: 300
};

export default SwipeRow;