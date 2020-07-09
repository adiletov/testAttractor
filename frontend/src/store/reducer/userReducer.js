import {CHANGE_USER_ERROR, CHANGE_USER_REQUEST, CHANGE_USER_SUCCESS} from "../action/actionType";

const initialState = {
    user: null,
    error : null,
    load: false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_USER_SUCCESS:
            return {...state, user: action.user, error: null, load: false};
        case CHANGE_USER_REQUEST:
            return {...state, load: true};
        case CHANGE_USER_ERROR:
            return {...state, load: false, error: action.error};
        default:
            return state
    }
};

export default userReducer;
