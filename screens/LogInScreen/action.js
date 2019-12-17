import React, { Component } from "react";
import { Alert } from "react-native";
import LogInScreen from "./screen";

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
      />
    );
  }
  _changeUsername = text => {
    this.setState({ email: text });
  };
  _changePassword = text => {
    this.setState({ password: text });
  };
  _submit = async () => {
    const { email, password, isSubmitting } = this.state;
    const { login } = this.props;
    if (!isSubmitting) {
      if (email && password) {
        this.setState({
          isSubmitting: true
        });
        // redux action
        const loginResult = await login(email, password);
        if (!loginResult) {
          Alert.alert("잘못된 아이디, 비밀번호 입니다");
          this.setState({ isSubmitting: false });
        }
      } else {
        Alert.alert("아이디, 비밀번호를 입력해주세요");
      }
    }
  };
}

export default Action;
