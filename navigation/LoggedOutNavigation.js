import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import LogInScreen from "../screens/LogInScreen";
import SignupScreen from "../screens/SignUpScreen";

const LoggedOutNavigation = createStackNavigator({
  LogIn: {
    screen: LogInScreen,
    navigationOptions: {
      title: "Log In",
      headerTitleStyle: { color: "#263238" },
      headerStyle: { backgroundColor: "#ef9a9a" }
    }
  },
  SignUp: {
    screen: SignupScreen,
    navigationOptions: {
      title: "Sign Up",
      headerTitleStyle: { color: "#263238" },
      headerStyle: { backgroundColor: "#ef9a9a" }
    }
  }
});

export default createAppContainer(LoggedOutNavigation);
