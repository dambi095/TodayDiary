import { connect } from "react-redux";
import Action from "./action";
import { actionCreators as diaryActions } from "../../redux/modules/diary";


const mapStateToProps = (state) => {

    const {
        diary: { diaryList },
        user: { today }
    } = state;

    return { diaryList, today };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDiarylist: (diary_num, date) => {
            return dispatch(diaryActions.getDiarylist(diary_num, date));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Action);