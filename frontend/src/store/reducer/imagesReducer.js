import {
    ADD_IMAGE_ERROR,
    ADD_IMAGE_REQUEST,
    ADD_IMAGE_SUCCESS,
    GET_IMAGES_ID_SUCCESS,
    GET_IMAGES_SUCCESS
} from "../action/actionType";

const initialState = {
    images: [],
    imagesId: [],
    error: null,
    load: false
};

const imagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_IMAGE_SUCCESS:
            return {...state, load: false, error: null};
        case ADD_IMAGE_REQUEST:
            return {...state, load: true};
        case ADD_IMAGE_ERROR:
            return {...state, error: action.error, load: false};
        case GET_IMAGES_SUCCESS:
            return {...state, images: action.images, error: null, load: false};
        case GET_IMAGES_ID_SUCCESS:
            return {...state, imagesId: action.images, error: null, load: false};
        default:
            return state
    }
};
export default imagesReducer;