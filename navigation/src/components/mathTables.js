/**
 * Created by krishnansriramrama on 10/18/16.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    ListView,
    TouchableOpacity,
    Text,
    View,
} from 'react-native';

export class Main extends Component {
    constructor() {
        super();

        this.renderRow = this.renderRow.bind(this);
    }

    componentWillMount() {
        console.log('Props table: ' + this.props.table);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.genRows(this.props.table)),
        }
    }

    genRows(index) {
        var tables = [];
        for(var i = 1;i < 11;i++) {
            var result = index * i;
            tables.push(index.toString() + ' X ' + i.toString() + ' = ' + result);
        }

        return tables;
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={ () => { this.onPress(rowID); }}>
                <View style={styles.row}>
                    <Text style={styles.text}>
                        { rowData }
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <ListView style = { styles.listview }
                      dataSource={this.state.dataSource}
                      renderRow={this.renderRow}
                      renderSeparator={this.renderSeparator}
            />
        );
    }

    onPress(rowId) {
        console.log('Tableview cell tapped: ' + rowId + 'section: ' + sectionId);
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },
    thumb: {
        width: 64,
        height: 64,
    },
    text: {
        flex: 1,
    },
});

AppRegistry.registerComponent('main', () => Main);
module.exports = Main;