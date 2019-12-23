import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import LogInScreen from "../screens/LogInScreen";
import SignupScreen from "../screens/SignUpScreen";

const LoggedOutNavigation = createStackNavigator({
  LogIn: {
    screen: LogInScreen,
    navigationOptions: {
      title: "Log In"
    }
  },
  SignUp: {
    screen: SignupScreen,
    navigationOptions: {
      title: "Sign Up"
    }
  }
});

export default createAppContainer(LoggedOutNavigation);
