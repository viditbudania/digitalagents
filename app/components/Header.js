import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Animated,
    Alert,
    Platform,
    TextInput
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
let height = Dimensions.get('window').height
import { isIphoneX, } from 'react-native-iphone-x-helper'
const iOSTopBarHeight = 52;
const isIOS = Platform.OS === 'ios'
const isiPad = isIOS && Platform.isPad;

const iOSSafePadding = isIphoneX() == true ? 44 : 18

const BarStyle = {
    alignItems: 'center',
    height: moderateScale(isIOS ? (iOSTopBarHeight + iOSSafePadding) : (72 - 20), 0.2),
    paddingTop: isIOS ? iOSSafePadding : moderateScale(20)
}

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.a = React.createRef();
        this.state = {
            search: false,
            _autofocus: false,
            searchText: ''
        }
    }

    _onFocus = () => {

        this.setState({ _autofocus: true });
    }

    clickOnSearch = (data) => {
        if (data == 1) {
            this.setState({ searchText: "", search: !this.state.search })
            this.props.rightIcon1Function("")
        }
        else {
            this.setState({ searchText: "", search: !this.state.search })

        }
    }

    searchResult = () => {
        this.setState({ _autofocus: false });
        // this.props.rightIcon1Function(this.state.searchText)
    }

    searchUOM = (searchedText1) => {

        if (searchedText1 === ' ' || searchedText1 === '  ' || searchedText1 === '   ') {

            this.setState({ searchText: '' })

            searchedText1 = ''

        }
        else {

            this.setState({ searchText: searchedText1 })

            this.props.rightIcon1Function(searchedText1)
        }
       
    };

    render() {
        return (
            <View style={{ backgroundColor: '#4077EB', flexDirection: 'row', height: moderateScale(isIOS ? (iOSTopBarHeight + iOSSafePadding) : (72 - 30), 0.2), paddingTop: isIOS ? iOSSafePadding : moderateScale(0), alignItems: 'center', }} >
                <TouchableOpacity
                    onPress={() => this.props.leftIconFunction ? this.props.leftIconFunction() : undefined}
                    hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }}
                    style={{ paddingLeft: moderateScale(15), paddingTop: 1 }}
                >
                    <Image style={{ height: moderateScale(25), width: moderateScale(25) }} source={require('../Images/menuHmbrgr1.png')} />

                </TouchableOpacity>

                {this.state.search ?
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            onSubmitEditing={
                                this.searchResult
                            }
                            ref={this.a}
                            style={{
                                backgroundColor: 'transparent',
                                color: '#FFFFFF',
                                fontFamily: 'NotoSans-Regular',
                                fontSize: moderateScale(14, 0.2),
                                borderBottomColor: 'white',
                                marginRight: moderateScale(15),
                                paddingLeft: moderateScale(12),
                                flex: 1,
                                alignSelf: 'center'
                            }}
                            placeholderTextColor="#FFFFFF60"
                            onChangeText={(text) => this.searchUOM(text)}
                            selectionColor='white'
                            underlineColorAndroid={'white'}
                            autoFocus={this.state._autofocus}
                            onFocus={() => this._onFocus()}
                            autoCorrect={false}
                            placeholder="Search"
                            blurOnSubmit={false}
                            value={this.state.searchText} />

                        <TouchableOpacity
                            onPress={() => {
                                this.clickOnSearch(1)
                            }}
                            style={{ paddingRight: moderateScale(48), alignItems: 'center', justifyContent: 'center' }} hitSlop={{ top: 10, left: 30, right: 20, bottom: 20 }}
                        >
                            <Image style={{
                                height: moderateScale(25),
                                width: moderateScale(25)
                            }} source={require('../Images/close11.png')} />
                        </TouchableOpacity>

                    </View>
                    :
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            paddingRight: moderateScale(16),
                            paddingLeft: moderateScale(10),
                            flexDirection: 'row',
                            flex: 1
                        }}>
                            <Text ellipsizeMode={'tail'} numberOfLines={1} style={{
                                color: "#FFFFFF",
                                fontSize: moderateScale(18, 0.2),
                            }}> {this.props.title ? this.props.title : "Title"}</Text>
                        </View>
                        <TouchableOpacity
                            style={{ paddingRight: moderateScale(15) }}
                            hitSlop={{ top: 15, left: 10, right: 15, bottom: 15 }}
                            onPress={() => this.clickOnSearch(0)
                            }
                        >
                            <Image style={{ height: moderateScale(25), width: moderateScale(25) }} source={require('../Images/search1.png')} />

                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ paddingRight: moderateScale(55) }}
                            hitSlop={{ top: 15, left: 10, right: 15, bottom: 15 }}
                            onPress={() => this.props.rightIcon2Function()
                            }
                        >
                           <Image style={{ height: moderateScale(25), width: moderateScale(25) }} source={require('../Images/circlePlus.png')} />

                        </TouchableOpacity>
                    </View>
                }
            </View>



        )
    }
}
