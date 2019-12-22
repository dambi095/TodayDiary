import React, { Component } from "react";
import DiaryContentScreen from "./screen";

class Action extends Component {
  render() {
    return <DiaryContentScreen
      {...this.props}
      {...this.state}
      deleteContent={this._deleteContent}
      changeContent={this._changeContent}
    />;
  }

  // 컨텐츠 삭제 시 
  _deleteContent = async (_diary_num, _page_num) => {
    const { deleteDiaryContents } = this.props;
    const result = await deleteDiaryContents(_diary_num, _page_num);
    if (result) {
      this.props.navigation.navigate("DiaryListScreen");
    }
  }

}

export default Action;