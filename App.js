import React from 'react';
import { AppLoading, Font } from "expo";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Provider } from "react-redux"; // 컴포넌트 안의 스토어를 복사해서 자식 컴포넌트에 주입 시켜준다. 
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./redux/configureStore";
import AppContainer from "./components/AppContainer";

// store 생성 
const { persistor, store } = configureStore();

class App extends React.Component {
  state = {
    isLoadingComplete: false
  };
  render() {
    const { isLoadingComplete } = this.state;
    if (!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    return ( // AppContainer 를 복사할 수 있는 스토어 생성 
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }

  _loadAssetsAsync = async () => {
    return Promise.all([
      //Font.loadAsync({
      //  ...Ionicons.font,
      // ...Feather.font
      //})
    ]);
  };
  _handleLoadingError = error => {
    console.error(error);
  };
  _handleFinishLoading = async () => {
    this.setState({
      isLoadingComplete: true
    });
  };
}

export default App;
