import { API_URL } from "../../constants";
import { actionCreators as userActions } from "./user";

const SET_DIARY = "SET_DIARY";
const SET_DIARYLIST = "SET_DIARYLIST";
const SET_CONTENTS = "SET_CONTENTS";

function setDiary(data) {
    return {
        type: SET_DIARY,
        data
    };
}

function setDiaryList(diaryList) {
    return {
        type: SET_DIARYLIST,
        diaryList
    }
}

function setContents(diaryContent) {
    return {
        type: SET_CONTENTS,
        diaryContent
    }
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
                dispatch(setDiary(data));
            })
            .catch(e => e);
    }
}

// 일기장 생성 시 
function submitDiaryInfo(diary_title, diary_type, explanation) {
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

// 일기장에 해당하는 일기리스트 가져오기
function getDiarylist(diary_num) {
    return (dispatch, getState) => {
        const {
            user: {
                profile: { email },
                token
            }
        } = getState();

        return fetch(`${API_URL}/diaryList/getDiaryList`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                email,
                diary_num
            })
        })
            .then(response => {
                if (response.status === 403) {
                    dispatch(userActions.logOut());
                } else {
                    return response.json();
                }
            })
            .then(async (data) => {
                await dispatch(setDiaryList(data));
                return true
            })
    }
}
//일기 내용 가져오기
function getDiaryContent(diary_num, page_num) {
    return (dispatch, getState) => {
        const {
            user: { token }
        } = getState();

        const result = fetch(`${API_URL}/diaryList/getDiaryContent`, {
            method: "post",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify({
                diary_num,
                page_num
            })
        })
            .then(response => {
                if (response.status === 403) {
                    dispatch(userActions.logOut());
                } else {
                    return response.json();
                }
            })
            .then(async (contents) => {
                if (contents) {
                    await dispatch(setContents(contents));
                    return true;
                }
            })
            .catch(e => e);
        return result;
    };
}

// 일기 내용 입력 
function insertDiaryContents(diary_num, title, contents, image) {
    return (dispatch, getState) => {
        const {
            user: {
                profile: { email },
                token
            }
        } = getState();
        return fetch(`${API_URL}/diaryList/insertContents`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                diary_num,
                title,
                contents,
                image,
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
            .then(async (result) => {
                if (result > 0) {
                    await dispatch(getDiaryContent(diary_num, JSON.stringify(result)))
                    return true;
                } else {
                    return false;
                }
            })
    }
}

// 일기장 삭제하기 
function deleteDiary(diary_num) {
    return (dispatch, getState) => {
        const {
            user: {
                token
            }
        } = getState();

        return fetch(`${API_URL}/diary/deleteDiary`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                diary_num
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
                    await dispatch(getDiarylist(diary_num));
                    return true
                } else {
                    return false;
                }
            })
    }
}

// 일기 삭제하기 
function deleteDiaryContents(diary_num, page_num) {
    return (dispatch, getState) => {
        const {
            user: {
                token
            }
        } = getState();

        return fetch(`${API_URL}/diaryList/deleteDiaryContents`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                diary_num,
                page_num
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
                    await dispatch(getDiarylist(diary_num));
                    return true
                } else {
                    return false;
                }
            })
    }
}

// 일기장 수정하기 
function updateDiaryInfo(diary_title, explanation, diary_num) {
    return (dispatch, getState) => {
        const {
            user: {
                token
            }
        } = getState();

        return fetch(`${API_URL}/diary/updateDiaryInfo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                diary_title,
                explanation,
                diary_num
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
                    return true
                } else {
                    return false;
                }
            })
    }
}

// 일기 내용 수정하기
function updateDiaryContents(diary_num, page_num, title, contents, image) {
    return (dispatch, getState) => {
        const {
            user: {
                token
            }
        } = getState();

        return fetch(`${API_URL}/diaryList/updateDiaryContents`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                page_num,
                title,
                diary_num,
                contents,
                image
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
                    console.log(" update result : ", result);
                    await dispatch(getDiarylist(diary_num));
                    await dispatch(getDiaryContent(diary_num, page_num));
                    return true
                } else {
                    return false;
                }
            })
    }
}

const initialState = {
    myDiary: [],
    diaryList: [],
    diaryContent: []
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_DIARY:
            return applySetDiary(state, action);
        case SET_DIARYLIST:
            return applySetDiaryList(state, action);
        case SET_CONTENTS:
            return applySetDiaryContent(state, action);
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

function applySetDiaryList(state, action) {
    const { diaryList } = action;
    return {
        ...state,
        diaryList: diaryList
    }
}

function applySetDiaryContent(state, action) {
    const { diaryContent } = action;
    return {
        ...state,
        diaryContent
    }
}

const actionCreators = {
    getDiary,
    submitDiaryInfo,
    getDiarylist,
    insertDiaryContents,
    getDiaryContent,
    deleteDiary,
    deleteDiaryContents,
    updateDiaryInfo,
    updateDiaryContents
};

export { actionCreators };

export default reducer;
