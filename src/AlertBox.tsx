import React, { useRef, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  TextStyle,
  Animated,
  ScrollView,
  Dimensions,
} from 'react-native';
import ActionButton from './ActionButton';
const { height } = Dimensions.get('window');

export var showAlert = ({
  titleParam = 'Alert',
  bodyParam = '',
  buttonsParam = [],
}: {
  titleParam?: string | undefined;
  bodyParam: string | undefined;
  buttonsParam?:
    | { backgroundColor?: string; text: string; onPressAction: Function }[]
    | undefined;
}): null | void => {
  console.log(titleParam, bodyParam, buttonsParam);
};

export var hideAlert = (): null | void => null;

interface IProps {
  overlayColor?: string;
  mainContainerStyles?: ViewStyle;
  headerStyles?: ViewStyle;
  containerStyles?: ViewStyle;
  footerStyles?: ViewStyle;
  bodyStyles?: ViewStyle;
  overLayStyles?: ViewStyle;
  buttonStyles?: ViewStyle;
  headerTextStyles?: TextStyle;
  bodyTextStyles?: TextStyle;
  globalTextStyles?: TextStyle;
  buttonTextstyles?: TextStyle;
  customChildren?: any;
  isRemoveChildrenAnimation?: boolean;
  hideHeader?: boolean;
  hideCloseIcon?: boolean;
  closeIcon?: null | any;
  containerRadius?: number;
  buttonBorderRight?: number;
  crossIconColor?: string;
}

const AlertBox = ({
  overlayColor = 'rgba(0, 0, 0, 0.5)',
  mainContainerStyles = {},
  headerStyles = {},
  containerStyles = {},
  footerStyles = {},
  bodyStyles = {},
  overLayStyles = {},
  headerTextStyles = {},
  bodyTextStyles = {},
  globalTextStyles = {},
  buttonTextstyles = {},
  buttonStyles = {},
  customChildren = null,
  isRemoveChildrenAnimation = false,
  hideHeader = false,
  hideCloseIcon = false,
  closeIcon = null,
  containerRadius = 8,
  buttonBorderRight = 0.5,
  crossIconColor = '#fff',
}: IProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string | undefined>('Alert');
  const [body, setBody] = useState<string | undefined>('');
  const [buttons, setButtons] = useState<any | undefined>([]);
  const alertScale = useRef(new Animated.Value(0)).current;

  showAlert = ({
    titleParam = 'Alert',
    bodyParam = '',
    buttonsParam = [],
  }: {
    titleParam?: string | undefined;
    bodyParam: string | undefined;
    buttonsParam?: any | undefined;
  }) => {
    setIsVisible(true);
    setTitle(titleParam);
    setBody(bodyParam);
    setButtons(buttonsParam);
    Animated.timing(alertScale, {
      toValue: 1,
      useNativeDriver: true,
      duration: 200,
    }).start();
  };

  hideAlert = () => {
    Animated.timing(alertScale, {
      toValue: 0,
      useNativeDriver: true,
      duration: 200,
    }).start(() => {
      setIsVisible(false);
    });
  };

  return (
    <Modal
      animationType={'none'}
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        hideAlert();
      }}
    >
      <View
        testID={'alertBoxID'}
        style={[styles.mainContainer, mainContainerStyles]}
      >
        <TouchableWithoutFeedback
          testID="overlayID"
          onPress={() => hideAlert()}
        >
          <View
            style={{
              ...styles.overLay,
              backgroundColor: overlayColor,
              ...overLayStyles,
            }}
          />
        </TouchableWithoutFeedback>
        {customChildren == null ? (
          <Animated.View
            style={{
              ...styles.container,
              transform: [
                {
                  scale: alertScale.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.4, 1],
                  }),
                },
              ],
              ...containerStyles,
              borderRadius: containerRadius,
            }}
          >
            {hideCloseIcon ? null : closeIcon ? (
              <TouchableWithoutFeedback
                testID="crossIconID"
                onPress={() => hideAlert()}
              >
                {closeIcon}
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback onPress={() => hideAlert()}>
                <View
                  style={{ borderColor: crossIconColor, ...styles.crossIcon }}
                >
                  <Text
                    style={{ color: crossIconColor, ...styles.crossIconText }}
                  >
                    ✕
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            <View>
              {hideHeader ? null : (
                <View
                  testID="headerID"
                  style={[
                    styles.header,
                    headerStyles,
                    {
                      borderTopRightRadius: containerRadius,
                      borderTopLeftRadius: containerRadius,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.headerText,
                      globalTextStyles,
                      headerTextStyles,
                    ]}
                  >
                    {title}
                  </Text>
                </View>
              )}

              <View
                style={[
                  styles.body,
                  bodyStyles,
                  // eslint-disable-next-line react-native/no-inline-styles
                  { paddingTop: hideHeader ? 15 : 0 },
                ]}
              >
                <ScrollView>
                  <View style={styles.inlineBody}>
                    <Text
                      style={[
                        styles.bodyText,
                        globalTextStyles,
                        bodyTextStyles,
                      ]}
                      testID={'bodyTextID'}
                    >
                      {body}
                    </Text>
                  </View>
                </ScrollView>
              </View>

              {buttons.length > 0 ? (
                <View style={[styles.footer, footerStyles]}>
                  {buttons.map((obj: any, index: number) => (
                    <ActionButton
                      buttons={buttons}
                      buttonStyles={buttonStyles}
                      containerRadius={containerRadius}
                      textstyles={{
                        ...globalTextStyles,
                        ...buttonTextstyles,
                      }}
                      buttonBorderRight={buttonBorderRight}
                      key={index}
                      obj={obj}
                      index={index}
                    />
                  ))}
                </View>
              ) : null}
            </View>
          </Animated.View>
        ) : (
          <>
            {isRemoveChildrenAnimation ? (
              customChildren(title, body, buttons)
            ) : (
              <Animated.View
                style={{
                  transform: [
                    {
                      scale: alertScale.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.4, 1],
                      }),
                    },
                  ],
                }}
              >
                {customChildren(title, body, buttons)}
              </Animated.View>
            )}
          </>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  overLay: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    width: '85%',
    backgroundColor: '#FFF',
    zIndex: 9999999999,
  },
  crossIcon: {
    width: 25,
    height: 25,
    position: 'absolute',
    top: 5,
    right: 7,
    zIndex: 9999999,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 2,
  },
  crossIconText: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: '100%',
    backgroundColor: '#2E5AAC',
  },
  headerText: {
    color: '#EEF2FA',
  },
  body: {
    maxHeight: height - 200,
    width: '100%',
  },
  inlineBody: {
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyText: {
    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    flexDirection: 'row',
  },
  footerTextStyles: {},
});

export default AlertBox;
