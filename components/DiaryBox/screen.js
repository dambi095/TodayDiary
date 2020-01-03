import React from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Alert } from "react-native";
import { withNavigation } from "react-navigation";
import OptionsMenu from "react-native-options-menu";
import { Card } from "react-native-elements";

const MoreIcon = require("../../assets/icon_receiptpay.png");

const { width, height } = Dimensions.get("window");

// 일기장 목록 그리기 
const Diarybox = props => (
  <View>
    <Card containerStyle={styled.boxBorder}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPressOut={async () => {
            const result = await props.handlePress(props.diary_num, props.today);
            if (result) {
              props.navigation.navigate("DiaryListScreen", {
                diary_title: props.diary_title, // 일기장 타이틀 
                diary_num: props.diary_num,
                diary_type: props.diary_type,
                today: props.today
              });
            }
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{props.diary_title} </Text>
          <Text style={{ fontSize: 15, lineHeight: 20, color: 'grey' }}>{props.create_date.substring(0, 10)}</Text>
        </TouchableOpacity>
        <OptionsMenu
          button={MoreIcon}
          buttonStyle={{ width: 20, height: 20, margin: 7.5, resizeMode: "contain" }}
          options={["수정", "삭제", "취소"]}
          actions={[props.editDiaryInfo, props.deleteDiary, props.cancel]}
        />
      </View>
    </Card>
  </View>
);

var styled = StyleSheet.create({
  boxBorder: {
    alignItems:'center',
    justifyContent:'center',
    flexDirection: 'row',
    borderRadius: 20,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 1,
    width: `${width}` / 1.2,
    height: `${height}` / 2
  }
})


export default withNavigation(Diarybox);