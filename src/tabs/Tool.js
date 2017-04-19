/**
 * @author lovebing
 */

import React, {
    Component,
    PropTypes
} from 'react';

import {
    Button,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback,
    Dimensions,
    Platform,
    ScrollView
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import ToolItem from './../components/toolItem'
export default class Tool extends Component {

    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
    }


    render() {
        return (
            <View style={styles.container}>
                <ScrollView ref={(scrollView) => {
                    this._scrollView = scrollView;
                }}>
                    <ToolItem onPress={() => Actions.mqtt({})} itemText='Mqtt test' leftIcon="settings-box"/>
                    <ToolItem onPress={() => Actions.scanQR({})} itemText='扫描二维码' leftIcon="barcode-scan"/>
                    <ToolItem onPress={() => Actions.weather({})} itemText='天气' leftIcon="weather-cloudy"/>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 60 : 54,
        paddingBottom: 50
    },
});
