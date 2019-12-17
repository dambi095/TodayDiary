import React, { Component } from "react";
import { Alert } from "react-native";
import PropTypes from "prop-types";
import SignupScreen from "./screen";

class Action extends Component {
  static propTypes = {
    signUp: PropTypes.func.isRequired
  };

  state = {
    username: "",
    email: "",
    password: "",
    isSubmitting: false
  };

  render() {
    return (
      <SignupScreen
        {...this.state}
        {...this.props}
        changeUsername={this._changeUsername}
        changePassword={this._changePassword}
        changeEmail={this._changeEmail}
        submit={this._submit}
      />
    );
  }

  _changeUsername = text => {
    this.setState({ username: text });
  };
  _changePassword = text => {
    this.setState({ password: text });
  };
  _changeEmail = text => {
    this.setState({ email: text });
  };
  _submit = async () => {
    const { username, password, email, isSubmitting } = this.state;
    const { signUp } = this.props;
    if (!isSubmitting) {
      if (username && password && email) {
        this.setState({
          isSubmitting: true
        });
        const signupResult = await signUp(username, password, email);
        if (!signupResult) {
          Alert.alert("이미 존재하는 계정입니다");
          this.setState({ isSubmitting: false });
        }
      } else {
        Alert.alert("입력양식을 모두 입력해주세요");
      }
    }
  };
}

export default Action;
