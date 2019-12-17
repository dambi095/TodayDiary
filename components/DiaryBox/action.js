import React, { Component } from "react";
import PropTypes from "prop-types";
import Diarybox from "./screen";
class Action extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadded: false
    }
  }

  static propTypes = {
    getDiarylist: PropTypes.func.isRequired,
  };

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
    const result = await getDiarylist(diary_num);

    // 데이터 로드 성공 시 
    if (result) {
      return true;
    } 
    else {
      return false;
    }   
  };
  

  // 일기장 삭제 시 
  _deleteDiary = () => {
    const { deleteDiary } = this.props;
    deleteDiary(this.props.diary_num);
  }

  // 일기장 수정 시 
  _editDiaryInfo = () => {
    // const { updateDiaryInfo } = this.props;
  }

  // 취소 선택 시 
  _cancel = () => {
  }
}

export default Action;