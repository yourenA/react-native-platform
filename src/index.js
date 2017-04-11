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
import { Scene, Router } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import SplashScreen from 'react-native-splash-screen'

import Home from './tabs/home';
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
        SplashScreen.hide()
    }
    _backAndroidHandler=()=>{
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
        return (
            <Router onExitApp={this._backAndroidHandler}>
                <Scene key="root" hideNavBar>
                    <Scene key="tabbar" tabs tabBarStyle={{backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#BBB'}}>
                        <Scene key="tab1" initial title="知乎" icon={TabIcon} tabIcon="home" navigationBarStyle={{backgroundColor: '#ffdb42'}}>
                            <Scene key='article'  component={Home} title='你知道吗?' />
                        </Scene>
                        <Scene key="tab2"  title="图片" icon={TabIcon} tabIcon="circle-o" navigationBarStyle={{backgroundColor: '#ffdb42'}}>
                            <Scene key="ooxx" component={Home} title="藏图阁" />
                        </Scene>
                        <Scene key="tab3" title="歌单" icon={TabIcon} tabIcon="music" navigationBarStyle={{backgroundColor: '#ffdb42'}}>
                            <Scene key='music' title='热歌榜' component={Home} />
                        </Scene>
                        <Scene key="tab4" title="地图" icon={TabIcon} tabIcon="map-marker" navigationBarStyle={{backgroundColor: '#ffdb42'}}>
                            <Scene key='map' title='我在哪?' component={Home} />
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