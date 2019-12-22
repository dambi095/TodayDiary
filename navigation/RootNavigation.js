import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import TabsNavigation from "./TabsNavigation";
import { Ionicons } from "@expo/vector-icons";
import WritingScreen from "../screens/WritingDiaryScreen";
import { TouchableOpacity, Text, View } from "react-native";
import styled from "styled-components/native";
const RootNavigation = createStackNavigator(
  {
    Tabs: {
      screen: TabsNavigation,
      navigationOptions: props => ({
        title: "MY DIARY",
        headerTitleStyle: { color: "#263238" },
        headerStyle: { backgroundColor: "#ef9a9a" },
        headerRight: (
          <View>
            <TouchableOpacity>
              <Box>
                <Ionicons name="ios-contact" size={30} color={"#263238"} />
              </Box>
            </TouchableOpacity>
          </View>
        )
      })
    },
    WritingScreen: {
      screen: WritingScreen,
      navigationOptions: {
        title: "글 작성"
      }
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
