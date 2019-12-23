import React from "react";
import {Dimensions, StatusBar} from "react-native";
import styled from "styled-components/native";

const { width } = Dimensions.get("window");

const LogInScreen = props => (
  <Container>
    <StatusBar barStyle={"light-content"} />
      <Header>
        <AppName>끄적끄적</AppName>
      </Header>
      <Content>
        <Input
          placeholder=" Email"
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
          <Btn>
            <BtnText> 로그인 </BtnText>
          </Btn>
        </TouchableOpacity>
        <TouchableOpacity onPressOut={props.facebookLogIn}>
          <BtnText> 페이스북 로그인 </BtnText>
        </TouchableOpacity>
        <TouchableOpacity onPressOut={() => props.navigation.navigate("SignUp")}>
          <BtnText> 가입하기 </BtnText>
        </TouchableOpacity>
      </Content>
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

const AppName = styled.Text`
  font-size: 50;
  color: #ef9a9a;
`;

const Content = styled.View`
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
  height:30;  
`;

const TouchableOpacity = styled.TouchableOpacity`
  margin-bottom: 10;
`;

const Btn = styled.View`
  width: ${width / 2};
`;

const BtnText = styled.Text`
  text-align: center;
  font-weight: bold;
  color: #ef9a9a;
`;

export default LogInScreen;
