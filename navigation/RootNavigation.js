import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import TabsNavigation from "./TabsNavigation";
import { Ionicons } from "@expo/vector-icons";
import WritingDiaryScreen from "../screens/WritingDiaryScreen";
import DiaryListScreen from "../screens/DiaryListScreen";
import { TouchableOpacity, View, Text } from "react-native";
import styled from "styled-components/native";
import DiaryContentScreen from "../screens/DiaryContentScreen";

const RootNavigation = createStackNavigator(
  {
    Tabs: {
      screen: TabsNavigation,
      navigationOptions: props => ({
        title: "MY DIARY",
        headerRight: (
          <View>
            <TouchableOpacity onPress={() => {
              props.screenProps.logOut()
            }}>
              <Box>
                <Ionicons name="ios-log-out" size={30} color={"#263238"} />
              </Box>
            </TouchableOpacity>
          </View>
        )
      })
    },
    WritingScreen: {
      screen: WritingDiaryScreen,
      navigationOptions: {
        title: "글 작성"
      }
    },
    ListScreen: {
      screen: DiaryListScreen,
      navigationOptions: props => ({
        title: props.navigation.state.params.diary_title
      })
    },
    ContentScreen: {
      screen: DiaryContentScreen,
      navigationOptions: props => ({})
    }
  },
  {
    mode: "card",
    defaultNavigationOptions: {
      gesturesEnabled: true
    }
  }
);

const Box = styled.View`
  margin-right: 5;
`;

export default createAppContainer(RootNavigation);
