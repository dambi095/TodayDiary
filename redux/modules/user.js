// Imports
import { AsyncStorage } from "react-native";
import { API_URL, FB_APP_ID } from "../../constants";
import * as Facebook from 'expo-facebook';

// Actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const SET_USER = "SET_USER";
const SAVE_TOKEN = "SAVE_TOKEN";
const SET_TIME = "SET_TIME";

// Action Creators
function setLogIn(token) {
    return {
        type: LOG_IN,
        token
    };
}

function logOut() {
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

function setTime(today) {
    return {
        type: SET_TIME,
        today
    }
}

/* API Actions */
// 회원가입
function signUp(email, password, username) {
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
                    return true
                } else {
                    return false
                }
            })
    }
}

// 가입된 유저인지 체크하기 
function registerCheck(email) {
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

// 페이스북 로그인
function facebookLogIn() {
    return async dispatch => {
        try {
            await Facebook.initializeAsync(FB_APP_ID);
            const {
                type,
                token,
                expires,
                permissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', "email"],
            });
            if (type === 'success') {
                fetch(`${API_URL}/user/facebookLogIn`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        access_token: token
                    })
                })
                    .then(response => response.json())
                    .then(async (json) => {
                        console.log("json :", json);
                        if (json.user && json.token) {
                            await dispatch(setUser(json.user));
                            await dispatch(setLogIn(json.user.token));
                            return json.user;
                        } else {
                            return null;
                        }
                    });
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }
}

// 오늘 날짜 가져오기 
function getTodayTime() {
    console.log("getTodayTime () ");
    return async dispatch => {
        return fetch(`${API_URL}/user/getCurDate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.text())
            .then(date => {
                console.log("getTodayTime : ", date);
                dispatch(setTime(date));
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
        case SET_TIME:
            return applySetTime(state, action);
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
        profile: user
    };
}

async function applyLogOut(state, action) {
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

function applySetTime(state, action) {
    const { today } = action;
    return {
        ...state,
        today: today
    }
}

const actionCreators = {
    signUp,
    logIn,
    registerCheck,
    logOut,
    facebookLogIn,
    getTodayTime
};


export { actionCreators };

export default reducer;
