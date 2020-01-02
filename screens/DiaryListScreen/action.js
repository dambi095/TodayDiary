  
import React, { Component } from "react";
import DiaryListScreen from "./screen";

class Action extends Component {
  constructor(props) {
    super(props);
    const {
      navigation: {
        state: {
          params: {
            diary_title,
            diary_num,
            diary_type
          }
        }
      }
    } = props;

    this.state = {
      diary_title, // 일기장 제목을 나타내주기 위해 
      diary_num, // 일기장 번호 넘겨주기 위해
      diary_type,
      isFetching: false,
    };
  }

  render() {
    return <DiaryListScreen
      {...this.props}
      {...this.state}
      getDiaryContents={this._getDiaryContents}
      setValue={this._setValue}
      refresh={this._refresh}
    />;
  }

  // 일기 리스트 업데이트 
  _refresh = async () => {
    const { getDiarylist } = this.props;
    await getDiarylist(this.state.diary_num);
  };

  // 일기에 해당하는 내용 가져오기
  _getDiaryContents = async (_diary_num, _page_num) => {
    const { getDiaryContent } = this.props;
    const result = await getDiaryContent(_diary_num, _page_num);
    if (result) {
      return true;
    }
  }

}

export default Action;