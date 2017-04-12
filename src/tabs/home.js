/**
 * Created by Administrator on 2017/4/11.
 */
import React, {Component} from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Image,
    ListView,
    Dimensions,
    TouchableNativeFeedback
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import SwipeableViews from 'react-swipeable-views-native'
import {autoPlay} from 'react-swipeable-views-utils'
const AutoPlaySwipeableViews = autoPlay(SwipeableViews)
import LoadingSpinner from '../components/loadingSpinner'
const ListItem = ({data}) => {
    return (
        <TouchableNativeFeedback
            background={   TouchableNativeFeedback.Ripple('#ffdb42',false)}
             onPress={() => Actions.content({articleID: data.id})}>
            <View style={styles.listItem}>
                <Text style={styles.itemTitle} numberOfLines={2}>
                    {data.title}
                </Text>
                <Image
                    style={styles.itemImage}
                    source={{uri: data.images[0]}}
                />
            </View>
        </TouchableNativeFeedback>
    )
}


export default class Home extends Component {
    constructor() {
        super()
        /**
         * ListView数据要使用DataSource定义
         *
        * */
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            topStories: [],
            stories: ds,
        }
    }
    componentDidMount=()=>{
        let url = 'http://news-at.zhihu.com/api/4/news/latest'
        fetch(url)
            .then((data) => {
                return data.json()
            })
            .then((res) => {
                /**
                 * ListView拼接数据要使用cloneWithRows
                 * */
                this.setState({
                    stories: this.state.stories.cloneWithRows(res.stories),
                })
                this._swiperViews(res.top_stories)
            })
    }
    _swiperViews=(topStories)=>{
        console.log("topStories",topStories)
        let views = []
        topStories.forEach((ele, index, arr) => {
            views.push(
                <TouchableWithoutFeedback onPress={() => Actions.content({articleID: ele.id})}>
                    <View style={[styles.slide]}>
                        <Image
                            style={{
                                flex: 1,
                                height: 200,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            source={{uri: ele.image}}
                            resizeMode='cover'
                        >
                            <Text style={styles.slideTitle}>
                                {ele.title}
                            </Text>
                        </Image>
                    </View>
                </TouchableWithoutFeedback>
            )
        })
        this.setState({
            topStories: views
        })
    }
    render() {
        if (this.state.topStories.length == 0) return <LoadingSpinner animating={true}/>
        return (
            <View style={styles.container}>
                <ScrollView>
                    <AutoPlaySwipeableViews
                        ref='swiper'
                        style={styles.slideContainer}
                        autoplay={true}
                        resistance={true}
                        springConfig={{tension: 100, friction: 30}}
                        interval={3000}
                        children={this.state.topStories.length == 0 ? <View></View> : this.state.topStories}
                    />
                    <ListView
                        dataSource={this.state.stories}
                        renderRow={(rowData, sectionID, rowID) => <ListItem data={rowData} key={rowID}/>}
                        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => {
                            return <View style={{borderWidth: .3, borderColor: '#ccc'}} key={rowID}></View>
                        }}
                    />
                </ScrollView>

            </View>

        );
    }
}
//Dimensions用于获取设备屏幕的宽高。
//var {height, width} = Dimensions.get('window');
let deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 60 : 54,
        paddingBottom: 50
    },
    slideContainer: {
        height: 200,
        flex: 0
    },
    slide: {
        height: 200,
        backgroundColor: 'transparent',
    },
    slideTitle: {
        color: '#fff',
        fontSize: 18,
        marginTop: 100,
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'center'
    },
    listItem: {
        flexDirection: 'row',
        width: deviceWidth,
        padding: 10,
        backgroundColor: 'transparent',
    },
    itemTitle: {
        flex: 1,
        lineHeight: 20,
        marginRight: 5
    },
    itemImage: {
        width: 60,
        height: 60
    },
})
