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
import News from './tabs/news/index';
import Toutiaozhengwen from './tabs/news/toutiaozhengwen';
// import SmartMap from './tabs/smartmap';
import MqttTest from './tabs/tools/MqttTest';
import ScanQR from './tabs/tools/scanQR';
import Weather from './tabs/tools/weather';
import Todolist from './tabs/tools/todolist';
import Todo from './tabs/tools/todo';
import BaiduMap from './tabs/tools/map';
import Tool from './tabs/Tool';
import Image from './tabs/images';
import ShowImage from './tabs/showImage';
// import Count from './tabs/count';
// import SmartLocation from './tabs/smartMapLocation';
// import Location from './tabs/location';
// import EleLocation from './tabs/eleLocation';
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
                        <Scene key="tab1"  title="知乎" icon={TabIcon} tabIcon="home" navigationBarStyle={{backgroundColor: '#ffdb42'}}>
                            <Scene key='article'  component={Home} title='你知道吗?' />
                            <Scene key="content" component={Content} title="内容页" backTitle="后退" hideTabBar/>
                        </Scene>
                        <Scene key="tab2"  title="新闻" icon={TabIcon} tabIcon="circle-o" navigationBarStyle={{backgroundColor: '#ffdb42'}}>
                            <Scene key="ooxx" component={News} title="新闻" />
                            <Scene key="toutiaozhengwen" component={Toutiaozhengwen} title="新闻内容"  backTitle="后退" hideTabBar/>
                        </Scene>
                        <Scene key="tab5" initial title="摄影" icon={TabIcon} tabIcon="photo" navigationBarStyle={{backgroundColor: '#ffdb42'}}>
                            <Scene key='image' title='画廊' component={Image} backTitle="后退"   />
                            <Scene key='showbigimage' title='画廊' component={ShowImage} backTitle="后退"  hideTabBar/>

                        </Scene>
                        <Scene key="tab3"  title="工具" icon={TabIcon} tabIcon="book" navigationBarStyle={{backgroundColor: '#ffdb42'}}>
                            <Scene key='tool' title='工具' component={Tool} />
                            <Scene key='mqtt' title='Mqtt test' component={MqttTest} backTitle="后退"  hideTabBar/>
                            <Scene key='scanQR' title='扫描二维码' component={ScanQR} backTitle="后退"  hideTabBar/>
                            <Scene key='weather' title='天气' component={Weather} backTitle="后退"  hideTabBar/>
                            <Scene key='todolist' title='记事本'  onRight={()=>Actions.todo({})} rightTitle="添加"
                                   component={Todolist} backTitle="后退"  hideTabBar
                                   duration={0}/>
                            <Scene key='todo'  component={Todo}
                                   duration={0}
                                   hideNavBar  hideTabBar/>
                            <Scene key='map' title='我在哪?' component={BaiduMap} backTitle="后退"   />

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