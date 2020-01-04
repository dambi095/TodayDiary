import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Alert, FlatList } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const Calendar = props => (
  <CalenderView>
    <YearView>
      <TouchableOpacity onPress={() => { console.log("props:" , props.selectedDay, props.date); props.onPressArrowLeft() }}>
        <Ionicons
          name="ios-arrow-back"
          color="#2f3640"
          size={26}
        />
      </TouchableOpacity>
      <YearText>{props.date.toString().substring(10, 16)}.{props.date.toString().substring(3, 8)}</YearText>
      <TouchableOpacity onPress={() => { props.onPressArrowRight() }}>
        <Ionicons
          name="ios-arrow-forward"
          color="#2f3640"
          size={25}
        />
      </TouchableOpacity>
    </YearView>
    <DayView>
      <DayText>일</DayText>
      <DayText>월</DayText>
      <DayText>화</DayText>
      <DayText>수</DayText>
      <DayText>목</DayText>
      <DayText>금</DayText>
      <DayText>토</DayText>
    </DayView>

    <FlatList
      contentContainerStyle={styles.number}
      data={props.week}
      keyExtractor={item => item.index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPressOut={() => props.getDiaryList(item.newDate)}>
          <DayText style={[props.selectedStyle == true && props.selectedDay === item.newDate ? styles.selected : styles.default]}>{item.newDate.toString().substring(8, 10)}</DayText>
        </TouchableOpacity>
      )}
    />
  </CalenderView>
)

const CalenderView = styled.View` 
  align-items: center;
`;

const DayView = styled.View` 
  align-content: center;
  flexDirection: row;
`

const YearView = styled.View`
  flexDirection: row;
  marginTop:5; 
  marginBottom:5;
`

const YearText = styled.Text`
  font-size: 20;
  marginLeft: 10;
  marginRight:10;
  color: #2f3640;
`

const DayText = styled.Text`
  marginRight: 5;
  color: #2f3640;
  fontWeight: bold;
  width: ${width / 8};
`;

const styles = StyleSheet.create({
  number: {
    flexDirection: 'row'
  },
  selected: {
    color: '#00a8ff',
  },
  default: {
    color: '#273c75'
  }
})

export default Calendar;