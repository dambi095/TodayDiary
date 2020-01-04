  
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
        getDiaryContent: (diary_num, page_num) => {
            return dispatch(diaryActions.getDiaryContent(diary_num, page_num));
        },
        deleteDiaryContents: (diary_num, page_num, write_date) => {
            return dispatch(diaryActions.deleteDiaryContents(diary_num, page_num, write_date))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Action);