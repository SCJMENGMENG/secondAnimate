/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Animated,
    LayoutAnimation,
    FlatList,
    PanResponder,
    Dimensions,
    TouchableOpacity,
    SectionList,
} from 'react-native';
import ScrollableTabView from "react-native-scrollable-tab-view"

const {width, height} = Dimensions.get('window');

export default class App extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {}
    };

    render() {

        return (
            <View style={styles.container}>
                <ScrollableTabView
                    style={{top: 20}}
                    tabBarBackgroundColor="#63B8FF"
                    tabBarActiveTextColor="#FFF"
                    tabBarInactiveTextColor="#F5FFFA"
                    tabBarUnderlineStyle={{backgroundColor: "#E7E7E7", height: 2}}>
                    {this._viewFlatListModule('第一页')}
                    {this._sectionList('第二页')}
                    {this._viewFlatListModule('第三页')}
                    {this._viewFlatListModule('第四页')}
                </ScrollableTabView>

            </View>
        );
    }

    _viewFlatListModule(title) {

        var data = [];
        for (var i = 0; i < 100; i++) {
            data.push({key: i, title: i + ''});
        }
        return (
            <FlatList
                tabLabel={title}
                ref={(flatList) => this._flatList = flatList}
                ListHeaderComponent={this._header}
                ListFooterComponent={this._footer}
                ItemSeparatorComponent={this._separator}
                renderItem={this._renderItem}
                onRefresh={this.refreshing}
                refreshing={false}
                onEndReachedThreshold={0}
                onEndReached={
                    this._onload
                }
                numColumns={3}
                columnWrapperStyle={{borderWidth: 2, borderColor: 'black', paddingLeft: 20}}

                //horizontal={true}

                getItemLayout={(data, index) => (
                    {length: 100, offset: (100 + 2) * index, index}
                )}

                data={data}>
            </FlatList>
        )
    }

    _renderItem = (item) => {
        var txt = '第' + item.index + '个' + ' title=' + item.item.title;
        var bgColor = item.index % 2 == 0 ? 'red' : 'blue';
        return <Text
            style={[{flex: 1, height: 100, backgroundColor: bgColor}, styles.txt]}
            onPress={() => alert(111)}
        >{txt}</Text>
    }

    _header = () => {
        return <Text style={[styles.txt, {backgroundColor: 'black'}]}>这是头部</Text>;
    }

    _footer = () => {
        return <Text style={[styles.txt, {backgroundColor: 'black'}]}>这是尾部</Text>;
    }

    _separator = () => {
        return <View style={{height: 2, backgroundColor: 'yellow'}}/>;
    }

    //--------------------

    _sectionList(title) {

        var sections = [
            {key: "A", data: [{title: "阿童木"}, {title: "阿玛尼"}, {title: "爱多多"}]},
            {key: "B", data: [{title: "表哥"}, {title: "贝贝"}, {title: "表弟"}, {title: "表姐"}, {title: "表叔"}]},
            {key: "C", data: [{title: "成吉思汗"}, {title: "超市快递"}]},
            {
                key: "W",
                data: [{title: "王磊"}, {title: "王者荣耀"}, {title: "往事不能回味"}, {title: "王小磊"}, {title: "王中磊"}, {title: "王大磊"}]
            },
        ];
        return (
            <SectionList
                tabLabel={title}
                renderSectionHeader={this._sectionComp}
                renderItem={this._renderItem1}
                sections={sections}
                ItemSeparatorComponent={() => <View><Text>111</Text></View>}
                ListHeaderComponent={() => <View style={{backgroundColor: '#25B960', alignItems: 'center', height: 30}}><Text
                    style={{fontSize: 18, color: '#ffffff'}}>通讯录</Text></View>}
                ListFooterComponent={() => <View style={{backgroundColor: '#25B960', alignItems: 'center', height: 30}}><Text
                    style={{fontSize: 18, color: '#ffffff'}}>通讯录尾部</Text></View>}
            />
        )
    }

    _renderItem1 = (info) => {
        var txt = '  ' + info.item.title;
        let item = [
            {text: '0', key: 0},
            {text: '1', key: 1},
            {text: '2', key: 2},
            {text: '3', key: 3},
        ]
        return (
            <View style={{
                flexDirection: 'row',
                // flexWrap: 'wrap',
                // alignItems: 'flex-start',
                backgroundColor: 'yellow'
            }}
            >
                {
                    item.map((item, i) => this.renderExpenseItem(item, i))
                }
            </View>
        )
    }

    renderExpenseItem(item, i) {

        return <TouchableOpacity key={i} onPress={() => alert(444)} underlayColor="transparent">
            <View style={{
                backgroundColor: '#FFFFFF',
                justifyContent: 'center',
                width: (width - 1) / 4,
                height: (width - 1) / 4,
                alignItems: 'center'
            }}
            >
                <Text>{item.text}</Text>
            </View>
        </TouchableOpacity>;
    }

    _sectionComp = (info) => {
        var txt = info.section.key;
        return <Text
            style={{
                height: 50,
                textAlign: 'center',
                textAlignVertical: 'center',
                backgroundColor: '#9CEBBC',
                color: 'white',
                fontSize: 30
            }}
            onPress={() => alert(333)}
        >{txt}</Text>

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    txt: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 30,
        marginRight: 20,
    },

});
