// Imports
import { AsyncStorage } from "react-native";
import { API_URL } from "../../constants";

// Actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const SET_USER = "SET_USER";
const SAVE_TOKEN = "SAVE_TOKEN";

// Action Creators
function setLogIn(token) {
    return {
        type: LOG_IN,
        token
    };
}

function logOut(user) {
    return { type: LOG_OUT };
}

function setUser(user) {
    return {
        type: SET_USER,
        user
    };
}

function saveToken(token) {
    return {
        type: SAVE_TOKEN,
        token
    };
}

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

// 가입된 유저인지 체크하기 
function registerCheck(email) {
    console.log(`registerCheck email: ${email}`);
    return dispatch => {
        return fetch(`${API_URL}/user/registerCheck`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email
            })
        })
            .then(response => response.json())
            .then(result => {
                // 이미 존재할 시 
                console.log("result",result);
                if (result > 0) {
                    return true;
                } else {
                    return false;
                }
            })
    }
}

// 로그인 하기 
function logIn(email, password) {
    console.log(`login email : ${email} `);
    return dispatch => {
        return fetch(`${API_URL}/user/logIn`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(response => response.json())
            .then(async (json) => {
                if (json.user) {
                    await dispatch(setUser(json.user));
                    await dispatch(setLogIn(json.user.token));
                    return json.user;
                } else {
                    return null;
                }
            })
    }
}

const initialState = {
    isLoggedIn: false
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case LOG_IN:
            return applyLogIn(state, action);
        case SET_USER:
            return applySetUser(state, action);
        case LOG_OUT:
            return applyLogOut(state, action);
        case SAVE_TOKEN:
            return applySetToken(state, action);
        default:
            return state;
    }
}

// reducer funtions
function applyLogIn(state, action) {
     const { token } = action;
    return {
        ...state,
        isLoggedIn: true,
        token
    };
}

function applySetUser(state, action) {
    const { user } = action;
    return {
        ...state,
        user
    };
}

async function applyLogOut(state, action) {
    console.log(AsyncStorage.getAllKeys());
    await AsyncStorage.clear();
    return {
        ...state,
        isLoggedIn: false,
        token: ""
    };
}

function applySetToken(state, action) {
    const { token } = action;
    return {
        ...state,
        isLoggedIn: true,
        token: token
    };
}

const actionCreators = {
    signUp,
    logIn,
    registerCheck,
    logOut
};


export { actionCreators };

export default reducer;
