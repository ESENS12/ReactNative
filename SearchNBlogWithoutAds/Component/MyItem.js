import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Dots from 'react-native-dots-pagination';
import React,{Component} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default class MyItem extends Component {

    constructor(props){
        super();

        this.state = {
           currentItemIndex : 0
        };

        this.props = props;

    }

    _handleScroll = (event) => {

        // console.log(parseInt(event.nativeEvent.contentOffset.x/this.props.state.screenWidth));
        const currentIndex = parseInt(event.nativeEvent.contentOffset.x/this.props.state.screenWidth);
        this.setState({currentItemIndex : currentIndex })

    };

    render() {

        if (this.props.isFake) {
            return null
        }

        return (

            <View style={[styles.listItemParent, {width:this.props.state.screenWidth-20}]}>
                {/*<Text style={styles.listItemText}> {props.index} </Text>*/}
                <TouchableOpacity  onPress ={this.props.onPress} >
                    <Text style={styles.listItemText}> {this.props.title} </Text>
                    <Text style={styles.listItemDate}> {this.props.date} </Text>
                </TouchableOpacity>

                <ScrollView
                    showsHorizontalScrollIndicator = {false}
                    horizontal={true}
                    decelerationRate={"fast"}
                    snapToInterval={100}
                    scrollEventThrottle={10}
                    onScroll={(event)=> { this._handleScroll(event)}}
                    snapToAlignment={"center"}
                    {...this.props._panResponder.panHandlers}
                    onScrollEndDrag={() => this.props.fScroll.setNativeProps({ scrollEnabled: true })} >
                    { this.props.imgList.map((item,index) =>

                        <Image overflow={'hidden'} borderWidth={1} borderRadius={15} key={index} style={{width: this.props.state.screenWidth-45, height: 220, margin:5,}} source={{uri:item}} />

                    ) }
                </ScrollView>
                <View style={{ flexDirection: 'row' , width : this.props.state.screenWidth/2, alignItems:'center', alignSelf:'center', flex:1}} >
                    <Dots style ={{flex:1}} length={this.props.imgList.length} width={this.props.state.screenWidth/2} active={this.state.currentItemIndex} />
                </View>
                {/*<View style={styles.bottomLine}/>*/}
                {/*<Text>{props.lead}</Text>*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({

    /**
     *
     * listitem layout
     *
     * **/

    bottomLine:{

        alignSelf:'stretch',
        marginTop:20,
        marginRight:20,
        marginLeft:20,
        borderStyle:'dashed',
        borderBottomColor: 'blue',
        borderBottomWidth: 1,
        height:1,

    },

    listItemParent:{
        padding:5,
        shadowColor: '#000',
        overflow:'hidden',
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        flex:1,

        borderRadius:15,
        borderWidth: 1,
        // padding:10,
        margin:10,
        alignSelf:'center',
        borderColor: 'transparent',
        backgroundColor: '#fff',
    },

    listItemText:{
        flex:1,
        fontSize : 20,
        textAlign :'center',
        color : Colors.black,
        marginBottom:5,
    },

    listItemDate:{
        flex:1,
        fontSize : 15,
        alignSelf:'flex-end',
        color : Colors.black,
        marginBottom:5,
    },

});
