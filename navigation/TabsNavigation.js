import React from "react";
import { createAppContainer } from "react-navigation";
import {createBottomTabNavigator} from "react-navigation-tabs";
import DiaryboxRoute from "../routes/DiaryBoxRoute";
//import SearchScreen from "../screens/SearchScreen";
//import CalenderScreen from "../screens/CalenderScreen";
//import NotificationScreen from "../screens/NotificationScreen";
import { Ionicons } from "@expo/vector-icons";

const TabsNavigation = createBottomTabNavigator(
  {
    Diarybox: {
      screen: DiaryboxRoute,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name="ios-bookmarks"
            size={30}
            color={focused ? "#263238" : "#ffcdd2"}
          />
        )
      }
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: "#ef9a9a",
        height: 45
      }
    }
  }
);

export default createAppContainer(TabsNavigation);
