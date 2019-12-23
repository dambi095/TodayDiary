import { connect } from "react-redux";
import AppContainer from "./screen";
import { actionCreators as diaryActions } from "../../redux/modules/diary";
import { actionCreators as userActions } from "../../redux/modules/user";

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    isLoggedIn: user.isLoggedIn,
    profile: user.profile
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initApp: async () => {
      await dispatch(diaryActions.getDiary());
    },
    logOut: async () => {
      await dispatch(userActions.logOut());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
