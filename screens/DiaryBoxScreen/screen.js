import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Switch,
  Dimensions
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";
import DiaryBox from "../../components/DiaryBox"
import Modal from 'react-native-modal';
import { TextInput } from "react-native-gesture-handler";
import { Card } from "react-native-elements";

const { width, height } = Dimensions.get("window");

const DiaryboxScreen = props => (
  <View style={styles.container}>
    {props.myDiary.length === 0 && props.exDiary.length === 0 ? (
      <>
        <Card containerStyle={{
          borderRadius: 5,
          borderWidth: 3,
          borderStyle: 'dashed',
          width: '70%',
          height: '70%'
        }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '45' }}>
            <Text style={styles.titleFont}>일기장을 생성 하세요!</Text>
            <TouchableOpacity
              style={{ paddingTop: 10 }}
              onPressOut={props.toggleModal}
            >
              <FontAwesome name={"plus-circle"} size={55} color='grey' />
            </TouchableOpacity>
          </View>
        </Card>
      </>
    ) : (
        <>
          {props.myDiary.length !== 0 ? (
            <>
              <View style={{ alignItems: 'center', justifyContent: 'center', flex:2} }>
                <Text style={styles.titleFont}>나의 일기</Text>
                <FlatList
                  data={props.myDiary}
                  keyExtractor={(item) => item.diary_num.toString()}
                  refreshing={props.isFetching}
                  onRefresh={props.refresh}
                  renderItem={({ item }) => <DiaryBox {...item} />}
                />
              </View>
            </>
          ) : null}
          <Text style={styles.titleFont}>{props.exDiary.length !== 0 ? "교환일기" : ""}</Text>
          <FlatList
            horizontal={true}
            data={props.exDiary}
            keyExtractor={item => item.diary_num.toString()}
            refreshing={props.isFetching}
            onRefresh={props.refresh}
            renderItem={({ item }) => <DiaryBox {...item} />}
          />
          {props.exDiary.length < 5 || props.myDiary.length < 1 ? (
            <TouchableOpacity
              onPressOut={props.toggleModal}
            >
              <FontAwesome name={"plus-circle"} size={40} color='grey' />
            </TouchableOpacity>
          ) : null}
        </>
      )}
    {props.isModalVisible ?
      <Modal isVisible={props.isModalVisible}
        animationInTiming={500}
        onSwipeComplete={props.toggleModal}
      >
        <View style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.modalText}>제목</Text>
            <TextInput maxLength={20}
              style={styles.modalTextInput}
              placeholder='일기장 제목을 입력해주세요'
              value={props.diary_title}
              onChangeText={props.onTitleChanged}
            />
            <Text style={styles.modalDescText}>이 일기는..</Text>
            <TextInput multiline={true} maxLength={40} numberOfLines={2}
              style={styles.modalDescTextInput}
              placeholder='일기장에 대한 설명을 적어주세요 (최대 40자)'
              value={props.explanation}
              onChangeText={props.onExplanationChanged}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'grey', fontWeight: 'bold', marginBottom: 10, marginTop: 15, marginLeft: 5 }}>교환일기 여부</Text>
            <Switch onValueChange={props.handleToggleSwitch}
              value={props.switchValue}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPressOut={props.toggleModal}
              style={styles.modalbutton}
            >
              <Text style={styles.modalText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity onPressOut={props.submitDiaryInfo}
              style={styles.modalbutton}
            >
              <Text style={styles.modalText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  modalbutton: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30
  },
  modalTextInput: {
    width: 250,
    borderRadius: 5,
    marginBottom: 2,
    marginRight: 5,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  modalDescTextInput: {
    width: 300,
    borderRadius: 5,
    marginBottom: 2,
    marginRight: 5,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  titleFont: {
    paddingTop: 10,
    fontSize: 23,
    fontWeight: "900",
    color: '#263238',
  },
  modalText: {
    fontSize: 18,
    color: '#263238',
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10
  },
  modalButtonText: {
    fontSize: 18,
    color: '#263238',
    fontWeight: "bold",
  },
  modalDescText: {
    fontSize: 18,
    color: '#263238',
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  }
});

DiaryboxScreen.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  myDiary: PropTypes.array.isRequired,
  exDiary: PropTypes.array.isRequired
};

export default DiaryboxScreen;