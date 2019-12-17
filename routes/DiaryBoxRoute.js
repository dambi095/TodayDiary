
import { createStackNavigator } from 'react-navigation-stack';
import WritingDiaryScreen from "../screens/WritingDiaryScreen";
const DiaryBoxRoute = createStackNavigator(
  {
    // 일기 쓰기 화면
    WritingDiaryScreen: {
      screen:WritingDiaryScreen
    }
  },
  {
    mode:"card",
    headerMode: "none"
  }
);

export default DiaryBoxRoute;
