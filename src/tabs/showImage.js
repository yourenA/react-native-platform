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
    DeviceEventEmitter
} from 'react-native';
import Swiper from 'react-native-swiper'
import PhotoView from 'react-native-photo-view'
import NavBar from './../components/NavBar'

import {Actions} from 'react-native-router-flux'
const renderPagination = (index, total, context) => {
    return (
        <View style={{
            position: 'absolute',
            bottom: 80,
            right: 10
        }}>
            <Text style={{ color: 'grey' }}>
                <Text style={{
                    color: 'white',
                    fontSize: 20
                }}>{index + 1}</Text>/{total}
            </Text>
        </View>
    )
}
export default class Content extends Component {
    constructor() {
        super()
        this.state = {}
    }

    componentDidMount = ()=> {

    }
    componentWillUnmount = ()=> {
    }

    render() {
        console.log("this.props", this.props)
        return (
            <View style={styles.container}>
                <NavBar showLeftBtn={true} leftBtnPress={()=>Actions.pop()} navbar_text='画廊' left_text='后退' right_text='确认'/>
                <Swiper index={parseInt(this.props.rowID)} style={styles.wrapper}  renderPagination={renderPagination}>
                    {
                        this.props.images.map((item, i) => <View key={i} style={styles.slide}>
                            <PhotoView
                                source={{uri: item.url}}
                                minimumZoomScale={1}
                                maximumZoomScale={3}
                                style={styles.photo}>

                            </PhotoView>
                        </View>)
                    }
                </Swiper>
            </View>
        );
    }
}
const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slide: {
        flex: 1, alignItems: 'center', justifyContent: 'center',
    },

    photo: {
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#000',
        width: width,
        height: height,
        marginTop:-100
    },
    index: {
        height:30,
        position: 'absolute',
        bottom: 70,
    },
    index_text: {
        color: 'white',
        fontSize:18
    }
});




