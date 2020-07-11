import {ADD_CATEGORY_ERROR, ADD_CATEGORY_REQUEST, ADD_CATEGORY_SUCCESS, GET_CATEGORIES_SUCCESS} from "./actionType";
import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

export const addCategorySuccess = category => ({type: ADD_CATEGORY_SUCCESS, category});
export const addCategoryRequest = () => ({type: ADD_CATEGORY_REQUEST});
export const addCategoryError = error => ({type: ADD_CATEGORY_ERROR, error});

export const getCategoriesSuccess = categories => ({type: GET_CATEGORIES_SUCCESS, categories});

export const addCategory = category => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': 'Token ' + token}};
        try {
            dispatch(addCategoryRequest());
            const res = await axiosApi.post('/categories', category, config);
            toast.success(res.data.message);
            dispatch(addCategorySuccess());
            dispatch(getCategories())
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(addCategoryError(e.response.data))
            } else {
                dispatch(addCategoryError({global: 'Server error'}))
            }
        }
    }
};

export const getCategories = () => {
    return async (dispatch) => {
        try {
            const res = await axiosApi.get('/categories');
            dispatch(getCategoriesSuccess(res.data))
        }catch (e) {
            if (e.response && e.response.data) {
                dispatch(addCategoryError(e.response.data))
            } else {
                dispatch(addCategoryError({global: 'Server error'}))
            }
        }
    }
};