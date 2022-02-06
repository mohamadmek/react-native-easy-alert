<h1 align="center">
  🚩 React Native Alert
</h1>

<div align="center">

React Native Easy Alert Component.

[![Version][version-badge]][package] [![Downloads][downloads-badge]][npmtrends] [![Star on GitHub][github-star-badge]][github-star]

</div>
<p align="center" >
  <kbd>
   <a target="_blank" href="https://www.youtube.com/watch?v=z9ADBprGlvQ" >
    <img
    height="375"
    width="180"
      src="https://github.com/mohamadmek/react-native-easy-alert/blob/master/docs/assets/demo.gif?raw=true"
      title="Demo Play"
      float="left"
    >
    </a>
  </kbd>
   <br>
  <a target="_blank" href="https://www.youtube.com/watch?v=z9ADBprGlvQ" >Watch on youtube</a>
  <br>
  <em>Easy Alert example app.</em>
 
  
</p>

React Native's Global `Alert` Component that can be fully customized and without the need of a state.

- No need for redux.
- No need for Context API.
- Work with Class based Components and Functional.
- Easy and Flexible and can be fully custom.

`EasyAlert` is an `Alert` replacement that solves adding a state to each alert.
`FastImage` is a wrapper around

## Features

- [x] Support passing a custom component.
- [x] Less State and simple to use.
- [x] Can be used from any screen.
- [x] Customizable on various levels.
- [x] Change Font Family.
- [x] By default opening and closing animations.

## Usage

\*\*Note: You will feel much comfortable when you use it as it will make you write less code.

```bash
yarn add react-native-easy-alert
or
npm i react-native-easy-alert
```

Add `AlertBox` in your root component and give it a custom component or customize it using the props available.

```jsx
import AlertBox from 'react-native-easy-alert';

const App = () => {
  return (
    <>
      <RootComponent />
      <AlertBox
        headerStyles={{backgroundColor: '#2E5AAC',}}
        headerTextStyles={{color: '#fff'}}
        bodyTextStyles={{color: '#000'}}
      />
    <>
  );
};
```

Use custom component to show your own creativity

```jsx
import AlertBox from 'react-native-easy-alert';

const App = () => {
  return (
    <>
      <RootComponent />
      <AlertBox
       customChildren={(title?: string, body?: string, buttons?: any) => (
          <View
            style={{
              backgroundColor: '#fff',
              height: 200,
              width: 300,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>{title}</Text>
            <Text>{body}</Text>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              {buttons.map((x: any, i: any) => (
                <View
                  style={{
                    backgroundColor: 'lightblue',
                    marginHorizontal: 10,
                    padding: 15,
                  }}
                  key={i}>
                  <Text>buttons</Text>
                </View>
              ))}
            </View>
          </View>
        )}
         />
    <>
  );
};
```

Now you can use the functions showAlert and hideAlert Globaly.

```jsx
import { showAlert, hideAlert } from 'react-native-easy-alert';

const MyScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableWithoutFeedback
        onPress={() =>
          showAlert({
            titleParam: 'Alert',
            bodyParam: 'Do you want to close me?',
            buttonsParam: [
              {
                backgroundColor: '#34c240',
                text: 'Yes',
                onPressAction: () => hideAlert(),
              },
              {
                backgroundColor: '#d64242',
                text: 'No',
                onPressAction: () => Alert.alert('Continue Please'),
              },
            ],
          })
        }
      >
        <Text>Show Alert</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};
```

If you have a problem Alert not appearing above modal you need to add AlertBox Component inside the Modal.

```jsx
import AlertBox, { hideAlert, showAlert } from 'react-native-easy-alert';

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        hideAlert();
        setIsModalVisible(!modalVisible);
      }}
    >
      <TouchableWithoutFeedback
        onPress={() =>
          showAlert({
            titleParam: 'Alert',
            bodyParam: 'Do you want to close me?',
            buttonsParam: [
              {
                backgroundColor: 'green',
                text: 'Yes',
                onPressAction: () => hideAlert(),
              },
              {
                backgroundColor: 'red',
                text: 'No',
                onPressAction: () => Alert.alert('Continue Please'),
              },
            ],
          })
        }
      >
        <Text>Show Alert</Text>
      </TouchableWithoutFeedback>
      <AlertBox />
    </Modal>
  );
};
```

## Static Methods

### showAlert

```jsx
showAlert({titleParam, bodyParam, buttonsParam}: {
titleParam?: string ;
bodyParam: string;
buttonsParam?:
| {backgroundColor?: string; text: string; onPressAction: Function}[];
}) => void`
```

### hideAlert

```jsx
showAlert() => void`
```

### Props

#### Main

| Prop                       |    Type     |                          Description                          | Default |
| :------------------------- | :---------: | :-----------------------------------------------------------: | :------ |
| customChildren?            | `function`  | function that receive three parameters (title, body, buttons) | null    |
| isRemoveChildrenAnimation? |  `boolean`  |             Remove animation for custom children              | false   |
| hideHeader?                |  `boolean`  |                          Hide header                          | false   |
| hideCloseIcon?             |  `boolean`  |                        Hide close icon                        | false   |
| containerRadius?           |  `number`   |                 Radius of the main container                  | false   |
| closeIcon?                 | `component` |                  Custom close icon component                  | false   |

#### Styling

| Prop                 |   Type   |                           Description                           | Default            |
| :------------------- | :------: | :-------------------------------------------------------------: | :----------------- |
| overlayColor?        | `string` |                 Overlay color behind the alert                  | rgba(0, 0, 0, 0.5) |
| overLayStyles?       | `object` |                         Overlay styles                          | -                  |
| globalTextStyles?    | `string` | Style all the text that is in the alert like change font family | -                  |
| mainContainerStyles? | `object` |                      Main container styles                      | -                  |
| containerStyles?     | `object` |                     Inner container styles                      | -                  |
| headerStyles?        | `object` |                          Header styles                          | -                  |
| headerTextStyles?    | `object` |                       Header text styles                        | -                  |
| bodyStyles?          | `object` |                           Body styles                           | -                  |
| bodyTextStyles?      | `object` |                        Body text styles                         | -                  |
| footerStyles?        | `object` |                          Footer styles                          | -                  |
| buttonStyles?        | `object` |                          Button styles                          | -                  |
| buttonBorderRight?   | `number` |                     Border right on button                      | 0.5                |
| buttonTextstyles?    | `object` |                       Button text styles                        | -                  |
| mainContainerStyles? | `object` |                      Main container styles                      | -                  |

## Licenses

- react-native-easy-alert - MIT © [Mohamadmek](https://github.com/Mohamadmek)

[downloads-badge]: https://img.shields.io/npm/dm/react-native-easy-alert.svg
[npmtrends]: http://www.npmtrends.com/react-native-easy-alert
[package]: https://www.npmjs.com/package/react-native-easy-alert
[version-badge]: https://img.shields.io/npm/v/react-native-easy-alert.svg
[github-star-badge]: https://img.shields.io/github/stars/mohamadmek/react-native-easy-alert.svg?style=social
[github-star]: https://github.com/mohamadmek/react-native-easy-alert/stargazers
