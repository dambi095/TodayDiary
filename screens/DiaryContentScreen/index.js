  
import { connect } from "react-redux";
import Action from "./action";
import { actionCreators as diaryActions } from "../../redux/modules/diary";

const mapStateToProps = (state) => {
    const { diary: { diaryContent },
    } = state;
    
    return {
        diaryContent
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDiaryContent: (_diary_num, _page_num) => {
            return dispatch(diaryActions.getDiaryContent(_diary_num, _page_num));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Action);