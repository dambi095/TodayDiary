import React, { Component } from "react";
import DiaryContentScreen from "./screen"

class Action extends Component {

  state = {
    isModified: false,
    username: ""
  }

  render() {
    return <DiaryContentScreen
      {...this.props}
      {...this.state}
      deleteContent={this._deleteContent}
      changeContent={this._changeContent}
    />;
  }

  componentDidMount = () => {
    const { username } = this.props;
    this.setState({ username });
  }
  // 컨텐츠 삭제 시 
  _deleteContent = async (_diary_num, _page_num) => {
    const { deleteDiaryContents, diaryContent } = this.props;
    const result = await deleteDiaryContents(_diary_num, _page_num, diaryContent[0].write_date);
    if (result) {
      this.props.navigation.navigate("ListScreen");
    }
  }

}

export default Action;