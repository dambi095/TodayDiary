import { connect } from "react-redux";
import Action from "./action";
import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as diaryActions } from "../../redux/modules/diary";

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (email, password) => {
      return dispatch(userActions.logIn(email, password));
    },
    getDiary: () => {
      return dispatch(diaryActions.getDiary());
    },
    facebookLogIn: () => {
      dispatch(userActions.facebookLogIn());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Action);
