import { connect } from "react-redux";
import Action from "./action";
import { actionCreators as diaryActions } from "../../redux/modules/diary";

const mapStateToProps = (state) => {
    const {
        diary: { diaryContent, diaryList },
        user : {today}
    } = state;

    return {
        diaryContent, diaryList, today
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDiaryContent: (diary_num, page_num) => {
            return dispatch(diaryActions.getDiaryContent(diary_num, page_num));
        },
        getDiarylist: (diary_num, date) => {
            return dispatch(diaryActions.getDiarylist(diary_num, date));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Action);