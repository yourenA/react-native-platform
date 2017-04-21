/**
 * Created by Administrator on 2017/4/11.
 */
import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    Platform,
    ListView,
    TouchableWithoutFeedback,
    Image,
    RefreshControl
} from 'react-native'
import imageData from './../util/image.json';
import {Actions} from 'react-native-router-flux'

export default class Pic extends Component {
    constructor() {
        super()
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            imageDS: ds.cloneWithRows(imageData),
            images: imageData,
            showIndex: 0,
        }
    }

    componentDidMount() {
    }

    onPressImage = (rowID)=> {
        Actions.showbigimage({showIndex:this.state.showIndex,images:this.state.images,rowID:rowID})
    }

    render() {
        console.log("images", this.state.images)
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.imageDS}
                    renderRow={(rowData, sectionID, rowID) =>
                        <TouchableWithoutFeedback onPress={this.onPressImage.bind(this,rowID)}>
                            <View style={{
                                padding: 10,
                                marginTop: 10,
                                marginLeft: 10,
                                marginRight: 10,
                                borderRadius: 5,
                                backgroundColor: '#FFF'
                            }}>
                                <Image
                                    style={{
                                        flex: 1,
                                        height: 200,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    resizeMethod='scale'
                                    source={{uri: rowData.url}}
                                >
                                </Image>

                            </View>
                        </TouchableWithoutFeedback>
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 60 : 54,
        paddingBottom: 50,
        backgroundColor: '#EEE'
    },
})
//
// const renderPagination = (index, total, context) => {
//     return (
//         <View style={{
//             position: 'absolute',
//             justifyContent: 'center',
//             alignItems: 'center',
//             top: 25,
//             left: 0,
//             right: 0
//         }}>
//             <View style={{
//                 borderRadius: 7,
//                 backgroundColor: 'rgba(255,255,255,.15)',
//                 padding: 3,
//                 paddingHorizontal: 7
//             }}>
//                 <Text style={{
//                     color: '#fff',
//                     fontSize: 14
//                 }}>{index + 1} / {total}</Text>
//             </View>
//         </View>
//     )
// }
//
// const Viewer = props => <Swiper index={props.index} style={styles.wrapper} >
//     {
//         props.imgList.map((item, i) => <View key={i} style={styles.slide}>
//             <TouchableWithoutFeedback onPress={e => props.pressHandle()}>
//                 <PhotoView
//                     source={{uri: item}}
//                     resizeMode='contain'
//                     minimumZoomScale={0.5}
//                     maximumZoomScale={3}
//                     androidScaleType='center'
//                     style={styles.photo} />
//             </TouchableWithoutFeedback>
//         </View>)
//     }
// </Swiper>
//
// export default class extends Component {
//     constructor (props) {
//         super(props)
//         this.state = {
//             imgList: [
//                 'http://image18-c.poco.cn/mypoco/myphoto/20170421/11/183801878201704211111232037995417510_014.jpg?576x1024_120',
//                 'http://image18-c.poco.cn/mypoco/myphoto/20170421/11/183801878201704211111232037995417510_017.jpg?811x1441_120',
//                 'http://image18-c.poco.cn/mypoco/myphoto/20170421/11/183801878201704211111232037995417510_016.jpg?1280x854_120'
//             ],
//             showViewer: true,
//             showIndex: 0
//         }
//         this.viewerPressHandle = this.viewerPressHandle.bind(this)
//         this.thumbPressHandle = this.thumbPressHandle.bind(this)
//     }
//     viewerPressHandle () {
//         this.setState({
//             showViewer: false
//         })
//     }
//     thumbPressHandle (i) {
//         this.setState({
//             showIndex: i,
//             showViewer: true
//         })
//     }
//     render () {
//         return (<View style={{position: 'relative'}}>
//             {this.state.showViewer && <Viewer
//                 index={this.state.showIndex}
//                 pressHandle={this.viewerPressHandle}
//                 imgList={this.state.imgList} />}
//             <View style={styles.thumbWrap}>
//                 {
//                     this.state.imgList.map((item, i) => <TouchableOpacity key={i} onPress={e => this.thumbPressHandle(i)}>
//                         <Image style={styles.thumb} source={{uri: item}} />
//                     </TouchableOpacity>)
//                 }
//             </View>
//         </View>)
//     }
// }