import { connect } from "react-redux";
import Action from "./action";
import { actionCreators as userActions } from "../../redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signUp: (email, password, username) => {
      return dispatch(userActions.signUp(email, password, username));
    },
    registerCheck: (email) => {
      return dispatch(userActions.registerCheck(email));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Action);
