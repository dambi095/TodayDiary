import React, { Component } from "react";
import Diarybox from "./screen";
import { Alert } from "react-native";


class Action extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadded: false,
      today: ""
    }
  }


  componentDidMount = () => {
    let now = new Date();
    let date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    this.setState({today : date})
}

  render() {
    return <Diarybox
      {...this.props}
      {...this.state}
      handlePress={this._handlePress}
      editDiaryInfo={this._editDiaryInfo}
      deleteDiary={this._deleteDiary}
      cancel={this._cancel}
    />;
  }

  // 일기장 진입 시 
  _handlePress = async (diary_num) => {
    const { getDiarylist } = this.props;
    const result = await getDiarylist(diary_num, this.state.today);
    // 데이터 로드 성공 시 
    if (result) {
      return true;
    }
    else {
      return false;
    }
  };


  // 일기장 삭제 시 
  _deleteDiary = async () => {
    const { deleteDiary } = this.props;
    const deleteResult = await deleteDiary(this.props.diary_num);
    if (deleteResult === true) {
      Alert.alert(" 일기장이 삭제 되었습니다");
    }
  }

  // 일기장 수정 시 
  _editDiaryInfo = async() => {
    const { modifyModal, diary_title, explanation, diary_num } = this.props;
    modifyModal(diary_title, explanation, diary_num);

  }

  // 취소 선택 시 
  _cancel = () => { }
}

export default Action;