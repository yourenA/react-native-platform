/**
 * Created by Administrator on 2017/4/11.
 */
import React, { Component } from 'react'
import {
    Text,
    View,
    WebView,
    StyleSheet,
    Platform
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import NavBar from './../../components/NavBar'

export default class Content extends Component {
    constructor() {
        super()
        this.state = {
        }
    }
    componentDidMount=()=> {
    }
    render() {
        return (
            <View style={styles.container}>
                <NavBar showLeftBtn={true}  leftBtnPress={()=>Actions.pop()} navbar_text='微信精选文章' left_text='后退' right_text=''/>
                <WebView
                    style={{flex:1}}
                    source={{uri: this.props.wxUrl}}
                    javaScriptEnabled={true}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
})