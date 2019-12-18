import { API_URL } from "../../constants";
import { actionCreators as userActions } from "./user";

const SET_DIARY = "SET_DIARY";

function setDiary(data) {
    return {
        type: SET_DIARY,
        data
    };
}

//일기장 목록 가져오기
function getDiary() {
    return (dispatch, getState) => {
        const {
            user: {
                profile: { email },
                token
            }
        } = getState();

        return fetch(`${API_URL}/diary/getDiary`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                email
            })
        })
            .then(response => {
                if (response.status === 403) {
                    dispatch(userActions.logOut());
                } else {
                    return response.json();
                }
            })
            .then(data => {
                console.log("diary data : ", data);
                dispatch(setDiary(data));
            })
            .catch(e => e);
    }
}
// 일기장 생성 시 
submitDiaryInfo = (diary_title, diary_type, explanation) => {
    return (dispatch, getState) => {
        const {
            user: {
                profile: { email },
                token
            }
        } = getState();

        return fetch(`${API_URL}/diary/insertDiaryInfo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                email,
                diary_title,
                diary_type,
                explanation
            })
        })
            .then(response => {
                if (response.status === 403) {
                    dispatch(userActions.logOut());
                } else {
                    return response.json();
                }
            })
            .then(async (result) => {
                if (result > 0) {
                    await dispatch(getDiary());
                    return true;
                } else {
                    return false;
                }
            })
    }
}

const initialState = {
    myDiary: []
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_DIARY:
            return applySetDiary(state, action);
        default:
            return state;
    }
}

function applySetDiary(state, action) {
    const { data } = action;

    return {
        ...state,
        myDiary: data
    };
}


const actionCreators = {
    getDiary,
    submitDiaryInfo,
};

export { actionCreators };

export default reducer;
