import { connect } from "react-redux";
import AppContainer from "./screen";
import { actionCreators as diaryActions } from "../../redux/modules/diary";

const mapStateToProps = (state, ownProps) => {
  const { user } = state;
  return {
    isLoggedIn: user.isLoggedIn,
    profile: user.profile
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initApp: () => {
      dispatch(diaryActions.getDiary());
      dispatch(diaryActions.getDiaryListForCal());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
