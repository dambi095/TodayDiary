
import { createStackNavigator } from 'react-navigation-stack';
import DiaryBoxScreen from "../screens/DiaryBoxScreen";
import WritingDiaryScreen from "../screens/WritingDiaryScreen";
import DiaryListScreen from "../screens/DiaryListScreen";
import DiaryContentScreen from "../screens/DiaryContentScreen";

const DiaryBoxRoute = createStackNavigator(
  {
    // 일기장 리스트 보여주는 화면 
    DiaryBoxScreen: {
      screen: DiaryBoxScreen
    },
    // 일기 쓰기 화면
    WritingDiaryScreen: {
      screen: WritingDiaryScreen
    },
    // 일기 리스트 화면 
    DiaryListScreen: {
      screen: DiaryListScreen
    },
    // 일기 내용 화면 
    DiaryContentScreen: {
      screen: DiaryContentScreen
    }
  },
  {
    mode: "card",
    headerMode: "none"
  }
);

export default DiaryBoxRoute;
