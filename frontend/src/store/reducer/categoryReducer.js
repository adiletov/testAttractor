import {
    ADD_CATEGORY_ERROR,
    ADD_CATEGORY_REQUEST,
    ADD_CATEGORY_SUCCESS,
    GET_CATEGORIES_SUCCESS
} from "../action/actionType";

const initialState = {
    categories: [],
    error: null,
    load: false
};

const categoryReducer = (state = initialState, action) =>{
    switch (action.type) {
        case ADD_CATEGORY_SUCCESS:
            return {...state, error: null, load: false};
        case ADD_CATEGORY_REQUEST:
            return {...state, load: true};
        case ADD_CATEGORY_ERROR:
            return {...state, load: false, error: action.error};
        case GET_CATEGORIES_SUCCESS:
            return {...state, categories: action.categories};
        default:
            return state;
    }
};

export default categoryReducer;