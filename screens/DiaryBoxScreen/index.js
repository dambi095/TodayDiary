import {connect} from "react-redux";
import Action from "./action";

import { actionCreators as diaryActions } from "../../redux/modules/diary";

const mapStateToProps = (state, ownProps) => {
    
  const { diary: { exDiary, myDiary, totalDiary },
    user: {
      profile: { user_num, email },
      token } } = state;
  return {
    exDiary, myDiary, totalDiary, token, user_num, email
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDiary: () => {
      dispatch(diaryActions.getDiary());
    },
    getDiaryList: () => {
      dispatch(diaryActions.getDiaryList());
    },
    // 일기장 수정 시 
    updateDiaryInfo: (diary_type, diary_num, diary_title, explanation) => {
      return dispatch(diaryActions.updateDiaryInfo(diary_type, diary_num, diary_title, explanation));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Action);