import { connect } from "react-redux";
import Action from "./action";
import { actionCreators as userActions } from "../../redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signUp: (username, password, email) => {
      return dispatch(userActions.signUp(email, password, username));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Action);
