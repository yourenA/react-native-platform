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
                <Swiper index={parseInt(this.props.rowID)} style={styles.wrapper} showsPagination={false}>
                    {
                        this.props.images.map((item, i) => <View key={i} style={styles.slide}>
                            <PhotoView
                                source={{uri: item.url}}
                                minimumZoomScale={1}
                                maximumZoomScale={3}
                                style={styles.photo}>

                            </PhotoView>
                            <View style={styles.index}>
                                <Text
                                    style={styles.index_text}>{`${i+1}/${ this.props.images.length}`}</Text>
                            </View>
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
        flex: 1,
    },
    index: {
        height:30,
        position: 'absolute',
        bottom: 20,
    },
    index_text: {
        color: 'white',
        fontSize:18
    }
});




