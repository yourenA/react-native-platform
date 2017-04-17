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
    ScrollView,
    ListView,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import {fetchToutiao} from './../../actions/news/toutiao';
import {connect} from 'react-redux';
import LoadingSpinner from '../../components/loadingSpinner'
import NewsItem from '../../components/newsItem'

class Toutiao extends Component {
    constructor() {
        super()
        this.state = {}
    }

    componentDidMount = ()=> {
        console.log("this.props",this.props);
        if(!this.props.toutiao[`loaded_${this.props.type}`]){
            console.log("获取数据")
            this.props.dispatch( fetchToutiao(this.props.type));
        }
    }
    loadMore=()=>{
        let newPage=this.props.toutiao[`page_${this.props.type}`]+1;
        this.props.dispatch( fetchToutiao(this.props.type,newPage));
    }
    render() {
        /**
         * data通过cloneWithRows拼接，不能直接使用data.length
         * */
        if (this.props.toutiao[`data_${this.props.type}`].rowIdentities.length == 0) return <LoadingSpinner animating={true}/>;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <ListView
                        dataSource={this.props.toutiao[`data_${this.props.type}`]}
                        renderRow={(rowData, sectionID, rowID) => <NewsItem data={rowData} type={this.props.type} key={rowID}/>}
                        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => {
                            return <View style={{borderWidth: .3, borderColor: '#ccc'}} key={rowID}></View>
                        }}
                    />
                    <TouchableOpacity onPress={this.loadMore}>
                        <View style={styles.loadmore}><Text>点击加载更多...</Text></View>
                    </TouchableOpacity>

                </ScrollView>

            </View>
        );
    }
}
let deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loadmore: {
        width: deviceWidth,
        height: 50,
        flex: 1, justifyContent: 'center', alignItems: 'center'
    }
})
const mapStateToProps = state => ({
    toutiao: state.toutiao
})
export default connect(mapStateToProps)(Toutiao);