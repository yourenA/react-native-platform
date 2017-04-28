/**
 * Created by Administrator on 2017/4/11.
 */
import React, {Component} from 'react'
import {
    Text,
    View,
    WebView,
    StyleSheet,
    Platform,
    TouchableWithoutFeedback,
    Modal,
    ToastAndroid,
    TouchableOpacity,
    Image,
    Dimensions,
    Animated
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import NavBar from './../../components/NavBar'
import * as WeChat from 'react-native-wechat';
const shareIconWechat = require('../../img/share_icon_wechat.png');
const shareIconMoments = require('../../img/share_icon_moments.png');
const shareIconQQ = require('../../img/share_icon_qq.png');
const shareIconQQMoment = require('../../img/share_icom_qqmoment.png');

export default class Content extends Component {
    constructor() {
        super()
        this.state = {
            isShareModal: false,
            shareBottom: new Animated.Value(130),
        }
    }

    componentDidMount = ()=> {
    }

    renderSpinner() {
        return (
            <TouchableWithoutFeedback
                onPress={this.hideShare}
            >
                <View key={'spinner'} style={styles.spinner}>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            transform: [
                                {translateY: this.state.shareBottom},
                            ]
                        }}>

                        <View style={styles.spinnerContent}>
                            <Text
                                style={[styles.spinnerTitle, {fontSize: 20, color: 'black'}]}
                            >
                                分享到
                            </Text>
                            <View style={styles.shareParent}>
                                <TouchableOpacity
                                    style={styles.base}
                                    onPress={() => {
                                        WeChat.isWXAppInstalled().then((isInstalled) => {
                                            console.log("isInstalled", isInstalled)
                                            if (isInstalled) {
                                                WeChat.shareToSession({
                                                    //分享到微信聊天显示title，description
                                                    title:'分享自：友人A',
                                                    description:this.props.wxTitle ,
                                                    thumbImage: this.props.thumbImage,
                                                    type: 'news',
                                                    webpageUrl: this.props.wxUrl
                                                }).then((result)=>{
                                                    console.log('share text message to time line successful:', result);
                                                }).catch((error) => {
                                                    console.log("error",error)
                                                });
                                            } else {
                                                ToastAndroid.show('没有安装微信软件，请您安装微信之后再试', ToastAndroid.SHORT);
                                            }
                                        });
                                    }}
                                >
                                    <View style={styles.shareContent}>
                                        <Image style={styles.shareIcon} source={shareIconWechat}/>
                                        <Text style={styles.spinnerTitle}>
                                            微信
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.base}
                                    onPress={() => {
                                        WeChat.isWXAppInstalled().then((isInstalled) => {
                                            if (isInstalled) {
                                                WeChat.shareToTimeline({
                                                    //分享到微信朋友圈显示title，不显示description
                                                    title:this.props.wxTitle,
                                                    thumbImage: this.props.thumbImage,
                                                    type: 'news',
                                                    webpageUrl: this.props.wxUrl
                                                }).then((result)=>{
                                                    console.log('share text message to time line successful:', result);
                                                    if(result.errCode===0){
                                                        ToastAndroid.show('分享成功', ToastAndroid.SHORT);

                                                    }
                                                }).catch((error) => {
                                                    console.log("error",error)
                                                });
                                            } else {
                                                ToastAndroid.show('没有安装微信软件，请您安装微信之后再试', ToastAndroid.SHORT);
                                            }
                                        });
                                    }}
                                >
                                    <View style={styles.shareContent}>
                                        <Image style={styles.shareIcon} source={shareIconMoments}/>
                                        <Text style={styles.spinnerTitle}>
                                            朋友圈
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.base}
                                    onPress={() => {
                                        ToastAndroid.show('暂不支持QQ', ToastAndroid.SHORT);
                                    }}
                                >
                                    <View style={styles.shareContent}>
                                        <Image style={styles.shareIcon} source={shareIconQQ}/>
                                        <Text style={styles.spinnerTitle}>
                                            QQ好友
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.base}
                                    onPress={() => {
                                        ToastAndroid.show('暂不支持QQ', ToastAndroid.SHORT);
                                    }}
                                >
                                    <View style={styles.shareContent}>
                                        <Image style={styles.shareIcon} source={shareIconQQMoment}/>
                                        <Text style={styles.spinnerTitle}>
                                            QQ空间
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
    showShare=()=>{
        this.setState({isShareModal: true});
        let animated = Animated.sequence([
            Animated.timing(this.state.shareBottom, {
                toValue: 0,
                duration: 400,
            }),
        ])
        animated.start();
        console.log('显示')
    }
    hideShare=()=>{
        this.setState({isShareModal: false},function () {
            let animated = Animated.sequence([
                Animated.timing(this.state.shareBottom, {
                    toValue: 130,
                    duration: 400,
                }),
            ])
            animated.start()
            console.log('隐藏')
        });


    }
    render() {
        return (
            <View style={styles.container}>
                <NavBar showLeftBtn={true} showrightBtn={true} leftBtnPress={()=>Actions.pop()} rightBtnPress={this.showShare} navbar_text='微信精选文章' left_text='后退' right_text='分享'/>
                <WebView
                    style={{flex: 1}}
                    source={{uri: this.props.wxUrl}}
                    javaScriptEnabled={true}
                />
                {this.state.isShareModal?<View
                    style={{flex:1,position:'absolute',left:0,right:0,top:0,bottom:0}}
                >
                    {this.renderSpinner()}
                </View>:null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    spinner: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.65)'
    },
    spinnerContent: {
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        backgroundColor: '#fcfcfc',
        padding: 10,
        height: 130
    },
    spinnerTitle: {
        fontSize: 16,
        color: '#313131',
        textAlign: 'left',
    },
    shareParent: {
        flexDirection: 'row',
        marginTop: 10,
    },
    base: {
        marginRight: 15
    },
    shareContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    shareIcon: {
        width: 40,
        height: 40
    }
})