import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    Platform,
    ListView,
    TouchableWithoutFeedback,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import MateIcon from 'react-native-vector-icons/Entypo'

export default class RightBottomBtn extends Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (
            <View style={styles.navbar}>
                <TouchableOpacity  onPress={this.props.leftBtnPress}>
                <View style={styles.leftIcon}>
                    <MateIcon name='chevron-thin-left' size={20} color='#000'/>
                    <Text style={styles.left_text}>
                        {this.props.left_text}
                    </Text>
                </View>
                </TouchableOpacity>
                <Text style={styles.navbar_text}
                      numberOfLines={1}>
                    {this.props.navbar_text}
                </Text>
                <TouchableOpacity  onPress={this.props.rightBtnPress}>

                <View style={styles.rightIcon}>
                    <Text style={styles.right_text}>
                        {this.props.right_text}
                    </Text>
                </View>
                </TouchableOpacity>

            </View>
        );
    }
}

let deviceWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    navbar:{
        width:deviceWidth,
        height: Platform.OS === 'ios' ? 60 : 54,
        backgroundColor:'#ffdb42',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        padding:5,
        borderBottomWidth:1,
        borderColor:'#999'
    },
    navbar_text: {
        fontSize: 18,
        width:deviceWidth-200,
        textAlign:'center',
        fontWeight:'bold',
        color:'#000'
    },
    leftIcon:{
        flexDirection: 'row',
        alignItems:'center',
    },
    rightIcon:{

    },
    left_text: {
        width:50,
        fontSize:18
    },
    right_text: {
        width:50,
        fontSize:18
    }
});