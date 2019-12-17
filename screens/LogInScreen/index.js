import { connect } from "react-redux";
import Action from "./action";
import { actionCreators as userActions } from "../../redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (email, password) => {
      return dispatch(userActions.login(email, password));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Action);
