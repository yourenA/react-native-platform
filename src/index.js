/**
 * Created by Administrator on 2017/4/11.
 */
import React, { Component } from 'react'
import {
    Text,
    View,
    ToastAndroid,
    Platform,
    StyleSheet
} from 'react-native'
import { Scene, Router,Actions } from 'react-native-router-flux'//路由
import Icon from 'react-native-vector-icons/FontAwesome'//ICON
import SplashScreen from 'react-native-splash-screen'//启动屏

import Home from './tabs/home';
import Content from './tabs/content';
import Pic from './tabs/pic';
import Map from './tabs/map';
class TabIcon extends React.Component {
    render() {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Icon name={this.props.tabIcon} size={20} color={this.props.selected ? "#FFDB42" : '#BBB'} />
                <Text style={{color: this.props.selected ? '#FFDB42' : '#BBB', marginTop: 5, fontSize:12}}>{this.props.title}</Text>
            </View>

        )
    }
}
export default class Index extends Component {

    componentDidMount=()=> {
        /**
         * 挂载完成后隐藏启动屏
         * */
        SplashScreen.hide()
    }
    _backAndroidHandler=()=>{
        //通过Platform.OS 获取平台操作系统
        if (Platform.OS === 'android') {
            /**
             * this.lastBackPressed + 2000 >= Date.now() 两次连按时间间隔大于2000不退出
             * */
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                return false
            }
            this.lastBackPressed = Date.now()
            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT)
            /**
             * onExitApp返回true为退出
             * */
            return true
        }else {
            return true
        }
    }
    render() {
        /**
         * 在android顶部高度为54，底部50;在ios顶部高度为60，底部50
         * 所以内容也外层样式要这样设置
         * flex: 1,
         * paddingTop: Platform.OS === 'ios' ? 60 : 54,
         * paddingBottom: 50
         *
         * Scene下面如果又多个组件，则第一个组件是显示的主页
         * 在主页可以通过Actions.keyName({articleID: '123456'})}跳转到子页面，子页面默认带返回按钮
         * hideNavBar显示与隐藏顶部
         * hideTabBar显示与隐藏底部
         * type="replace" 左按钮会覆盖back按钮
         * */
        return (
            <Router onExitApp={this._backAndroidHandler}>
                <Scene key="root" hideNavBar>
                    <Scene key="tabbar" tabs tabBarStyle={{backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#BBB'}}>
                        <Scene key="tab1" initial title="知乎" icon={TabIcon} tabIcon="home" navigationBarStyle={{backgroundColor: '#ffdb42'}}>
                            <Scene key='article'  component={Home} title='你知道吗?' />
                            <Scene key="content" component={Content} title="内容页" backTitle="后退" hideTabBar/>
                        </Scene>
                        <Scene key="tab2"  title="图片" icon={TabIcon} tabIcon="circle-o" navigationBarStyle={{backgroundColor: '#ffdb42'}}>
                            <Scene key="ooxx" component={Pic} title="藏图阁" />
                        </Scene>
                        <Scene key="tab3" title="歌单" icon={TabIcon} tabIcon="music" navigationBarStyle={{backgroundColor: '#ffdb42'}}>
                            <Scene key='music' title='热歌榜' component={Home} />
                        </Scene>
                        <Scene key="tab4" title="地图" icon={TabIcon} tabIcon="map-marker" navigationBarStyle={{backgroundColor: '#ffdb42'}}>
                            <Scene key='map' title='我在哪?' component={Map} />
                        </Scene>
                    </Scene>
                </Scene>
            </Router>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});