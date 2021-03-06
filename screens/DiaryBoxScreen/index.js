import { connect } from "react-redux";
import Action from "./action";

import { actionCreators as diaryActions } from "../../redux/modules/diary";

const mapStateToProps = (state) => {

  const { diary: { myDiary },
    user: {
      profile: { user_num, email },
      token } } = state;
  return {
    myDiary, token, user_num, email
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // 일기장 가져오기 
    getDiary: () => {
      dispatch(diaryActions.getDiary());
    },
    // 일기장 수정 시 
    updateDiaryInfo: (diary_title, explanation, diary_num) => {
      return dispatch(diaryActions.updateDiaryInfo(diary_title, explanation, diary_num));
    },
    // 일기장 생성
    submitDiaryInfo: (diary_title, diary_type, explanation) => {
      return dispatch(diaryActions.submitDiaryInfo(diary_title, diary_type, explanation))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Action);