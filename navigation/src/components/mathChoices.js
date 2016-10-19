/**
 * Created by krishnansriramrama on 10/18/16.
 */
import React, { Component } from 'react';
import SwipeListView from './shared/ReactNativeSwipeListView/SwipeListView'
import SwipeRow from './shared/ReactNativeSwipeListView/SwipeRow';

import {
    AppRegistry,
    StyleSheet,
    ListView,
    TouchableOpacity,
    Text,
    View,
} from 'react-native';
// var SwipeListView = require('./shared/ReactNativeSwipeListView/SwipeListView');

export class MathChoices extends Component {
    constructor() {
        super();
        this.mathChoices = [{name: 'Tables', category: 'Tables', description: 'Tables from 0 to 20'},
            {name:'One digit', category:'Addition', description:'One digit addition stacks'},
            {name:'Two Digit', category:'Addition', description:'Two digit addition stacks'},
            {name:'Three Digit', category:'Addition', description:'Three digit addition stacks'},
            {name:'One Digit', category:'Subtraction', description:'One digit subtraction stacks'},
            {name:'Two Digit', category:'Subtraction', description:'Two digit subtraction stacks'},
            {name:'Three Digit', category:'Subtraction', description:'Three digit subtraction stacks'},
            {name:'One Digit', category:'Combination', description:'One digit complex stacks'},
            {name:'Two digit', category:'Combination', description:'Two digit complex stacks'},
            {name:'Three digit', category:'Combination', description:'Three digit complex stacks'}
        ];
        this.renderRow = this.renderRow.bind(this);
    }

    componentWillMount() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2});
        this.state = {
            dataSource: ds.cloneWithRowsAndSections(this.genRows()),
        }
    }

    genRows() {
        console.log('MathChoices: GenRows');
        var mathCategoryMap = {};
        this.mathChoices.forEach(function(mathChoice) {
            if(!mathCategoryMap[mathChoice.category]) {
                mathCategoryMap[mathChoice.category] = [];
            }
            mathCategoryMap[mathChoice.category].push(mathChoice);
        });
        console.log(mathCategoryMap);
        return mathCategoryMap;
    }

    renderRow(rowData, sectionID, rowID) {
        if(rowID == 0 && sectionID === 'Tables') {
            return this.nonSwipableCell(rowData, sectionID, rowID);
        }

        return this.swipableCell(rowData, sectionID, rowID);
    }

    nonSwipableCell(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={ () => { this.onPress(rowID, sectionID); }}>
                <View style={styles.row}>
                    <Text style={styles.text}>
                        { rowData.name }
                    </Text>
                    <Text>
                        {rowData.description}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    swipableCell(rowData, sectionID, rowID) {
        return(<SwipeRow
            leftOpenValue={0}
            rightOpenValue={-210}
        >
            <View style={styles.standaloneRowBack}>
                <View></View>
                <View style={ styles.swipeRightView }>
                    <TouchableOpacity style= { styles.swipeButtonPrimary} onPress = { () => this.onPress2Stack('2',rowData) }>
                        <Text style={ styles.buttonText} >2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = { styles.swipeButtonSecondary } onPress = { () => this.onPress3Stack('3', rowData) }>
                        <Text style={ styles.buttonText} >3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = { styles.swipeButtonTertiary } onPress = { () => this.onPress4Stack('4', rowData) }>
                        <Text style={ styles.buttonText} >4</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.standaloneRowFront}>
                <Text style={styles.text}>
                    { rowData.name }
                </Text>
                <Text>
                    {rowData.description}
                </Text>
            </View>
        </SwipeRow>);
    }

    renderSectionHeader(sectionData, category) {
        return (
            <View style={ styles.sectionHeader }>
                <Text style={ styles.sectionHeaderText }>{category}</Text>
            </View>
        )
}

    render() {
        return (
            <ListView style = { styles.listview }
                      dataSource={this.state.dataSource}
                      renderRow={this.renderRow}
                      renderSectionHeader={this.renderSectionHeader}
                      renderSeparator={this.renderSeparator}
            />
        );
    }

    renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{
                    height: adjacentRowHighlighted ? 4 : 1,
                    backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
                }}
            />
        );
    }

    onPress2Stack(stack, rowData) {
        console.log('2 Stack pressed');
        console.log(rowData);
    }

    onPress3Stack(stack, rowData) {
        console.log('3 Stack pressed');
    }

    onPress4Stack(stack, rowData) {
        console.log('4 Stack pressed');
    }

    onPress(rowId, sectionId) {
        console.log('Tableview cell tapped: ' + rowId + ' section: ' + sectionId);
        if(rowId == 0 && sectionId === 'Tables') {
            this.gotoRoute('main');
        }
    }

    gotoRoute(name, rowId) {
        if (this.props.navigator && this.props.navigator.getCurrentRoutes()[this.props.navigator.getCurrentRoutes().length-1].name != name) {
            this.props.navigator.push({name: name});
        }
    }
}

const styles = StyleSheet.create({
    listview: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        marginTop: 65,
    },
    row: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },
    text: {
        flex: 1,
        fontSize: 17
    },
    buttonText: {
        flex: 1,
        fontSize: 17,
        color: 'white',
    },
    sectionHeader: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        height: 50,
    },
    sectionHeaderText: {
        color: '#DA552F',
        fontWeight: 'bold',
        alignItems: 'center',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    standaloneRowFront: {
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 10,
    },
    standaloneRowBack: {
        alignItems: 'stretch',
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 1
    },
    swipeButtonPrimary: {
        backgroundColor:'blue',
        alignItems: 'stretch',
        justifyContent: 'center',
        width: 70,
        borderWidth: 1,
        padding: 15,
        paddingLeft: 28,
        borderColor: 'black',
    },
    swipeButtonSecondary: {
        backgroundColor:'green',
        alignItems: 'stretch',
        justifyContent: 'center',
        width: 70,
        borderWidth: 1,
        padding: 15,
        paddingLeft: 28,
        borderColor: 'black',
    },
    swipeButtonTertiary: {
        backgroundColor:'gray',
        alignItems: 'stretch',
        justifyContent: 'center',
        width: 70,
        borderWidth: 1,
        padding: 15,
        paddingLeft: 28,
        borderColor: 'black',
    },
    swipeRightView: {
        flexDirection: 'row',
        alignItems:'stretch',
        marginRight:1,
        backgroundColor: 'gray',
    }
});

AppRegistry.registerComponent('mathChoices', () => MathChoices);
module.exports = MathChoices;