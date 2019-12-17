import { connect } from 'react-redux'; // 컴포넌트를 스토어에 연결하는 것을 도와줌 
import Action from './action';
import { actionCreators as diaryActions } from "../../redux/modules/diary";

const mapStateToProps = (state) => {
    const { diary: { diaryContent },
    } = state;
    return {
        diaryContent
    };
};

// dispatch는 액션을 리듀서로 보내는 function 
const mapDispatchToProps = (dispatch) => {
    return {
        // 일기 내용 작성
        insertDiaryContents: (_diary_num, _title, _contents) => {
            return dispatch(diaryActions.insertDiaryContents(_diary_num, _title, _contents));
        },
        // 일기 내용 수정하기
        updateDiaryContents: (diary_num, page_num, title, contents) => {
            return dispatch(diaryActions.updateDiaryContents(diary_num, page_num, title, contents));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Action);
