import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const SignupScreen = props => (
  <Container>
    <Header>
      <Signup>가입하기</Signup>
    </Header>
    <Form>
      <Input
        placeholder=" Email"
        placeholderTextColor="#ffcdd2"
        autoCapitalize={"none"}
        autoCorrect={false}
        value={props.email}
        onChangeText={props.changeEmail}
      />
      <Input
        placeholder=" Username"
        placeholderTextColor="#ffcdd2"
        autoCapitalize={"none"}
        autoCorrect={false}
        value={props.username}
        onChangeText={props.changeUsername}
      />
      <Input
        placeholder=" Password"
        placeholderTextColor="#ffcdd2"
        autoCapitalize={"none"}
        secureTextEntry={true}
        value={props.password}
        onChangeText={props.changePassword}
        returnKeyType={"send"}
        onSubmitEditing={props.submit}
      />
      <TouchableOpacity onPressOut={props.submit}>
        <BtnText> 가입하기 </BtnText>
      </TouchableOpacity>
      <TouchableOpacity onPressOut={() => props.navigation.navigate("LogIn")}>
        <BtnText> 로그인 하기 </BtnText>
      </TouchableOpacity>
    </Form>
  </Container>
);

const Container = styled.View`
  flex: 1;
`;

const Header = styled.View`
  flex: 2;
  align-items: center;
  justify-content: center;
  width: ${width};
`;

const Signup = styled.Text`
  font-size: 50;
  color: #ef9a9a;
`;

const Form = styled.View`
  flex: 4;
  align-items: center;
  justify-content: flex-start;
`;

const Input = styled.TextInput`
  width: ${width / 2};
  margin-bottom: 10;
  border-width: 1;
  border-radius: 10;
  border-color: #ef9a9a;
`;

const TouchableOpacity = styled.TouchableOpacity`
  margin-bottom: 10;
`;

const BtnText = styled.Text`
  text-align: center;
  font-weight: bold;
  color: #ef9a9a;
`;

export default SignupScreen;
