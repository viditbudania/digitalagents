import React, {Component} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export class CustomCardView extends Component {
  render() {
    const {containerHeight, containerWidth, view} = this.props;
    const styles = StyleSheet.create({
      renderItem_container: {
        flex: this.props.containerHeight ? null : 1,
        paddingVertical: moderateScale(5),
        marginBottom: moderateScale(5),
        marginHorizontal: moderateScale(5),
        backgroundColor: 'white',
        borderRadius: moderateScale(5),
        paddingHorizontal: moderateScale(10),
        shadowColor: '#4077EB',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 3.5,
      },
    });
    return (
      <View
        style={[
          styles.renderItem_container,
          {
            height: this.props.containerHeight,
            width: this.props.containerWidth,
          },
        ]}>
        {this.props.view}
      </View>
    );
  }
}
