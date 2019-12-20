import React, { Component } from "react";
import DiaryboxScreen from "./screen";

class Action extends Component {
  state = {
    isFetching: false,
    isModalVisible: false,
    explanation: null,
    diary_title: null,
    diary_type: 'default',
    switchValue: false,
    myDiaryData: this.props.myDiary,
    exDiaryData: this.props.exDiary
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
      />
    );
  }

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
      await alert("일기장 생성이 완료되었습니다");
    } else {
      alert("다시 시도 해주세요");
    }
  }

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible, diary_title: null, diary_type: "default", explanation: null, switchValue: false });
  }

  _reset = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible, diary_title: null, diary_type: "default", explanation: null, switchValue: false });
  };

  _onTitleChanged = (text) => {
    this.setState({ diary_title: text });
  }

  _onExplanationChanged = (text) => {
    this.setState({ explanation: text });
  }

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