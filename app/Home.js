import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {CustomCardView} from './components/CustomCardView';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from './actions';
import Modal from 'react-native-modal';
import Header from './components/Header';

class Home extends Component {
  constructor(props) {
    super(props);
    this.a = React.createRef();
    this.state = {
      lodading: true,
      inputTitle: '',
      inputDes: '',
      screenWidth: Dimensions.get('window').width,
      dataTotal: [],
      popup: false,
      dataToDisplay: [],
      searchData: [],
      _autofocus: false,
    };
    // this.update = false;
  }

  componentDidMount = () => {
    if (this.props.updatedData.length === 0) {
      this.props.firstDataSet([false, this.props.data]);
    }

    // this.setState({dataToDisplay: this.props.updatedData});
    setTimeout(() => {
      this.setState({dataToDisplay: this.props.updatedData, lodading: false});
    }, 3000);
  };


  renderFlatList = (item, index) => {
    // console.log(index, item);

    return (
      <View style={{paddingTop: moderateScale(5)}}>
        <CustomCardView
          view={
            <View style={{paddingHorizontal: moderateScale(20)}}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flex: 1,
                  flexDirection: 'row',
                  paddingVertical: moderateScale(10),
                }}>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      fontSize: moderateScale(14, 0.2),
                      color: '#000000',
                      textAlign: 'left',
                      fontWeight: 'bold',
                    }}>
                    {item.title}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flex: 1,
                  flexDirection: 'row',
                  paddingVertical: moderateScale(10),
                }}>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      fontSize: moderateScale(12, 0.2),
                      color: '#767676',
                      textAlign: 'left',
                    }}>
                    {item.des}
                  </Text>
                </View>

                <View />
              </View>

              <View />
            </View>
          }
        />
      </View>
    );
  };

  leftIconFunction = () => {
    alert('Nothing to Display');
  };

  rightIcon1Function = (text) => {
    if (text.length > 0) {
      var temp = [];
      this.props.updatedData.map((val, ind) => {
        if (val.title.search(text) != -1) {
          temp.push(val);
        }
      });

      this.setState({dataToDisplay: temp});
    } else {
    //   console.log('hiihi', text);
      this.setState({dataToDisplay: this.props.updatedData});
    }
  };

  rightIcon2Function = () => {
    this.setState({popup: !this.state.popup, inputDes: '', inputTitle: ''});
  };

  _onFocus = () => {
    this.setState({_autofocus: true});
  };

  searchUOM = (text, type) => {
    if (text === ' ' || text === '  ' || text === '   ') {
      if (type === 1) this.setState({inputTitle: ''});
      else this.setState({inputDes: ''});

      text = '';
    } else {
      if (type === 1) this.setState({inputTitle: text});
      else this.setState({inputDes: text});
    }
  };

  onSave = (title, des) => {
    this.rightIcon2Function();
    var temp = {
      title: title,
      des: des,
    };
    var arr = [...this.props.updatedData];
    arr.push(temp);
    this.props.addToDo(arr);
    this.setState({lodading: true});
    setTimeout(() => {
        this.setState({lodading : false, dataToDisplay : this.props.updatedData})
    }, 300);
  };

  render() {
    // console.log('hi', this.state);

    return (
      <View
        style={{
          backgroundColor: '#E5F1FB',
          flex: 1,
        }}>
        <StatusBar backgroundColor="#4077EB" barStyle="light-content" />
        <Header
          title="Digital Agents"
          leftIconFunction={this.leftIconFunction}
          rightIcon1Function={(text) => this.rightIcon1Function(text)}
          rightIcon2Function={() => this.rightIcon2Function()}
        />
        <View style={{flex: 1}}>
          {this.state.lodading ? (
            <ActivityIndicator
              color="#000000"
              style={{marginLeft: 8, marginVertical: moderateScale(300)}}
            />
          ) : (
            <FlatList
              data={this.state.dataToDisplay}
              extraData={this.state}
              contentContainerStyle={{
                marginHorizontal: moderateScale(5),
              }}
              initialNumToRender={4}
              windowSize={15}
              removeClippedSubviews={true}
              key={
                this.state.screenWidth > 800 ? 'LandScapeView' : 'PotraitView'
              }
              keyExtractor={(Item, i) => i.toString()}
              horizontal={false}
              numColumns={this.state.screenWidth > 800 ? 2 : 1}
              screenWidth={this.state.screenWidth}
              windowSize={10}
              initialListSize={10}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              renderItem={({item, index}) => this.renderFlatList(item, index)}
            />
          )}
        </View>
        <Modal
          isVisible={this.state.popup}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          animationOutTiming={100}
          style={{
            justifyContent: 'flex-start',
            padding: moderateScale(10),
            top: moderateScale(50),
            left: moderateScale(20),
            width: moderateScale(300),
            borderRadius: moderateScale(8),
            // height : moderateScale(300)
          }}
          onBackdropPress={() => this.rightIcon2Function()}
          onBackButtonPress={() => this.rightIcon2Function()}
          backdropTransitionOutTiming={0}
          supportedOrientations={[
            'portrait',
            'portrait-upside-down',
            'landscape',
            'landscape-left',
            'landscape-right',
          ]}>
          <View
            style={{
              backgroundColor: 'white',
              margin: moderateScale(5),
            }}>
            <View
              style={{
                backgroundColor: 'white',
                height: moderateScale(60),
              }}>
              <TextInput
                // onSubmitEditing={}
                ref={this.a}
                style={{
                  backgroundColor: 'transparent',
                  color: 'black',
                  fontSize: moderateScale(14, 0.2),
                  borderBottomColor: 'black',
                  marginRight: moderateScale(10),
                  paddingLeft: moderateScale(10),
                  flex: 1,
                  width: moderateScale(270),
                  alignSelf: 'flex-start',
                }}
                placeholderTextColor="#767676"
                onChangeText={(text) => {
                  this.searchUOM(text, 1);
                }}
                selectionColor="black"
                underlineColorAndroid={'black'}
                autoFocus={this.state._autofocus}
                onFocus={() => this._onFocus()}
                autoCorrect={false}
                placeholder="Title*"
                blurOnSubmit={false}
                value={this.state.inputTitle}
              />
            </View>
            <View
              style={{
                backgroundColor: 'white',
                height: moderateScale(60),
                marginBottom: moderateScale(10),
              }}>
              <TextInput
                // onSubmitEditing={console.log('hi')}
                ref={this.a}
                style={{
                  backgroundColor: 'transparent',
                  color: 'black',
                  fontSize: moderateScale(14, 0.2),
                  borderBottomColor: 'black',
                  marginRight: moderateScale(10),
                  paddingLeft: moderateScale(10),
                  width: moderateScale(270),
                  flex: 1,
                  alignSelf: 'flex-start',
                }}
                placeholderTextColor="#767676"
                onChangeText={(text) => {
                  this.searchUOM(text, 0);
                }}
                selectionColor="white"
                underlineColorAndroid={'black'}
                autoFocus={this.state._autofocus}
                onFocus={() => this._onFocus()}
                autoCorrect={false}
                placeholder="Description*"
                blurOnSubmit={false}
                value={this.state.inputDes}
              />
            </View>
            <View style={{
                flexDirection: 'row',
                height: moderateScale(50),
                justifyContent: 'center',
                // borderTopWidth: 1,
                // borderTopColor: '#C4C4C4',
                justifyContent: 'flex-end',
                //paddingBottom: 10,
                //paddingTop: 10,
            }}>
                    <TouchableOpacity onPress={() => this.rightIcon2Function()} style={{justifyContent: 'center'}}>
                       <Text style = {{
                           fontSize : moderateScale(14),
                           marginLeft : moderateScale(10),
                           marginRight : moderateScale(20),
                        textAlign : "left"
                       }}>CANCEL</Text>
                    </TouchableOpacity>
            
                    <TouchableOpacity onPress={() =>{
                        this.onSave(
                            this.state.inputTitle,
                            this.state.inputDes )

                    }}
                    disabled = {(this.state.inputTitle === "" && this.state.inputDes === "") ? true : false }
                    style={{justifyContent: 'center'}} >
                         <Text style = {{
                           fontSize : moderateScale(14),
                           marginLeft : moderateScale(10),
                           marginRight : moderateScale(20),
                        textAlign : "left"
                       }}>SAVE</Text>
                    </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  const {
    testApiLoading,
    testApiResponse,
    firstTimeVar,
    testApiFailure,
    data,
    updatedData,
  } = state.Home;

  return {
    testApiLoading,
    testApiResponse,
    testApiFailure,
    data,
    firstTimeVar,
    updatedData,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
