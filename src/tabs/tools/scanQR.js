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
    TouchableHighlight,
    Dimensions,
    Platform,
    AsyncStorage,
    TextInput,
    Linking
} from 'react-native';
import QRCodeScreen from './QRCodeScreen'
import {Actions} from 'react-native-router-flux'

export default class ScanQR extends Component {

    constructor() {
        super();

        this.state = {
            text: 'http://facebook.github.io/react-native/',
        };
    }

    componentDidMount() {
    }
    _onSucess=(result)=>{
        Linking.openURL(result).catch(err => console.error('An error occurred', err));
    }
    _onCancel=()=>{
        Actions.tool();
    }
    render() {
        return (
            <View style={styles.container}>
                <QRCodeScreen cancelButtonVisible={true} onCancel={this._onCancel} onSucess={this._onSucess} />
            </View>
        );
    }
}
let deviceWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 60 : 54,
        paddingBottom: 50
    },
    input: {
        height: 40,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    },
    QRCode:{
        justifyContent: 'center',
        alignItems: 'center',
    }
});
