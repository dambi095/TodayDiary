import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Card } from "react-native-elements";
import Calender from "../../components/Calendar";
import { AntDesign } from "@expo/vector-icons";


const { width, height } = Dimensions.get("window");

// 일기 리스트 목록 그리기 
const DiaryListScreen = props => (
  <View>
    <View>
      <Calender
        selectedDate={props.selectedDate}
        diary_num={props.diary_num}
      />
    </View>
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {props.diaryList.length !== 0 &&
        (<>
          <FlatList
            contentContainerStyle={{ marginTop: '5%', height: height / 1.5 }}
            data={props.diaryList}
            keyExtractor={item => item.page_num.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPressOut={async () => {
                const result = await props.getDiaryContent(item.diary_num.toString(), item.page_num.toString());
                if (result) {
                  props.navigation.navigate("ContentScreen", item.diary_num.toString());
                }
              }}>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <Text style={{ fontSize: 17, marginBottom: 3 }}>{item.title} </Text>
                  <Text style={{ fontSize: 15, marginBottom: 3, paddingTop: 3 }}>{item.write_date.substring(0, 10)}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </>)
      }
    </View>
    {props.selectedDay < props.today ? (
      <View style={{ marginTop: '70%', alignItems: 'center' }}>
        {props.diaryList.length == 0 && (
          <Text >작성한 일기가 없습니다</Text>
        )}
      </View>
    ) : (
        <View style={{ alignItems: 'center' }}>
          {props.selectedDay === props.today ? (
            <View>
              {props.diaryList.length === 0 ? (
               <Card containerStyle={{
                borderRadius: 5,
                borderWidth: 3,
                borderStyle: 'dashed',
                width: width / 1.2,
                height: height / 2
              }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop:'40%' }}>
                     <Text style={styles.addFont}>오늘의 일기를 추가하세요!</Text> 
                      <TouchableOpacity
                        style={{ paddingTop: 10 }}
                        onPressOut={() => {
                          props.navigation.navigate("WritingScreen", {
                            diary_num: props.diary_num,
                          });
                        }}>
                        <Feather name={"plus-circle"} size={35} color='grey' />
                      </TouchableOpacity>
          
                    </View>
                  </Card>) : ( <TouchableOpacity
                onPressOut={() => {
                  props.navigation.navigate("WritingScreen", {
                    diary_num: props.diary_num,
                  });
                }}>
                <Feather name={"plus-circle"} size={35} color='grey' />
              </TouchableOpacity>)}
            </View>
          ) : (
              <View style={{ marginTop: '70%', alignItems: 'center' }}>
                <Text>아직 작성할 수 없습니다</Text>
              </View>
            )}
        </View>
      )}
  </View>
);

const styles = StyleSheet.create({
  titleFont: {
    paddingTop: 10,
    fontSize: 23,
    fontWeight: "900",
    color: '#263238',
  },
  addFont: {
    color: 'grey', fontWeight: 'bold', fontSize: 18
  }
})

export default DiaryListScreen;