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
    Alert
} from 'react-native';
import init from 'react_native_mqtt';

let client;
export default class MqttTest extends Component {

    constructor() {
        super();

        this.state = {};
    }

    componentDidMount() {
        init({
            size: 10000,
            storageBackend: AsyncStorage,
            defaultExpires: 1000 * 3600 * 24,
            enableCache: true,
            sync: {}
        });

        client = new Paho.MQTT.Client('mqtt.server.com', 8884, '1232344/123');
        client.onConnectionLost = this.onConnectionLost;
        client.onMessageArrived = this.onMessageArrived;
        client.connect({
            onSuccess: this.onConnect,
            timeout: 3,
            onFailure: this.onFailure
        });
    }

    onConnect = ()=> {
        console.log("onConnect");
        var message = new Paho.MQTT.Message("Hello");
        message.destinationName = "/World";
        client.send(message);
    }
    onFailure=(err)=>{
        Alert.alert('Connect failed!');
        console.log(err)
    }
    onConnectionLost = (responseObject)=> {
        console.log("onConnectionLost")
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
        }
    }
    onMessageArrived = (message)=> {
        console.log("onMessageArrived:" + message.payloadString);
    }

    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}
let deviceWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        height: 40
    },
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 60 : 54,
        paddingBottom: 50
    },
    map: {
        width: 200,
        height: 200,
        marginBottom: 16
    }
});
