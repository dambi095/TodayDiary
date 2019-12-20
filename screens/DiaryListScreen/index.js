import { connect } from "react-redux";
import Action from "./action";
import { actionCreators as diaryActions } from "../../redux/modules/diary";

const mapStateToProps = (state) => {
    const {
        diary: { diaryContent, diaryList },
    } = state;

    return {
        diaryContent, diaryList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDiaryContent: (diary_num, page_num) => {
            return dispatch(diaryActions.getDiaryContent(diary_num, page_num));
        },
        getDiarylist: (diary_num) => {
            return dispatch(diaryActions.getDiarylist(diary_num));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Action);