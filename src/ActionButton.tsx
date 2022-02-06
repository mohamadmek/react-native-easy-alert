import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

const ActionButton = ({
  obj,
  textstyles,
  buttonStyles,
  containerRadius,
  index = 0,
  buttons,
  buttonBorderRight,
}: {
  obj: {
    text?: string;
    onPressAction: Function;
    backgroundColor?: string;
  };
  buttonStyles?: object;
  textstyles?: object;
  containerRadius?: number;
  index?: number;
  buttons?: any;
  buttonBorderRight?: number;
}) => {
  const {text, onPressAction, backgroundColor} = obj;
  const radiusCond1 = index === 0 ? containerRadius : 0;
  const radiusCond2 = index === buttons.length - 1 ? containerRadius : 0;
  const buttonBorderRightCond =
    index === buttons.length - 1 ? 0 : buttonBorderRight;
  return (
    <TouchableWithoutFeedback onPress={() => onPressAction && onPressAction()}>
      <View
        testID="actionButtonID"
        style={{
          ...styles.container,
          backgroundColor,
          ...buttonStyles,
          borderBottomLeftRadius: radiusCond1,
          borderBottomRightRadius: radiusCond2,
          borderRightWidth: buttonBorderRightCond,
        }}>
        <Text style={{...textstyles}}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
