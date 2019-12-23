import React, { Component } from "react";
import { Alert } from "react-native";
import LogInScreen from "./screen";
import * as Facebook from 'expo-facebook';

class Action extends Component {
  state = {
    email: "",
    password: "",
    isSubmitting: false
  };

  render() {
    return (
      <LogInScreen
        {...this.state}
        {...this.props}
        changeUsername={this._changeUsername}
        changePassword={this._changePassword}
        submit={this._submit}
        facebookLogIn={this._facebookLogIn}
      />
    );
  }
  _changeUsername = text => {
    this.setState({ email: text });
  };
  _changePassword = text => {
    this.setState({ password: text });
  };

 
// 페이스북 로그인
_facebookLogIn = async () => {
  const { facebookLogIn } = this.props
  const facebookResult = await facebookLogIn();
}

  _submit = async () => {
    const { email, password, isSubmitting } = this.state;
    const { logIn, getDiary } = this.props;

    if (!isSubmitting) {
      if (email && password) {
        this.setState({
          isSubmitting: true
        });
        // redux action
        const loginResult = await logIn(email, password);
        if (!loginResult) {
          Alert.alert("잘못된 아이디, 비밀번호 입니다");
          this.setState({ isSubmitting: false });
        } else {
          getDiary();
        }
      } else {
        Alert.alert("아이디, 비밀번호를 입력해주세요");
      }
    }
  };
}

export default Action;
