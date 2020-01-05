import { connect } from "react-redux";
import Action from "./action";
import { actionCreators as diaryActions } from "../../redux/modules/diary";


const mapStateToProps = (state) => {
    const {
        diary: { diary }
    } = state;

    return {diary};
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchDiaryTitle: (diary_title) => {
            return dispatch(diaryActions.searchDiaryTitle(diary_title));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Action);