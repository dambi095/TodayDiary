import {API_URL} from "../../constants";


/* API Actions */
// 회원가입
function signUp(email, password, username) {
    console.log(`signUp email: ${email} password : ${password} username : ${username}`);
    return dispatch => {
        return fetch(`${API_URL}/user/insertUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
                username
            })
        })
            .then(response => response.json())
            .then(result => {
                if (result > 0) {
                    console.log(" *-*-*-*-* signUp API Success result : ", result);
                    return true
                } else {
                    return false
                }
            })
    }
}

const initialState = {
    isLoggedIn: false
  };

function reducer(state = initialState, action) {
    switch (action.type) {
      default:
        return state;
    }
  }
  
const actionCreators = {
    signUp
  };
  

export { actionCreators };

export default reducer;
