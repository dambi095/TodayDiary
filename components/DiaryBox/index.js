import { connect } from "react-redux";
import Action from "./action";
import { actionCreators as diaryActions } from "../../redux/modules/diary";


const mapStateToProps = (state) => {
    const {
        diary: { diaryList }
    } = state;
    return { diaryList};
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDiarylist: (diary_num) => {
            return dispatch(diaryActions.getDiaryList(diary_num));
        },
        deleteDiary: (diary_num) => {
            return dispatch(diaryActions.deleteDiary(diary_num));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Action);