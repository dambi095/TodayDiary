import {connect} from "react-redux";
import Action from "./action";

import { actionCreators as diaryActions } from "../../redux/modules/diary";

const mapStateToProps = (state) => {
    
  const { diary: { exDiary, myDiary, totalDiary },
    user: {
      profile: { user_num, email },
      token }} = state;
  return {
    exDiary, myDiary, totalDiary, token, user_num, email
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // 일기장 가져오기 
    getDiary: () => {
      dispatch(diaryActions.getDiary());
    },
    // 일기 리스트 가져오기 
    getDiaryList: () => {
      dispatch(diaryActions.getDiaryList());
    },
    // 일기장 수정 시 
    updateDiaryInfo: (diary_type, diary_num, diary_title, explanation) => {
      return dispatch(diaryActions.updateDiaryInfo(diary_type, diary_num, diary_title, explanation));
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