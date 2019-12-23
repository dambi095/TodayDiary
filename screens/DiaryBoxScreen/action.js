import React, { Component } from "react";
import DiaryboxScreen from "./screen";

class Action extends Component {
  state = {
    isFetching: false,
    isModalVisible: false,
    explanation: null,
    diary_title: null,
    diary_type: 'default',
    diary_num: "",
    switchValue: false,
  };

  render() {
    return (
      <DiaryboxScreen
        {...this.props}
        {...this.state}
        refresh={this._refresh}
        toggleModal={this._toggleModal}
        onTitleChanged={this._onTitleChanged}
        onExplanationChanged={this._onExplanationChanged}
        submitDiaryInfo={this._submitDiaryInfo}
        handleToggleSwitch={this._handleToggleSwitch}
        modifyModal={this._modifyModal}
        editDiaryInfo={this._editDiaryInfo}
      />
    );
  }

  // 다이어리 리스트 업데이트 
  _refresh = async () => {
    const { getDiary } = this.props;
    await getDiary();
  };

  // 일기장 생성 시 
  _submitDiaryInfo = async () => {
    const { submitDiaryInfo } = this.props;
    const result = await submitDiaryInfo(this.state.diary_title, this.state.diary_type, this.state.explanation);
    if (result) {
      this._toggleModal();
    } else {
      alert("다시 시도 해주세요");
    }
  }

  // 모달 오픈
  _toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      diary_title: "",
      diary_type: "default",
      diary_num: "",
      explanation: "",
      switchValue: false
    });
  }

  // 일기장 수정 시 모달 오픈 
  _modifyModal = (diary_title, explanation, diary_num) => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      diary_title,
      diary_type: "default",
      diary_num,
      explanation,
      switchValue: false
    });
  };

  // 다이어리 수정하기
  _editDiaryInfo = async () => {
    const { updateDiaryInfo } = this.props;
    const result = await updateDiaryInfo(this.state.diary_title, this.state.explanation, this.state.diary_num)
    if (result) {
      this._toggleModal();
    }
  }

  // 타이틀 입력 시
  _onTitleChanged = (text) => {
    this.setState({ diary_title: text });
  }

  // 설명 입력 시 
  _onExplanationChanged = (text) => {
    this.setState({ explanation: text });
  }

  // 교환일기 여부 설정 시 
  _handleToggleSwitch = () => {
    this.setState({
      switchValue: !this.state.switchValue
    })

    if (this.state.switchValue) {
      this.setState({
        diary_type: 'default'
      })
    } else {
      this.setState({

        diary_type: 'exchange'
      })
    }
  }
}

export default Action;