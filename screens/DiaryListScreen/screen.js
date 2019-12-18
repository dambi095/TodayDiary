import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Card } from "react-native-elements";
import { Feather } from "@expo/vector-icons";

// 일기 리스트 목록 그리기 
const DiartListScreen = props => (
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Text style={styles.titleFont}>{props.diary_title}</Text>
    {props.diaryList.length !== 0 ?
      (<>
        <FlatList
          data={props.diaryList}
          keyExtractor={item => item.page_num.toString()}
          refreshing={props.isFetching}
          onRefresh={props.refresh}
          renderItem={({ item }) => (
            <TouchableOpacity onPressOut={ async() => {
              const result = await props.getDiaryContents(item.diary_num.toString(), item.page_num.toString());
            if(result){
                props.navigation.navigate("DiaryContentsScreen", {
                  title: item.title,
                  write_date: item.write_date,
                  nickname: item.nickname,
                  page_num: item.page_num,
                  diary_num: item.diary_num,
                  diaryContent: item.contents
                });
              }
            }}>
              <View style={{ flexDirection: 'row', marginTop:5 }}>
                <Text style={{fontSize:17, marginBottom:3}}>{item.title} </Text>
                <Text style={{fontSize:15, marginBottom:3, paddingTop:3}}>{item.write_date.substring(0, 10)}</Text>
              </View>

            </TouchableOpacity>
          )}
        />
          <TouchableOpacity
              style={{marginBottom:'30%'}}
              onPressOut={() => {
                props.navigation.navigate("WritingDiaryScreen", {
                  diary_num: props.diary_num,
                });
              }}>
              <Feather name={"plus-circle"} size={35} color='grey' />
            </TouchableOpacity>
      </>) : (<>
        <Card containerStyle={{
          borderRadius: 5,
          borderWidth: 3,
          borderStyle: 'dashed',
          width: '80%',
          height: '80%'
        }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '50%' }}>
            {props.diary_type == 'default' ? <Text style={styles.addFont}>당신의 일기를 추가하세요!</Text> : <Text style={styles.addFont}>친구와의 교환일기를 추가하세요!</Text>}
            <TouchableOpacity
              style={{ paddingTop: 10 }}
              onPressOut={() => {
                props.navigation.navigate("WritingDiaryScreen", {
                  diary_num: props.diary_num,
                });
              }}>
              <Feather name={"plus-circle"} size={35} color='grey' />
            </TouchableOpacity>

          </View>
        </Card>
      </>)
    }

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

export default DiartListScreen;