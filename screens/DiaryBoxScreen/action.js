import React, { Component } from "react";
import PropTypes from "prop-types";
import DiaryboxScreen from "./screen";

class Action extends Component {
  // 타입 검사 
  static propTypes = {
    exDiary: PropTypes.array,
    myDiary: PropTypes.array,
    getDiary: PropTypes.func.isRequired
  };

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

  /*
  컴포넌트가 최초 마운팅 됐을 경우와 부모 컴포넌트에서 전달해주는 props가 변경 되었을 경우 호출되며, 
  render() 메서드가 호출되기 이전에 호출된다.
  */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.myDiary.length !== prevState.myDiaryData.length
      || nextProps.exDiary.length !== prevState.exDiaryData.length) {
      // 리스트 업데이트 
      console.log('getDerivedStateFromProps() List Update...');
      return {
        ...this.state,
        isFetching: false
      }
    }
    else {
      return { ...this.state }
    }
  }

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
    this.setState({
      isFetching: true
    });

  };

  // 일기장 생성 시 
  _submitDiaryInfo = async () => {
    const { submitDiaryInfo } = this.props;
    const result = await submitDiaryInfo(this.state.diary_title, this.state.diary_type, this.state.explanation);
    if (result) {
      alert("일기장 생성이 완료되었습니다");
      this._toggleModal();
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